// Shasthi Guru Dream Campus - Admin & Counselor CRM Platform Engine

const CRMEngine = {
  activeRole: "admin", // 'admin', 'counselor-1', 'counselor-2', 'counselor-3', 'counselor-4'
  activeTab: "enquiries", // 'enquiries', 'followups', 'programs', 'news', 'welfare'
  activeStudentId: null,

  init() {
    this.bindEvents();
    this.renderDashboard();
  },

  bindEvents() {
    // Role switcher
    const roleSelect = document.querySelector('#crmRoleSelect');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        this.activeRole = e.target.value;
        const counselorObj = SG_DATA.counselors.find(c => c.id === this.activeRole);
        const badge = document.querySelector('#crmRoleBadge');
        if (badge) {
          badge.textContent = this.activeRole === 'admin' ? 'Super Admin Mode' : `Counselor: ${counselorObj ? counselorObj.name : ''}`;
        }
        App.showToast(`Switched view to ${this.activeRole === 'admin' ? 'Super Admin' : counselorObj?.name}`, "info");
        this.renderDashboard();
      });
    }

    // Tab navigation in CRM
    document.querySelectorAll('.crm-nav-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.crm-nav-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.getAttribute('data-tab');
        this.renderTabContent();
      });
    });

    // Search and filters
    const searchInput = document.querySelector('#crmSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.filterAndRenderEnquiries());
    }

    const statusFilter = document.querySelector('#crmStatusFilter');
    if (statusFilter) {
      statusFilter.addEventListener('change', () => this.filterAndRenderEnquiries());
    }

    const counselorFilter = document.querySelector('#crmCounselorFilter');
    if (counselorFilter) {
      counselorFilter.addEventListener('change', () => this.filterAndRenderEnquiries());
    }

    // Add Conversation Form
    const convoForm = document.querySelector('#addConversationForm');
    if (convoForm) {
      convoForm.addEventListener('submit', (e) => this.handleAddConversation(e));
    }

    // Quick program form
    const addProgForm = document.querySelector('#crmAddProgramForm');
    if (addProgForm) {
      addProgForm.addEventListener('submit', (e) => this.handleAddProgram(e));
    }
  },

  renderDashboard() {
    const enquiries = EnquiryEngine.getStoredEnquiries();
    const donations = WelfareEngine.getStoredDonations();

    // 1. Compute KPIs
    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter(e => e.status === 'NEW').length;
    const inCounseling = enquiries.filter(e => e.status === 'COUNSELING' || e.status === 'FOLLOW-UP').length;
    const converted = enquiries.filter(e => e.status === 'CONVERTED').length;
    const totalDonations = donations.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Update KPI UI
    document.querySelector('#kpiTotal').textContent = totalEnquiries;
    document.querySelector('#kpiNew').textContent = newEnquiries;
    document.querySelector('#kpiCounseling').textContent = inCounseling;
    document.querySelector('#kpiConverted').textContent = converted;
    document.querySelector('#kpiDonations').textContent = `₹${(totalDonations / 1000).toFixed(1)}k`;

    // Populate counselor filter dropdown
    const cFilter = document.querySelector('#crmCounselorFilter');
    if (cFilter && cFilter.options.length <= 1) {
      SG_DATA.counselors.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.name} (${c.specialization.split(',')[0]})`;
        cFilter.appendChild(opt);
      });
    }

    this.renderTabContent();
  },

  renderTabContent() {
    const tabs = ['enquiriesTab', 'followupsTab', 'programsTab', 'newsTab', 'welfareTab'];
    tabs.forEach(tabId => {
      const el = document.getElementById(tabId);
      if (el) el.style.display = 'none';
    });

    const activeEl = document.getElementById(`${this.activeTab}Tab`);
    if (activeEl) activeEl.style.display = 'block';

    if (this.activeTab === 'enquiries') {
      this.filterAndRenderEnquiries();
    } else if (this.activeTab === 'followups') {
      this.renderFollowupsTab();
    } else if (this.activeTab === 'programs') {
      this.renderProgramsTab();
    } else if (this.activeTab === 'news') {
      this.renderNewsTab();
    } else if (this.activeTab === 'welfare') {
      this.renderWelfareTab();
    }
  },

  filterAndRenderEnquiries() {
    let enquiries = EnquiryEngine.getStoredEnquiries();
    const searchTerm = (document.querySelector('#crmSearchInput')?.value || '').toLowerCase().trim();
    const statusVal = document.querySelector('#crmStatusFilter')?.value || 'ALL';
    const counselorVal = document.querySelector('#crmCounselorFilter')?.value || 'ALL';

    // If a counselor is logged in (not Super Admin), restrict to their assigned cases unless ALL
    if (this.activeRole !== 'admin') {
      enquiries = enquiries.filter(e => e.assignedCounselorId === this.activeRole);
    } else if (counselorVal !== 'ALL') {
      enquiries = enquiries.filter(e => e.assignedCounselorId === counselorVal);
    }

    if (statusVal !== 'ALL') {
      enquiries = enquiries.filter(e => e.status === statusVal);
    }

    if (searchTerm) {
      enquiries = enquiries.filter(e => 
        e.id.toLowerCase().includes(searchTerm) ||
        e.firstName.toLowerCase().includes(searchTerm) ||
        e.phone.toLowerCase().includes(searchTerm) ||
        e.programName.toLowerCase().includes(searchTerm) ||
        e.district.toLowerCase().includes(searchTerm)
      );
    }

    const tbody = document.querySelector('#crmEnquiriesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (enquiries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: #94a3b8;">No enquiries matching current filters.</td></tr>`;
      return;
    }

    enquiries.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: #60a5fa;">${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #fff;">${item.firstName}</div>
          <div style="font-size: 0.75rem; color: #94a3b8;">📞 ${item.phone}</div>
        </td>
        <td>
          <span style="font-size: 0.85rem;">${item.district}</span>
          <div style="font-size: 0.75rem; color: #a7f3d0;">12th: ${item.twelfthMark}</div>
        </td>
        <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${item.programName}
        </td>
        <td>
          <span class="status-badge status-${item.status.replace(/\s+/g, '-')}">${item.status}</span>
        </td>
        <td>
          <select class="role-switcher-select" style="padding: 4px 8px; font-size: 0.775rem;" onchange="CRMEngine.reassignCounselor('${item.id}', this.value)">
            <option value="">Unassigned</option>
            ${SG_DATA.counselors.map(c => `
              <option value="${c.id}" ${item.assignedCounselorId === c.id ? 'selected' : ''}>${c.name}</option>
            `).join('')}
          </select>
        </td>
        <td style="font-size: 0.775rem; color: #94a3b8;">
          ${new Date(item.submittedAt).toLocaleDateString()}
        </td>
        <td>
          <button class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.775rem;" onclick="CRMEngine.openStudentDrawer('${item.id}')">
            Manage & Log Notes →
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  reassignCounselor(enquiryId, counselorId) {
    const list = EnquiryEngine.getStoredEnquiries();
    const item = list.find(e => e.id === enquiryId);
    if (item) {
      const c = SG_DATA.counselors.find(c => c.id === counselorId);
      item.assignedCounselorId = counselorId || "";
      item.assignedCounselorName = c ? c.name : "Unassigned";
      if (item.status === 'NEW' && counselorId) {
        item.status = 'ASSIGNED';
      }
      item.conversations.push({
        date: new Date().toLocaleString(),
        by: "System",
        channel: "Reassignment",
        notes: `Assigned counselor updated to ${item.assignedCounselorName}.`
      });
      EnquiryEngine.saveEnquiries(list);
      App.showToast(`Enquiry ${enquiryId} assigned to ${item.assignedCounselorName}`, "success");
    }
  },

  openStudentDrawer(enquiryId) {
    this.activeStudentId = enquiryId;
    const list = EnquiryEngine.getStoredEnquiries();
    const student = list.find(e => e.id === enquiryId);
    if (!student) return;

    document.querySelector('#drawerStudentId').textContent = student.id;
    document.querySelector('#drawerStudentName').textContent = student.firstName;
    document.querySelector('#drawerPhone').textContent = student.phone;
    document.querySelector('#drawerEmail').textContent = student.email;
    document.querySelector('#drawerDistrict').textContent = student.district;
    document.querySelector('#drawerCourse').textContent = student.programName;
    document.querySelector('#drawerMarks').textContent = student.twelfthMark;
    document.querySelector('#drawerAadhaar').textContent = student.aadhaarMasked || 'Not provided';
    document.querySelector('#drawerSource').textContent = student.source;

    // Status Buttons Active State
    const statusBadge = document.querySelector('#drawerStatusBadge');
    if (statusBadge) {
      statusBadge.className = `status-badge status-${student.status.replace(/\s+/g, '-')}`;
      statusBadge.textContent = student.status;
    }

    // Render Timeline
    this.renderTimeline(student.conversations || []);

    App.openModal('studentDetailDrawer');
  },

  updateStudentStatus(newStatus) {
    if (!this.activeStudentId) return;
    const list = EnquiryEngine.getStoredEnquiries();
    const student = list.find(e => e.id === this.activeStudentId);
    if (student) {
      student.status = newStatus;
      const author = this.activeRole === 'admin' ? 'Super Admin' : (SG_DATA.counselors.find(c => c.id === this.activeRole)?.name || 'Counselor');
      student.conversations.push({
        date: new Date().toLocaleString(),
        by: author,
        channel: "Status Update",
        notes: `Enquiry status updated to ${newStatus}.`
      });
      EnquiryEngine.saveEnquiries(list);
      this.openStudentDrawer(this.activeStudentId);
      App.showToast(`Status updated to ${newStatus}`, "success");
    }
  },

  handleAddConversation(e) {
    e.preventDefault();
    if (!this.activeStudentId) return;

    const channel = document.querySelector('#convoChannelSelect').value;
    const note = document.querySelector('#convoNoteText').value.trim();

    if (!note) {
      App.showToast("Please enter follow-up conversation notes", "warning");
      return;
    }

    const list = EnquiryEngine.getStoredEnquiries();
    const student = list.find(e => e.id === this.activeStudentId);
    if (student) {
      const author = this.activeRole === 'admin' ? 'Super Admin' : (SG_DATA.counselors.find(c => c.id === this.activeRole)?.name || 'Counselor');
      if (!student.conversations) student.conversations = [];
      student.conversations.push({
        date: new Date().toLocaleString(),
        by: author,
        channel: channel,
        notes: note
      });
      // Automatically advance status to CONTACTED if NEW or ASSIGNED
      if (student.status === 'NEW' || student.status === 'ASSIGNED') {
        student.status = 'CONTACTED';
      }
      EnquiryEngine.saveEnquiries(list);
      document.querySelector('#convoNoteText').value = '';
      this.renderTimeline(student.conversations);
      App.showToast("Conversation log recorded successfully", "success");
    }
  },

  renderTimeline(conversations) {
    const container = document.querySelector('#studentTimelineContainer');
    if (!container) return;

    container.innerHTML = '';
    if (conversations.length === 0) {
      container.innerHTML = `<div style="color: var(--slate-500); font-size: 0.85rem; padding: 10px 0;">No prior interactions logged. Add first note above.</div>`;
      return;
    }

    // Show reverse chronological
    const reversed = [...conversations].reverse();
    reversed.forEach(c => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <span class="timeline-author">${c.by} <span class="pill pill-slate" style="font-size: 0.7rem; margin-left: 6px;">${c.channel}</span></span>
            <span class="timeline-date">${c.date}</span>
          </div>
          <div class="timeline-note">${c.notes}</div>
        </div>
      `;
      container.appendChild(item);
    });
  },

  renderFollowupsTab() {
    const list = EnquiryEngine.getStoredEnquiries();
    const followups = list.filter(e => e.status === 'FOLLOW-UP' || e.status === 'COUNSELING');
    const container = document.querySelector('#followupsListContainer');
    if (!container) return;

    container.innerHTML = '';
    if (followups.length === 0) {
      container.innerHTML = `<p style="padding: 30px; color: #94a3b8;">No pending follow-ups currently due.</p>`;
      return;
    }

    followups.forEach(f => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.background = '#1e293b';
      card.style.borderColor = '#334155';
      card.style.marginBottom = '14px';
      card.innerHTML = `
        <div class="flex-between">
          <div>
            <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 4px;">${f.firstName} <span style="font-size: 0.8rem; color: #60a5fa;">(${f.id})</span></h4>
            <div style="font-size: 0.85rem; color: #94a3b8;">📞 ${f.phone} | 📍 ${f.district} | 🎓 ${f.programName}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="tel:${f.phone}" class="btn btn-sm btn-accent">📞 Call Now</a>
            <button class="btn btn-sm btn-primary" onclick="CRMEngine.openStudentDrawer('${f.id}')">View Notes</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  },

  renderProgramsTab() {
    const tbody = document.querySelector('#crmProgramsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    SG_DATA.categories.forEach(cat => {
      cat.programs.forEach(prog => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${prog.name}</strong></td>
          <td><span class="pill pill-blue">${cat.name}</span></td>
          <td>${prog.duration}</td>
          <td>${prog.eligibility}</td>
          <td><span class="pill pill-emerald">Active</span></td>
        `;
        tbody.appendChild(tr);
      });
    });
  },

  handleAddProgram(e) {
    e.preventDefault();
    const progName = document.querySelector('#newProgName').value.trim();
    const progCat = document.querySelector('#newProgCat').value;
    const progDuration = document.querySelector('#newProgDuration').value.trim();
    const progElig = document.querySelector('#newProgElig').value.trim();

    if (!progName || !progCat) {
      App.showToast("Please provide program name and category", "warning");
      return;
    }

    const cat = SG_DATA.categories.find(c => c.id === progCat);
    if (cat) {
      cat.programs.push({
        id: `prog-${Date.now()}`,
        name: progName,
        shortDesc: "Specialized curriculum with dedicated placement drive.",
        duration: progDuration || "3-4 Years",
        eligibility: progElig || "10+2 Qualified",
        careers: ["Professional Graduate", "Corporate Specialist"],
        institutions: "Top affiliated institutes",
        feeRange: "Flexible Merit & Quota slabs"
      });
      App.showToast(`Program "${progName}" published to course catalog!`, "success");
      document.querySelector('#crmAddProgramForm').reset();
      this.renderProgramsTab();
      // Re-populate public filter
      App.renderPrograms();
    }
  },

  renderNewsTab() {
    const list = SG_DATA.newsArticles;
    const container = document.querySelector('#crmNewsContainer');
    if (!container) return;

    container.innerHTML = '';
    list.forEach(article => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.background = '#1e293b';
      card.style.borderColor = '#334155';
      card.style.marginBottom = '14px';
      card.innerHTML = `
        <div class="flex-between">
          <div>
            <span class="pill pill-gold" style="margin-bottom: 8px;">${article.category}</span>
            <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 4px;">${article.title}</h4>
            <div style="font-size: 0.8rem; color: #94a3b8;">Published: ${article.date}</div>
          </div>
          <button class="btn btn-sm btn-outline-white" onclick="App.openNewsDetail('${article.id}')">Preview Article</button>
        </div>
      `;
      container.appendChild(card);
    });
  },

  renderWelfareTab() {
    const donations = WelfareEngine.getStoredDonations();
    const tbody = document.querySelector('#crmDonationsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    donations.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: #34d399;">${d.taxExemptReceipt}</strong></td>
        <td><strong>${d.donorName}</strong><div style="font-size: 0.75rem; color: #94a3b8;">${d.phone}</div></td>
        <td><strong style="color: #f59e0b;">₹${d.amount.toLocaleString()}</strong></td>
        <td>${d.causeTitle}</td>
        <td>${d.pan || 'N/A'}</td>
        <td>${d.date}</td>
        <td><span class="pill pill-emerald">80G Cleared</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  exportToCSV() {
    const list = EnquiryEngine.getStoredEnquiries();
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Enquiry_ID,Student_Name,Phone,Email,District,Course,12th_Mark,Status,Counselor,Submitted_At\n";

    list.forEach(e => {
      const row = [
        e.id,
        `"${e.firstName}"`,
        e.phone,
        e.email,
        `"${e.district}"`,
        `"${e.programName}"`,
        `"${e.twelfthMark}"`,
        e.status,
        `"${e.assignedCounselorName}"`,
        e.submittedAt
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Shasthi_Guru_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    App.showToast("Student enquiries exported to CSV!", "success");
  }
};

window.CRMEngine = CRMEngine;
