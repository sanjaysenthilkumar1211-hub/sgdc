// Shasthi Guru Dream Campus - Core Platform Data

const SG_DATA = {
  organization: {
    name: "Shasthi Guru Dream Campus",
    slogan: "Guiding Dreams. Building Futures.",
    motto: "Your Dream, Our Direction",
    secondaryMotto: "Beyond Admission. Towards A Great Future.",
    tagline: "We Don't Just Guide, We Transform Futures.",
    phones: ["+91 9894406737", "+91 8903829737"],
    email: "shasthiguru@gmail.com",
    address: "Central Counselling Headquarters, Dream Campus Avenue, Anna Nagar East, Chennai - 600102, Tamil Nadu, India",
    workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 3:00 PM"
  },

  districts: [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", 
    "Erode", "Vellore", "Thanjavur", "Dindigul", "Kanchipuram", "Tiruvallur", 
    "Cuddalore", "Villupuram", "Namakkal", "Dharmapuri", "Krishnagiri", "Pudukkottai", 
    "Sivaganga", "Ramanathapuram", "Virudhunagar", "Theni", "Nilgiris", "Tiruppur", 
    "Tenkasi", "Chengalpattu", "Kallakurichi", "Ranipet", "Tirupattur", "Mayiladuthurai", 
    "Kanyakumari", "Karur", "Perambalur", "Ariyalur", "Nagapattinam", 
    "Bengaluru (Karnataka)", "Kochi / Kerala", "Hyderabad (Telangana)", "Other State / Region"
  ],

  counselors: [
    {
      id: "counselor-1",
      name: "Priya Sharma",
      designation: "Senior Admissions Head",
      specialization: "Engineering, Tech & AI Programs",
      email: "priya.counselor@shasthiguru.org",
      phone: "+91 9894406737 (Ext 101)",
      activeCases: 14
    },
    {
      id: "counselor-2",
      name: "Rajesh K",
      designation: "Lead Medical & Health Consultant",
      specialization: "MBBS, BDS, Nursing & Allied Health",
      email: "rajesh.counselor@shasthiguru.org",
      phone: "+91 8903829737 (Ext 102)",
      activeCases: 19
    },
    {
      id: "counselor-3",
      name: "Anand Kumar",
      designation: "Global & Management Advisor",
      specialization: "MBA, BBA, Law & Study Abroad",
      email: "anand.counselor@shasthiguru.org",
      phone: "+91 9894406737 (Ext 103)",
      activeCases: 11
    },
    {
      id: "counselor-4",
      name: "Deepa Meenakshi",
      designation: "Career & Vocational Mentor",
      specialization: "Arts & Science, Polytechnic & Welfare",
      email: "deepa.counselor@shasthiguru.org",
      phone: "+91 8903829737 (Ext 104)",
      activeCases: 16
    }
  ],

  categories: [
    {
      id: "engineering",
      name: "Engineering & Technology",
      icon: "cog",
      badge: "Highest Demand",
      desc: "Shape innovations and build a better tomorrow through cutting-edge engineering disciplines.",
      programs: [
        {
          id: "eng-cse",
          name: "B.Tech Computer Science & Engineering",
          shortDesc: "Artificial Intelligence, Data Science, Cyber Security & Full Stack development tracks.",
          duration: "4 Years",
          eligibility: "10+2 with Physics, Chemistry & Mathematics (Min 50-60%)",
          careers: ["Software Architect", "AI/ML Engineer", "Cloud Engineer", "Cybersecurity Specialist"],
          institutions: "Top Tier Anna University affiliated colleges, Deemed Universities & IIT/NIT guidance",
          feeRange: "₹85,000 – ₹2,50,000 / year (Merit scholarships available)"
        },
        {
          id: "eng-aids",
          name: "B.Tech Artificial Intelligence & Data Science",
          shortDesc: "Hands-on machine learning, neural networks, predictive big-data analytics and intelligent systems.",
          duration: "4 Years",
          eligibility: "10+2 with PCM (Min 50%)",
          careers: ["Data Scientist", "NLP Specialist", "Robotics Integrator", "Business Intelligence Lead"],
          institutions: "Leading autonomous tech campuses across South India",
          feeRange: "₹95,000 – ₹2,60,000 / year"
        },
        {
          id: "eng-ece",
          name: "B.E Electronics & Communication Engineering",
          shortDesc: "VLSI design, embedded systems, 5G wireless networks, IoT and smart hardware circuits.",
          duration: "4 Years",
          eligibility: "10+2 with PCM (Min 50%)",
          careers: ["VLSI Design Engineer", "IoT Specialist", "Telecom Consultant", "Embedded Firmware Dev"],
          institutions: "Premier engineering colleges in Chennai, Coimbatore and Bangalore",
          feeRange: "₹80,000 – ₹2,20,000 / year"
        },
        {
          id: "eng-mech-aero",
          name: "B.Tech Mechanical & Aerospace Engineering",
          shortDesc: "Automotive engineering, CAD/CAM robotics, aerodynamics, EV powertrains and satellite tech.",
          duration: "4 Years",
          eligibility: "10+2 with PCM",
          careers: ["Aero Systems Engineer", "EV Design Lead", "Production Manager", "Defense Scientist"],
          institutions: "Reputed engineering and aerospace institutions",
          feeRange: "₹75,000 – ₹2,00,000 / year"
        }
      ]
    },
    {
      id: "medical",
      name: "Medical & Allied Health Sciences",
      icon: "heart-pulse",
      badge: "Noble Profession",
      desc: "Care, heal and save lives through clinical medicine, dentistry, and therapeutic sciences.",
      programs: [
        {
          id: "med-mbbs",
          name: "MBBS & BDS (Medicine & Dental)",
          shortDesc: "Complete counseling and seat allocation support for government, deemed, and private medical colleges.",
          duration: "5.5 Years (Incl. Internship)",
          eligibility: "10+2 with Physics, Chemistry, Biology + NEET-UG Qualified",
          careers: ["Medical Practitioner", "Cardiologist", "Surgeon", "Clinical Specialist"],
          institutions: "Government, Private & Deemed Medical Colleges in TN, Karnataka, Pondicherry",
          feeRange: "Govt Quota: ₹15,000/yr | Management / Deemed options explained"
        },
        {
          id: "med-ayush",
          name: "BAMS / BHMS / BUMS (Alternative Medicine)",
          shortDesc: "Ayurveda, Homeopathy, and Unani traditional clinical healthcare with growing global recognition.",
          duration: "5.5 Years",
          eligibility: "10+2 with PCB + NEET Qualification",
          careers: ["Ayurvedic Physician", "Homeopathic Doctor", "Wellness Consultant", "Clinical Researcher"],
          institutions: "Accredited AYUSH colleges in Tamil Nadu & Kerala",
          feeRange: "₹1,20,000 – ₹2,50,000 / year"
        },
        {
          id: "med-bpt",
          name: "Bachelor of Physiotherapy (BPT)",
          shortDesc: "Physical rehabilitation, sports medicine, neurological recovery, and movement therapy.",
          duration: "4.5 Years",
          eligibility: "10+2 with Physics, Chemistry & Biology (Min 50%)",
          careers: ["Sports Physiotherapist", "Neuro Rehab Specialist", "Private Clinic Consultant"],
          institutions: "Super-specialty teaching hospital affiliated campuses",
          feeRange: "₹70,000 – ₹1,50,000 / year"
        }
      ]
    },
    {
      id: "nursing",
      name: "Nursing",
      icon: "cross",
      badge: "Global Demand",
      desc: "Compassion in care, excellence in service with direct overseas placement opportunities.",
      programs: [
        {
          id: "nurs-bsc",
          name: "B.Sc Nursing (4-Year Degree)",
          shortDesc: "INC (Indian Nursing Council) certified degree leading to hospital care and global licensing (NCLEX, UK-NMC).",
          duration: "4 Years",
          eligibility: "10+2 with Physics, Chemistry & Biology (Min 45-50%)",
          careers: ["Registered Nurse (RN)", "ICU / OT Specialist", "Overseas Hospital Nurse (UK/US/Gulf)", "Nurse Educator"],
          institutions: "Top NABH accredited hospital nursing colleges",
          feeRange: "₹80,000 – ₹1,60,000 / year"
        },
        {
          id: "nurs-gnm",
          name: "General Nursing & Midwifery (GNM)",
          shortDesc: "3-year practical clinical nursing diploma with strong employment rates.",
          duration: "3 Years",
          eligibility: "10+2 any stream (Science preferred, Min 40%)",
          careers: ["Staff Nurse", "Community Health Worker", "Clinic Manager"],
          institutions: "Hospital-attached nursing schools",
          feeRange: "₹45,000 – ₹90,000 / year"
        }
      ]
    },
    {
      id: "pharmacy",
      name: "Pharmacy",
      icon: "capsules",
      badge: "Pharma Hub",
      desc: "Learn, innovate, and serve for a healthier world through pharmaceutical formulation and clinical practice.",
      programs: [
        {
          id: "pharm-bpharm",
          name: "B.Pharm (Bachelor of Pharmacy)",
          shortDesc: "Drug manufacturing, pharmacology, regulatory affairs, clinical trials, and retail pharmacy licensure.",
          duration: "4 Years",
          eligibility: "10+2 with PCM or PCB (Min 50%)",
          careers: ["Formulation Scientist", "Drug Inspector", "Hospital Pharmacist", "Pharma QA/QC Manager"],
          institutions: "PCI (Pharmacy Council of India) approved colleges",
          feeRange: "₹70,000 – ₹1,40,000 / year"
        },
        {
          id: "pharm-pharmd",
          name: "Pharm.D (Doctor of Pharmacy)",
          shortDesc: "6-year integrated clinical doctorate program focused on direct patient bedside pharmacotherapy.",
          duration: "6 Years (Incl. 1-Yr Residency)",
          eligibility: "10+2 with PCB / PCM or D.Pharm",
          careers: ["Clinical Pharmacist", "Toxicologist", "Medical Affairs Manager", "Global Clinical Trial Lead"],
          institutions: "Leading pharmacy universities & teaching hospitals",
          feeRange: "₹1,80,000 – ₹3,20,000 / year"
        }
      ]
    },
    {
      id: "paramedical",
      name: "Paramedical Courses",
      icon: "activity",
      badge: "High Job Security",
      desc: "Skilled diagnostic and emergency healthcare support ensuring faster, stronger patient outcomes.",
      programs: [
        {
          id: "para-bmlt",
          name: "B.Sc Medical Laboratory Technology (BMLT)",
          shortDesc: "Advanced diagnostics, pathology, hematology, microbiology, and molecular lab analytics.",
          duration: "3 + 1 Years",
          eligibility: "10+2 with PCB (Min 45%)",
          careers: ["Chief Lab Technologist", "Pathology Specialist", "Diagnostic Centre Head"],
          institutions: "Multi-specialty hospital teaching colleges",
          feeRange: "₹60,000 – ₹1,20,000 / year"
        },
        {
          id: "para-radiology",
          name: "B.Sc Radiology & Imaging Technology",
          shortDesc: "Operation of MRI, CT Scan, X-Ray, Ultrasound, and interventional radiation modalities.",
          duration: "3 + 1 Years",
          eligibility: "10+2 with PCB / PCM",
          careers: ["Radiology Technologist", "MRI Specialist", "Medical Imaging Consultant"],
          institutions: "Accredited health science universities",
          feeRange: "₹75,000 – ₹1,40,000 / year"
        },
        {
          id: "para-optometry",
          name: "Bachelor of Optometry (B.Optom)",
          shortDesc: "Comprehensive vision care, contact lens specialization, binocular vision therapy, and optical clinics.",
          duration: "4 Years",
          eligibility: "10+2 with Science (PCB/PCM)",
          careers: ["Clinical Optometrist", "Refractive Surgery Assistant", "Optical Chain Director"],
          institutions: "Leading eye hospital training institutes",
          feeRange: "₹65,000 – ₹1,30,000 / year"
        }
      ]
    },
    {
      id: "management",
      name: "MBA & Management",
      icon: "briefcase",
      badge: "Leadership Track",
      desc: "Lead today. Inspire tomorrow. Manage beyond borders with industry-aligned leadership degrees.",
      programs: [
        {
          id: "mgmt-mba",
          name: "Master of Business Administration (MBA)",
          shortDesc: "Specializations in Marketing, Finance, HR, Business Analytics, Operations & Logistics.",
          duration: "2 Years",
          eligibility: "Any Undergraduate Degree (Min 50%) + TANCET / MAT / CAT / Entrance",
          careers: ["Business Manager", "Management Consultant", "Marketing Director", "Investment Banker"],
          institutions: "AICTE approved B-Schools and Deemed Universities",
          feeRange: "₹1,20,000 – ₹4,50,000 total course"
        },
        {
          id: "mgmt-bba",
          name: "Bachelor of Business Administration (BBA)",
          shortDesc: "Foundational executive training in entrepreneurship, international business, and digital strategy.",
          duration: "3 Years",
          eligibility: "10+2 in any stream (Commerce / Science / Arts)",
          careers: ["Business Development Executive", "Retail Operations Lead", "HR Coordinator"],
          institutions: "Top Arts & Science / Management colleges",
          feeRange: "₹45,000 – ₹1,10,000 / year"
        }
      ]
    },
    {
      id: "it-cs",
      name: "IT & Computer Science",
      icon: "terminal",
      badge: "Future Ready",
      desc: "Code the future. Innovate. Transform digital ecosystems with high-growth tech qualifications.",
      programs: [
        {
          id: "it-bca",
          name: "Bachelor of Computer Applications (BCA)",
          shortDesc: "Full-stack web, app development, Python, cloud architectures, and modern UI engineering.",
          duration: "3 Years",
          eligibility: "10+2 with Mathematics / Computer Science / Business Math preferred",
          careers: ["Software Engineer", "Frontend / Backend Developer", "System Administrator", "App Creator"],
          institutions: "Premier universities across South India",
          feeRange: "₹50,000 – ₹1,20,000 / year"
        },
        {
          id: "it-cyber",
          name: "B.Sc Cyber Security & Digital Forensics",
          shortDesc: "Ethical hacking, incident response, vulnerability assessment, cryptography, and network defense.",
          duration: "3 Years",
          eligibility: "10+2 with Science / Computer Science",
          careers: ["Information Security Analyst", "SOC Analyst", "Penetration Tester", "Cyber Investigator"],
          institutions: "Advanced tech research institutes",
          feeRange: "₹65,000 – ₹1,40,000 / year"
        }
      ]
    },
    {
      id: "arts-science",
      name: "Arts & Science",
      icon: "book-open",
      badge: "Broad Horizons",
      desc: "Explore knowledge, expand horizons, and create cultural, social, and scientific impact.",
      programs: [
        {
          id: "arts-bcom",
          name: "B.Com (General / Corporate Secretaryship / Professional)",
          shortDesc: "Auditing, taxation, financial reporting, corporate governance, with integrated CA/CMA coaching.",
          duration: "3 Years",
          eligibility: "10+2 with Commerce / Accountancy (Min 50%)",
          careers: ["Chartered Accountant", "Financial Analyst", "Tax Consultant", "Bank Probationary Officer"],
          institutions: "Autonomous colleges in Chennai, Coimbatore, Trichy",
          feeRange: "₹40,000 – ₹95,000 / year"
        },
        {
          id: "arts-psychology",
          name: "B.Sc Psychology & Behavioral Science",
          shortDesc: "Cognitive psychology, clinical counseling, child development, and human resources assessment.",
          duration: "3 Years",
          eligibility: "10+2 any stream",
          careers: ["Counseling Psychologist", "School Counselor", "Organizational HR Specialist"],
          institutions: "Premier autonomous colleges",
          feeRange: "₹45,000 – ₹90,000 / year"
        },
        {
          id: "arts-biotech",
          name: "B.Sc Biotechnology & Microbiology",
          shortDesc: "Genetic engineering, fermentation technology, pharmaceutical bio-products, and research labs.",
          duration: "3 Years",
          eligibility: "10+2 with Biology / Chemistry",
          careers: ["Biotechnologist", "Quality Analyst", "Lab Scientific Officer"],
          institutions: "Leading life sciences colleges",
          feeRange: "₹50,000 – ₹1,10,000 / year"
        }
      ]
    },
    {
      id: "agriculture",
      name: "Agriculture & Allied Sciences",
      icon: "sprout",
      badge: "Sustain & Grow",
      desc: "Nurture the earth, sow the future, and reap success through modern agronomy and organic sciences.",
      programs: [
        {
          id: "agri-bsc",
          name: "B.Sc (Hons) Agriculture",
          shortDesc: "Crop science, soil health, agricultural economics, precision farming, and agribusiness management.",
          duration: "4 Years",
          eligibility: "10+2 with Physics, Chemistry, Biology / Agriculture",
          careers: ["Agricultural Officer (AO)", "Agronomist", "Plant Breeder", "Agri-Business Executive"],
          institutions: "ICAR recognized agricultural universities and colleges",
          feeRange: "₹90,000 – ₹1,80,000 / year"
        }
      ]
    },
    {
      id: "law",
      name: "Law & Legal Studies",
      icon: "scale",
      badge: "Justice & Rights",
      desc: "Defend rights, uphold justice, and lead societal transformation through constitutional and corporate law.",
      programs: [
        {
          id: "law-ballb",
          name: "BA LL.B / BBA LL.B (5-Year Integrated)",
          shortDesc: "Comprehensive moot courts, corporate jurisprudence, criminal law, cyber law, and international treaties.",
          duration: "5 Years",
          eligibility: "10+2 any stream (Min 45%)",
          careers: ["Corporate Legal Counsel", "Litigation Advocate", "Judicial Magistrate", "Legal Compliance Officer"],
          institutions: "BCI (Bar Council of India) accredited law schools",
          feeRange: "₹75,000 – ₹1,80,000 / year"
        }
      ]
    },
    {
      id: "polytechnic",
      name: "Polytechnic & Diploma",
      icon: "wrench",
      badge: "Skill First",
      desc: "Learn by doing, build technical skills, and create immediate job solutions straight after 10th or 12th.",
      programs: [
        {
          id: "poly-mech-eee",
          name: "Diploma in Mechanical / Electrical / Automobile",
          shortDesc: "Industrial manufacturing, CNC machinery, electrical grid systems, workshop diagnostics.",
          duration: "3 Years (Direct 2nd Yr lateral entry after 12th)",
          eligibility: "10th Pass or 12th Vocational / Science",
          careers: ["Junior Engineer (JE)", "Shopfloor Supervisor", "Maintenance Specialist"],
          institutions: "State Directorate of Technical Education approved polytechnics",
          feeRange: "₹25,000 – ₹55,000 / year"
        }
      ]
    },
    {
      id: "aviation-hospitality",
      name: "Aviation & Hospitality",
      icon: "plane",
      badge: "World Careers",
      desc: "Take off to dynamic global careers and deliver luxury guest experiences across five-star chains & airlines.",
      programs: [
        {
          id: "av-cabin",
          name: "B.Sc Aviation & Cabin Crew Management",
          shortDesc: "In-flight service protocols, aviation safety, airport ramp handling, and DGCA regulations.",
          duration: "3 Years",
          eligibility: "10+2 any stream + personality assessment",
          careers: ["Flight Attendant / Cabin Crew", "Airport Ground Ops Executive", "Aviation Customer Service"],
          institutions: "Specialized aviation training institutes",
          feeRange: "₹90,000 – ₹1,75,000 / year"
        },
        {
          id: "av-hotel",
          name: "B.Sc Hotel Management & Catering Tech",
          shortDesc: "Culinary arts, front office administration, banquet management, and international hotel internships.",
          duration: "3 Years",
          eligibility: "10+2 any stream",
          careers: ["Hotel General Manager", "Executive Chef", "F&B Director", "Cruise Hospitality Lead"],
          institutions: "NCHMCT affiliated and private hotel academies",
          feeRange: "₹65,000 – ₹1,50,000 / year"
        }
      ]
    }
  ],

  welfareCauses: [
    {
      id: "cause-merit",
      title: "Merit-cum-Means Higher Education Fund",
      tagline: "Empowering brilliant students who lack financial resources to step into university lecture halls.",
      target: "₹15,00,000",
      raised: "₹9,80,000",
      studentsAssisted: 54,
      desc: "Covers essential college tuition and lab fees for students who scored 85%+ in 12th standard but come from families earning below the poverty line. Every rupee is paid directly to the university account.",
      suggestedAmounts: [1000, 2500, 5000, 10000, 25000]
    },
    {
      id: "cause-rural-girls",
      title: "Rural Girl Child Higher Education Mission",
      tagline: "Transforming families by enabling first-generation girl graduates in Engineering & Nursing.",
      target: "₹10,00,000",
      raised: "₹7,20,000",
      studentsAssisted: 38,
      desc: "In many rural hamlets, financial obstacles stop young women from pursuing professional degrees. This scholarship covers their college transport, tuition, and hostel security to guarantee degree completion.",
      suggestedAmounts: [1500, 3000, 6000, 12000, 30000]
    },
    {
      id: "cause-exam-fees",
      title: "Semester & Entrance Examination Fee Grants",
      tagline: "Preventing examination dropouts due to urgent unpaid semester registration dues.",
      target: "₹5,00,000",
      raised: "₹3,45,000",
      studentsAssisted: 72,
      desc: "Provides rapid emergency grants within 48 hours for vulnerable students facing imminent hall-ticket cancellation due to unpaid exam fees.",
      suggestedAmounts: [500, 1000, 2000, 5000, 10000]
    },
    {
      id: "cause-books-kit",
      title: "Student Laptops & Engineering Kit Bank",
      tagline: "Supplying essential technical books, drawing equipment, and refurbished laptops for IT students.",
      target: "₹8,00,000",
      raised: "₹5,10,000",
      studentsAssisted: 42,
      desc: "Ensures no engineering or computer application student falls behind in coding and technical drawing coursework due to lack of personal hardware.",
      suggestedAmounts: [1000, 2500, 5000, 15000, 25000]
    }
  ],

  initialEnquiries: [
    {
      id: "SGD-2026-8941",
      firstName: "Karthik",
      phone: "9840123456",
      email: "karthik.r@gmail.com",
      address: "14, KK Nagar West, 3rd Street",
      district: "Madurai",
      areaOfInterest: "engineering",
      programName: "B.Tech Computer Science & Engineering",
      twelfthMark: "94.2%",
      aadhaarMasked: "•••• •••• 8291",
      status: "COUNSELING",
      assignedCounselorId: "counselor-1",
      assignedCounselorName: "Priya Sharma",
      submittedAt: "2026-10-06T10:15:00Z",
      source: "Website Hero CTA",
      internalNotes: "Strong candidate for merit quota. Prefers top colleges in Coimbatore or Chennai with hostel.",
      conversations: [
        {
          date: "2026-10-06 11:30 AM",
          by: "Priya Sharma",
          channel: "Phone Call",
          notes: "Initiated introductory discussion. Student scored 188/200 cutoff. Explained top 5 autonomous engineering colleges."
        },
        {
          date: "2026-10-07 04:15 PM",
          by: "Priya Sharma",
          channel: "WhatsApp",
          notes: "Shared college comparison brochure and placement statistics for Anna University affiliated institutions."
        }
      ]
    },
    {
      id: "SGD-2026-8942",
      firstName: "Divya",
      phone: "9789123456",
      email: "divya.selvam@gmail.com",
      address: "8B, Gandhi Road, Gandhipuram",
      district: "Coimbatore",
      areaOfInterest: "nursing",
      programName: "B.Sc Nursing (4-Year Degree)",
      twelfthMark: "88.5%",
      aadhaarMasked: "•••• •••• 4120",
      status: "ADMISSION SUPPORT",
      assignedCounselorId: "counselor-2",
      assignedCounselorName: "Rajesh K",
      submittedAt: "2026-10-05T14:40:00Z",
      source: "Admission Page",
      internalNotes: "Eligible for hospital-attached nursing campus. Documentation under verification.",
      conversations: [
        {
          date: "2026-10-05 03:00 PM",
          by: "Rajesh K",
          channel: "Phone Call",
          notes: "Parent inquired about INC recognition and clinical internship stipends. Arranged campus visit for this Saturday."
        }
      ]
    },
    {
      id: "SGD-2026-8943",
      firstName: "Mohammed Fahad",
      phone: "9444123456",
      email: "fahad.mba@yahoo.com",
      address: "21, Peters Road, Royapettah",
      district: "Chennai",
      areaOfInterest: "management",
      programName: "Master of Business Administration (MBA)",
      twelfthMark: "81.0%",
      aadhaarMasked: "•••• •••• 7734",
      status: "ASSIGNED",
      assignedCounselorId: "counselor-3",
      assignedCounselorName: "Anand Kumar",
      submittedAt: "2026-10-07T09:20:00Z",
      source: "Career Guidance Page",
      internalNotes: "B.Com graduate looking for FinTech & Business Analytics dual specialization.",
      conversations: [
        {
          date: "2026-10-07 10:00 AM",
          by: "System",
          channel: "System Allocation",
          notes: "Enquiry assigned to Anand Kumar based on management domain."
        }
      ]
    },
    {
      id: "SGD-2026-8944",
      firstName: "Ananya Menon",
      phone: "9894123456",
      email: "ananya.menon@outlook.com",
      address: "44, Cantonment Area",
      district: "Tiruchirappalli",
      areaOfInterest: "medical",
      programName: "MBBS & BDS (Medicine & Dental)",
      twelfthMark: "96.4%",
      aadhaarMasked: "•••• •••• 9901",
      status: "FOLLOW-UP",
      assignedCounselorId: "counselor-2",
      assignedCounselorName: "Rajesh K",
      submittedAt: "2026-10-04T16:00:00Z",
      source: "Enquiry Form",
      internalNotes: "NEET score 540. Comparing state quota vs deemed medical options in Karnataka and TN.",
      conversations: [
        {
          date: "2026-10-05 11:00 AM",
          by: "Rajesh K",
          channel: "In-Person Campus Meeting",
          notes: "Walked parents through fee structure, clinical bed strength, and bond obligations."
        },
        {
          date: "2026-10-07 02:00 PM",
          by: "Rajesh K",
          channel: "Phone Call",
          notes: "Follow-up completed. Awaiting round 2 counselling notification."
        }
      ]
    },
    {
      id: "SGD-2026-8945",
      firstName: "Vigneshwaran K",
      phone: "9600123456",
      email: "vicky.salem@gmail.com",
      address: "102, Cherry Road, Hasthampatti",
      district: "Salem",
      areaOfInterest: "polytechnic",
      programName: "Diploma in Mechanical / Electrical",
      twelfthMark: "78.0%",
      aadhaarMasked: "•••• •••• 3319",
      status: "NEW",
      assignedCounselorId: "",
      assignedCounselorName: "Unassigned",
      submittedAt: "2026-10-08T08:30:00Z",
      source: "Home Page",
      internalNotes: "Looking for lateral entry diploma with immediate workshop apprenticeship.",
      conversations: []
    },
    {
      id: "SGD-2026-8946",
      firstName: "Meenakshi Sundaram",
      phone: "9487123456",
      email: "meenakshi.s@gmail.com",
      address: "5, South Car Street",
      district: "Tirunelveli",
      areaOfInterest: "agriculture",
      programName: "B.Sc (Hons) Agriculture",
      twelfthMark: "91.0%",
      aadhaarMasked: "•••• •••• 1184",
      status: "CONVERTED",
      assignedCounselorId: "counselor-4",
      assignedCounselorName: "Deepa Meenakshi",
      submittedAt: "2026-10-02T11:00:00Z",
      source: "Student Welfare Referral",
      internalNotes: "Admission confirmed at ICAR approved university. Merit fee concession secured.",
      conversations: [
        {
          date: "2026-10-02 12:30 PM",
          by: "Deepa Meenakshi",
          channel: "Phone Call",
          notes: "Detailed consultation on ICAR eligibility and career scope in state agriculture department."
        },
        {
          date: "2026-10-05 03:45 PM",
          by: "Deepa Meenakshi",
          channel: "Campus Visit",
          notes: "Verification completed. Seat allotted and provisional letter handed to student."
        }
      ]
    }
  ],

  newsArticles: [
    {
      id: "news-1",
      title: "TNEA 2026 Engineering Counselling Schedule & Seat Matrix Guidelines Announced",
      category: "Engineering",
      date: "October 06, 2026",
      summary: "Directorate of Technical Education releases round-wise rank cutoffs and counselling protocols for 450+ affiliated engineering institutions.",
      content: "The Tamil Nadu Engineering Admissions (TNEA) 2026 counselling procedures have been published. Candidates must ensure their community certificates, first-generation graduate documents, and special reservation certificates are verified online before choice filling starts. Shasthi Guru Dream Campus counselors are conducting free seat-matrix analysis sessions to help students avoid common choice filling pitfalls and optimize college priorities based on placement trends."
    },
    {
      id: "news-2",
      title: "NEET UG 2026: Expected Cut-Offs & Seat Allotment Strategy for Medical Aspirants",
      category: "Medical",
      date: "October 04, 2026",
      summary: "Detailed breakdown of government quota vs management quota fee structures across Tamil Nadu, Karnataka and Pondicherry deemed universities.",
      content: "With rising competition across India, medical aspirants need a clear multi-tiered strategy. Our senior medical advisory team has updated the 2026 fee analysis, clinical patient-load matrix, and bond tenure requirements for top teaching hospitals. Students seeking guidance for MBBS, BDS, BAMS and BPT admissions can book a free one-on-one session at our Chennai central guidance office."
    },
    {
      id: "news-3",
      title: "Special Scholarship Drive for Rural & First-Generation Graduates 2026-27",
      category: "Welfare & Scholarships",
      date: "October 01, 2026",
      summary: "Shasthi Guru Student Welfare Trust announces ₹50 Lakhs pooled scholarship fund for deserving candidates enrolling in technical and nursing degrees.",
      content: "Under our student welfare mission, deserving candidates with an aggregate of 80% or above whose family income is below ₹2.5 Lakhs per annum can apply for education sponsorship. Selected students will receive tuition assistance, laptop grants, and career mentorship until degree completion."
    },
    {
      id: "news-4",
      title: "Emerging IT & AI Careers: BCA vs B.Tech CSE Comparison for 12th Passouts",
      category: "Career Guidance",
      date: "September 28, 2026",
      summary: "Understanding curriculum differences, corporate recruitment patterns, and skill requirements between 3-year BCA and 4-year B.Tech programs.",
      content: "Many students with Mathematics and Computer Science backgrounds wonder whether to pursue BCA or B.Tech. While B.Tech provides deep engineering principles, BCA paired with modern cloud certifications and AI specializations provides rapid entry into high-paying development roles at lower tuition investment. Read our comprehensive side-by-side guide."
    }
  ],

  donationsSeed: [
    {
      id: "DON-2026-101",
      donorName: "Sundaramurthy R",
      email: "sundar.chennai@gmail.com",
      phone: "+91 9444056789",
      pan: "ABCPS1234K",
      amount: 10000,
      causeTitle: "Rural Girl Child Higher Education Mission",
      date: "2026-10-04",
      paymentRef: "UPI-42981094812",
      status: "COMPLETED",
      taxExemptReceipt: "80G-SGD-2026-101"
    },
    {
      id: "DON-2026-102",
      donorName: "Kavitha Balasubramanian",
      email: "kavitha.b@outlook.com",
      phone: "+91 9841029834",
      pan: "ABFPK9876L",
      amount: 5000,
      causeTitle: "Merit-cum-Means Higher Education Fund",
      date: "2026-10-06",
      paymentRef: "NB-88492019401",
      status: "COMPLETED",
      taxExemptReceipt: "80G-SGD-2026-102"
    },
    {
      id: "DON-2026-103",
      donorName: "Dr. Murali Krishnan",
      email: "murali.dr@apollo.org",
      phone: "+91 9790938472",
      pan: "AALPM4412Q",
      amount: 25000,
      causeTitle: "Student Laptops & Engineering Kit Bank",
      date: "2026-10-07",
      paymentRef: "UPI-91823719482",
      status: "COMPLETED",
      taxExemptReceipt: "80G-SGD-2026-103"
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.SG_DATA = SG_DATA;
}
