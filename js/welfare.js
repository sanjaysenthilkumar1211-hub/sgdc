// Shasthi Guru Dream Campus - Student Welfare & Education Support Donation Engine

const WelfareEngine = {
  currentCause: "Merit-cum-Means Higher Education Fund",
  selectedAmount: 5000,

  init() {
    this.syncInitialDonations();
    this.bindEvents();
    this.renderCauses();
  },

  syncInitialDonations() {
    if (!localStorage.getItem('sg_donations')) {
      localStorage.setItem('sg_donations', JSON.stringify(SG_DATA.donationsSeed));
    }
  },

  getStoredDonations() {
    try {
      const data = localStorage.getItem('sg_donations');
      return data ? JSON.parse(data) : SG_DATA.donationsSeed;
    } catch (e) {
      return SG_DATA.donationsSeed;
    }
  },

  saveDonations(donations) {
    localStorage.setItem('sg_donations', JSON.stringify(donations));
    if (window.CRMEngine) {
      window.CRMEngine.renderDashboard();
    }
  },

  renderCauses() {
    const container = document.querySelector('#causesListContainer');
    if (!container) return;

    container.innerHTML = '';
    SG_DATA.welfareCauses.forEach(cause => {
      const card = document.createElement('div');
      card.className = 'cause-card';
      card.innerHTML = `
        <div>
          <div class="flex-between" style="margin-bottom: 8px;">
            <span class="pill pill-emerald">80G Tax Deductible</span>
            <span style="font-size: 0.8rem; color: var(--slate-500); font-weight: 600;">${cause.studentsAssisted} Students Supported</span>
          </div>
          <h3 class="cause-card-title">${cause.title}</h3>
          <p class="cause-card-tagline">${cause.tagline}</p>
          <p style="font-size: 0.875rem; color: var(--slate-600); line-height: 1.5; margin-bottom: 14px;">${cause.desc}</p>
          
          <div class="cause-progress-wrap">
            <div class="flex-between" style="font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">
              <span>Raised: <strong style="color: var(--accent-emerald);">${cause.raised}</strong></span>
              <span>Target: <strong>${cause.target}</strong></span>
            </div>
            <div class="cause-progress-bar">
              <div class="cause-progress-fill" style="width: 65%;"></div>
            </div>
          </div>

          <div style="font-size: 0.825rem; font-weight: 600; color: var(--slate-700); margin-top: 10px;">Select Donation Tier:</div>
          <div class="cause-amounts-row">
            ${cause.suggestedAmounts.map((amt, idx) => `
              <button type="button" class="amt-chip ${idx === 2 ? 'selected' : ''}" data-cause="${cause.title}" data-amount="${amt}">₹${amt.toLocaleString()}</button>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-top: 24px; border-top: 1px solid var(--slate-100); padding-top: 18px;">
          <button class="btn btn-accent" style="width: 100%;" onclick="WelfareEngine.openDonationModal('${cause.title}', 5000)">
            Support Deserving Students →
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    // Chip click listeners
    container.querySelectorAll('.amt-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const parent = e.target.closest('.cause-card');
        parent.querySelectorAll('.amt-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        const cause = chip.getAttribute('data-cause');
        const amt = parseInt(chip.getAttribute('data-amount'), 10);
        this.currentCause = cause;
        this.selectedAmount = amt;
      });
    });
  },

  openDonationModal(causeTitle, defaultAmt) {
    this.currentCause = causeTitle || "Merit-cum-Means Higher Education Fund";
    this.selectedAmount = defaultAmt || 5000;

    const modal = document.querySelector('#donationModal');
    if (!modal) return;

    document.querySelector('#modalCauseTitle').textContent = this.currentCause;
    const amtInput = document.querySelector('#donorAmountInput');
    if (amtInput) amtInput.value = this.selectedAmount;

    App.openModal('donationModal');
  },

  bindEvents() {
    const donationForm = document.querySelector('#donationForm');
    if (donationForm) {
      donationForm.addEventListener('submit', (e) => this.handleDonationSubmit(e));
    }

    // Modal quick chips
    document.querySelectorAll('.modal-amt-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.modal-amt-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        const val = chip.getAttribute('data-val');
        const input = document.querySelector('#donorAmountInput');
        if (input) input.value = val;
      });
    });
  },

  handleDonationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const donorName = form.donorName.value.trim();
    const donorEmail = form.donorEmail.value.trim();
    const donorPhone = form.donorPhone.value.trim();
    const donorPan = form.donorPan.value.trim().toUpperCase();
    const amount = parseInt(form.amount.value, 10);
    const payMode = form.payMode.value;

    if (!donorName) {
      App.showToast("Please enter donor full name", "warning");
      return;
    }

    if (!donorPhone || donorPhone.length < 10) {
      App.showToast("Please provide donor contact number", "warning");
      return;
    }

    if (!amount || amount < 100) {
      App.showToast("Minimum donation contribution is ₹100", "warning");
      return;
    }

    // Simulate Payment Gateway
    App.closeModal('donationModal');
    App.showToast("Connecting to secure payment gateway...", "info");

    setTimeout(() => {
      const randomTxn = 'UPI-' + Math.floor(1000000000 + Math.random() * 9000000000);
      const receiptNo = `80G-SGD-2026-${Math.floor(100 + Math.random() * 900)}`;

      const newDonation = {
        id: `DON-2026-${Math.floor(100 + Math.random() * 900)}`,
        donorName: donorName,
        email: donorEmail || "sponsorship@shasthiguru.org",
        phone: donorPhone,
        pan: donorPan || "NOT_PROVIDED",
        amount: amount,
        causeTitle: this.currentCause,
        date: new Date().toISOString().split('T')[0],
        paymentRef: randomTxn,
        status: "COMPLETED",
        taxExemptReceipt: receiptNo
      };

      const donations = this.getStoredDonations();
      donations.unshift(newDonation);
      this.saveDonations(donations);

      form.reset();
      this.showReceiptModal(newDonation);
    }, 1200);
  },

  showReceiptModal(donation) {
    document.querySelector('#receiptNo').textContent = donation.taxExemptReceipt;
    document.querySelector('#receiptDonorName').textContent = donation.donorName;
    document.querySelector('#receiptAmount').textContent = `₹${donation.amount.toLocaleString()}`;
    document.querySelector('#receiptCause').textContent = donation.causeTitle;
    document.querySelector('#receiptPan').textContent = donation.pan !== 'NOT_PROVIDED' ? donation.pan : 'NA (General Grant)';
    document.querySelector('#receiptDate').textContent = donation.date;
    document.querySelector('#receiptTxnRef').textContent = donation.paymentRef;

    App.openModal('receiptModal');
    App.showToast(`Thank you! 80G Receipt #${donation.taxExemptReceipt} generated.`, "success");
  }
};

window.WelfareEngine = WelfareEngine;
