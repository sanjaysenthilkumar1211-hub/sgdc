// Shasthi Guru Dream Campus - Core Frontend Application Controller

const App = {
  activeView: 'home',
  activeCategoryFilter: 'all',

  init() {
    this.initRouter();
    this.renderPrograms();
    this.renderNews();
    this.bindGlobalEvents();
    this.initMobileMenu();

    // Initialize sub-engines
    if (window.EnquiryEngine) EnquiryEngine.init();
    if (window.WelfareEngine) WelfareEngine.init();
    if (window.CRMEngine) CRMEngine.init();

    // Check URL hash
    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.navigateTo(initialHash);
  },

  initRouter() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      this.navigateTo(hash);
    });
  },

  navigateTo(viewId) {
    if (viewId === 'crm' || viewId === 'admin') {
      this.showCRM();
      return;
    }

    this.showPublic();

    // Hide all view pages
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.style.display = 'none');

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.style.display = 'block';
      this.activeView = viewId;
    } else {
      const home = document.getElementById('view-home');
      if (home) home.style.display = 'block';
      this.activeView = 'home';
    }

    // Update Nav Link Active class
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${viewId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMobileMenu();
  },

  showCRM() {
    document.querySelector('#publicApp').style.display = 'none';
    const crm = document.querySelector('#crmApp');
    if (crm) {
      crm.classList.add('active');
      if (window.CRMEngine) CRMEngine.renderDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  showPublic() {
    const crm = document.querySelector('#crmApp');
    if (crm) crm.classList.remove('active');
    document.querySelector('#publicApp').style.display = 'block';
  },

  togglePortal() {
    const crm = document.querySelector('#crmApp');
    if (crm && crm.classList.contains('active')) {
      this.navigateTo('home');
    } else {
      this.showCRM();
    }
  },

  bindGlobalEvents() {
    // Portal switch buttons
    document.querySelectorAll('.portal-switch-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePortal();
      });
    });

    // Program Category Filter Buttons
    document.querySelectorAll('.filter-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategoryFilter = btn.getAttribute('data-filter');
        this.renderPrograms();
      });
    });

    // Program search box
    const progSearch = document.querySelector('#programSearchInput');
    if (progSearch) {
      progSearch.addEventListener('input', () => this.renderPrograms());
    }

    // Career Stream Tabs in Guidance Page
    document.querySelectorAll('.stream-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.stream-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-stream');
        document.querySelectorAll('.stream-content-pane').forEach(p => p.style.display = 'none');
        const activePane = document.getElementById(`stream-${targetTab}`);
        if (activePane) activePane.style.display = 'block';
      });
    });

    // Modal Close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Close on overlay backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  },

  renderPrograms() {
    const container = document.querySelector('#programsGridContainer');
    if (!container) return;

    const query = (document.querySelector('#programSearchInput')?.value || '').toLowerCase().trim();
    container.innerHTML = '';

    let matchedList = [];
    SG_DATA.categories.forEach(cat => {
      if (this.activeCategoryFilter === 'all' || this.activeCategoryFilter === cat.id) {
        cat.programs.forEach(prog => {
          if (!query || prog.name.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query) || prog.shortDesc.toLowerCase().includes(query)) {
            matchedList.push({ ...prog, categoryName: cat.name, categoryId: cat.id });
          }
        });
      }
    });

    if (matchedList.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); color: var(--slate-500);">No programs match your search. Explore all courses or talk to our counselor.</div>`;
      return;
    }

    matchedList.forEach(prog => {
      const card = document.createElement('div');
      card.className = 'program-card';
      card.innerHTML = `
        <div>
          <div class="program-card-header">
            <span class="program-category-badge">${prog.categoryName}</span>
            <span class="pill pill-blue">${prog.duration}</span>
          </div>
          <h3 class="program-name">${prog.name}</h3>
          <p class="program-desc">${prog.shortDesc}</p>
          <div class="program-meta">
            <div class="program-meta-item">
              <span>📋</span>
              <span><strong>Eligibility:</strong> ${prog.eligibility}</span>
            </div>
            <div class="program-meta-item">
              <span>💼</span>
              <span><strong>Careers:</strong> ${prog.careers.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>
        <div class="program-actions">
          <button class="btn btn-outline btn-sm" onclick="App.openProgramDetail('${prog.id}')">View Details</button>
          <button class="btn btn-primary btn-sm" onclick="App.enquireForProgram('${prog.categoryId}', '${prog.name}')">Enquire Now</button>
        </div>
      `;
      container.appendChild(card);
    });
  },

  openProgramDetail(progId) {
    let target = null;
    let targetCat = null;
    for (const cat of SG_DATA.categories) {
      const found = cat.programs.find(p => p.id === progId);
      if (found) {
        target = found;
        targetCat = cat;
        break;
      }
    }

    if (!target) return;

    document.querySelector('#modalProgTitle').textContent = target.name;
    document.querySelector('#modalProgCat').textContent = targetCat.name;
    document.querySelector('#modalProgDuration').textContent = target.duration;
    document.querySelector('#modalProgDesc').textContent = target.shortDesc;
    document.querySelector('#modalProgElig').textContent = target.eligibility;
    document.querySelector('#modalProgFee').textContent = target.feeRange;
    document.querySelector('#modalProgColleges').textContent = target.institutions;

    const careersList = document.querySelector('#modalProgCareers');
    careersList.innerHTML = '';
    target.careers.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      careersList.appendChild(li);
    });

    const enquireBtn = document.querySelector('#modalProgEnquireBtn');
    enquireBtn.onclick = () => {
      App.closeModal('programDetailModal');
      App.enquireForProgram(targetCat.id, target.name);
    };

    App.openModal('programDetailModal');
  },

  enquireForProgram(categoryId, progName) {
    this.navigateTo('enquiry');
    setTimeout(() => {
      const areaSelect = document.querySelector('#singleEnquiryArea');
      const courseSelect = document.querySelector('#singleEnquiryCourse');
      if (areaSelect) {
        areaSelect.value = categoryId;
        if (window.EnquiryEngine) {
          EnquiryEngine.updateCourseOptions(categoryId, courseSelect);
          courseSelect.value = progName;
        }
      }
      const form = document.querySelector('#singleStudentEnquiryForm');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  },

  renderNews() {
    const container = document.querySelector('#newsCardsGrid');
    if (!container) return;

    container.innerHTML = '';
    SG_DATA.newsArticles.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <span class="pill pill-gold" style="margin-bottom: 12px;">${item.category}</span>
        <h3 style="font-size: 1.2rem; margin-bottom: 10px; color: var(--primary-navy);">${item.title}</h3>
        <p style="font-size: 0.85rem; color: var(--slate-600); margin-bottom: 18px; line-height: 1.55;">${item.summary}</p>
        <div class="flex-between" style="border-top: 1px solid var(--slate-100); padding-top: 14px; margin-top: auto;">
          <span style="font-size: 0.775rem; color: var(--slate-400);">📅 ${item.date}</span>
          <button class="btn btn-sm btn-outline" onclick="App.openNewsDetail('${item.id}')">Read Full Story →</button>
        </div>
      `;
      container.appendChild(card);
    });
  },

  openNewsDetail(newsId) {
    const article = SG_DATA.newsArticles.find(n => n.id === newsId);
    if (!article) return;

    document.querySelector('#modalNewsTitle').textContent = article.title;
    document.querySelector('#modalNewsCat').textContent = article.category;
    document.querySelector('#modalNewsDate').textContent = article.date;
    document.querySelector('#modalNewsBody').textContent = article.content;

    App.openModal('newsDetailModal');
  },

  openPosterModal(posterName) {
    const imgMap = {
      'admission': 'assets/poster_admission_support.jpg',
      'future': 'assets/poster_beyond_admission.jpg',
      'courses': 'assets/poster_build_your_future.jpg'
    };

    const modalImg = document.querySelector('#posterModalImg');
    if (modalImg && imgMap[posterName]) {
      modalImg.src = imgMap[posterName];
      App.openModal('posterModal');
    }
  },

  openCounselingBooking() {
    App.openModal('counselingBookingModal');
  },

  initMobileMenu() {
    const toggle = document.querySelector('#mobileToggleBtn');
    const menu = document.querySelector('#navMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
      });
    }
  },

  closeMobileMenu() {
    const menu = document.querySelector('#navMenu');
    if (menu) menu.classList.remove('open');
  },

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  },

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  },

  showToast(message, type = 'info') {
    const container = document.querySelector('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'warning' ? 'toast-warning' : ''}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-size: 1.15rem;">${icon}</span>
      <div style="flex-grow: 1;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
