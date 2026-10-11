// Shasthi Guru Dream Campus - Single Student Enquiry Form Engine

const EnquiryEngine = {
  init() {
    this.populateDistricts();
    this.bindEvents();
    this.syncInitialState();
  },

  populateDistricts() {
    const districtSelects = document.querySelectorAll('.district-select');
    districtSelects.forEach(select => {
      select.innerHTML = '<option value="">Select District *</option>';
      SG_DATA.districts.forEach(dist => {
        const opt = document.createElement('option');
        opt.value = dist;
        opt.textContent = dist;
        select.appendChild(opt);
      });
    });
  },

  bindEvents() {
    // Cascading area of interest to course selector
    document.querySelectorAll('.area-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const area = e.target.value;
        const form = e.target.closest('form');
        const courseSelect = form ? form.querySelector('.course-select') : null;
        if (courseSelect) {
          this.updateCourseOptions(area, courseSelect);
        }
      });
    });

    // Aadhaar masking toggle
    document.querySelectorAll('.toggle-aadhaar-mask').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = e.target.closest('.form-group').querySelector('.aadhaar-input');
        if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
          btn.textContent = input.type === 'password' ? '👁️ Show' : '🔒 Mask';
        }
      });
    });

    // Form Submissions
    const forms = ['#quickEnquiryForm', '#singleStudentEnquiryForm', '#admissionQueryForm'];
    forms.forEach(selector => {
      const form = document.querySelector(selector);
      if (form) {
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));
      }
    });
  },

  updateCourseOptions(areaId, courseSelect) {
    courseSelect.innerHTML = '<option value="">Select Specific Course *</option>';
    if (!areaId) {
      courseSelect.disabled = true;
      return;
    }

    const cat = SG_DATA.categories.find(c => c.id === areaId);
    if (cat && cat.programs) {
      cat.programs.forEach(prog => {
        const opt = document.createElement('option');
        opt.value = prog.name;
        opt.textContent = `${prog.name} (${prog.duration})`;
        courseSelect.appendChild(opt);
      });
      // Option for other
      const otherOpt = document.createElement('option');
      otherOpt.value = `Other ${cat.name} Course`;
      otherOpt.textContent = `Other ${cat.name} Course / Not Listed`;
      courseSelect.appendChild(otherOpt);
      courseSelect.disabled = false;
    } else {
      courseSelect.disabled = false;
    }
  },

  syncInitialState() {
    if (!localStorage.getItem('sg_enquiries')) {
      localStorage.setItem('sg_enquiries', JSON.stringify(SG_DATA.initialEnquiries));
    }
  },

  getStoredEnquiries() {
    try {
      const data = localStorage.getItem('sg_enquiries');
      return data ? JSON.parse(data) : SG_DATA.initialEnquiries;
    } catch (e) {
      return SG_DATA.initialEnquiries;
    }
  },

  saveEnquiries(enquiries) {
    localStorage.setItem('sg_enquiries', JSON.stringify(enquiries));
    // Trigger CRM update if CRM is active
    if (window.CRMEngine) {
      window.CRMEngine.renderDashboard();
    }
  },

  handleSubmit(e, form) {
    e.preventDefault();

    const formData = new FormData(form);
    const firstName = formData.get('firstName')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const address = formData.get('address')?.toString().trim() || "Tamil Nadu";
    const district = formData.get('district')?.toString().trim();
    const area = formData.get('areaOfInterest')?.toString().trim();
    const course = formData.get('course')?.toString().trim();
    const twelfthMark = formData.get('twelfthMark')?.toString().trim();
    const aadhaarRaw = formData.get('aadhaar')?.toString().trim() || "";
    const consent = formData.get('consent');

    // Validation
    if (!firstName) {
      App.showToast("Please enter student's first name", "warning");
      return;
    }

    if (!phone || !/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) {
      App.showToast("Please enter a valid 10-digit mobile number", "warning");
      return;
    }

    if (!district) {
      App.showToast("Please select your district", "warning");
      return;
    }

    if (!course) {
      App.showToast("Please select a target course or area of interest", "warning");
      return;
    }

    if (!twelfthMark) {
      App.showToast("Please enter 12th Mark / Percentage / Score", "warning");
      return;
    }

    // Mask Aadhaar if provided
    let aadhaarMasked = "Not Provided";
    if (aadhaarRaw && aadhaarRaw.length >= 4) {
      const last4 = aadhaarRaw.slice(-4);
      aadhaarMasked = `•••• •••• ${last4}`;
    }

    // Generate unique Enquiry ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `SGD-2026-${randomNum}`;

    // Auto-match Counselor based on category
    let assignedCounselor = { id: "", name: "Unassigned" };
    if (area === "engineering" || area === "it-cs") {
      assignedCounselor = { id: "counselor-1", name: "Priya Sharma" };
    } else if (area === "medical" || area === "nursing" || area === "paramedical" || area === "pharmacy") {
      assignedCounselor = { id: "counselor-2", name: "Rajesh K" };
    } else if (area === "management" || area === "law" || area === "aviation-hospitality") {
      assignedCounselor = { id: "counselor-3", name: "Anand Kumar" };
    } else {
      assignedCounselor = { id: "counselor-4", name: "Deepa Meenakshi" };
    }

    const newEnquiry = {
      id: enquiryId,
      firstName: firstName,
      phone: phone,
      email: email || "Not provided",
      address: address,
      district: district,
      areaOfInterest: area || "General",
      programName: course,
      twelfthMark: twelfthMark.includes('%') ? twelfthMark : `${twelfthMark}%`,
      aadhaarMasked: aadhaarMasked,
      status: "NEW",
      assignedCounselorId: assignedCounselor.id,
      assignedCounselorName: assignedCounselor.name,
      submittedAt: new Date().toISOString(),
      source: form.getAttribute('data-source') || "Website Enquiry Form",
      internalNotes: "Newly submitted enquiry. Counselor assignment initiated.",
      conversations: [
        {
          date: new Date().toLocaleString(),
          by: "System",
          channel: "Web Portal",
          notes: `Online enquiry received from ${district} for ${course}. Auto-routed to ${assignedCounselor.name}.`
        }
      ]
    };

    const currentList = this.getStoredEnquiries();
    currentList.unshift(newEnquiry);
    this.saveEnquiries(currentList);

    // Reset Form
    form.reset();

    // Show Success Modal
    this.showConfirmationModal(newEnquiry);
  },

  showConfirmationModal(enquiry) {
    const modal = document.querySelector('#enquirySuccessModal');
    if (!modal) return;

    document.querySelector('#confirmEnquiryId').textContent = enquiry.id;
    document.querySelector('#confirmStudentName').textContent = enquiry.firstName;
    document.querySelector('#confirmCourse').textContent = enquiry.programName;
    document.querySelector('#confirmDistrict').textContent = enquiry.district;
    document.querySelector('#confirmCounselor').textContent = enquiry.assignedCounselorName;

    // Set WhatsApp link
    const waText = encodeURIComponent(`Hello Shasthi Guru Team, I have submitted an admission query. My Reference ID is ${enquiry.id}. Student: ${enquiry.firstName}, Course: ${enquiry.programName}. Please guide me.`);
    const waBtn = document.querySelector('#confirmWhatsAppBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/919894406737?text=${waText}`;
    }

    App.openModal('enquirySuccessModal');
    App.showToast(`Enquiry registered! Reference ID: ${enquiry.id}`, "success");
  }
};

window.EnquiryEngine = EnquiryEngine;
