var portfolioData = {
    projects: [{
        id: "atm-simulator",
        title: "ATM Simulator",
        featured: true,
        problem: "Users need a simple way to simulate ATM banking operations through a console interface.",
        challenge: "Implement secure account operations, PIN validation, balance checks, and transaction handling in Python.",
        solution: "Python ATM simulator with PIN authentication, balance inquiry, deposits, withdrawals, and transaction simulation for a realistic banking experience.",
        features: ["PIN Authentication", "Balance Inquiry", "Withdrawals", "Deposits", "Transaction Simulation"],
        techStack: ["Python"],
        lessonsLearned: "Built a secure command-line ATM experience while focusing on user validation and transaction flow.",
        githubUrl: "https://github.com/thirutharun65-tech/PYTHON/blob/main/PROJECTS/ATM_simulator.py",
        liveUrl: "",
        previewImage: "assets/projects/ATM simulator.png"
    }, {
        id: "password-checker",
        title: "Password Checker",
        featured: true,
        problem: "Weak passwords leave accounts vulnerable to unauthorized access.",
        challenge: "Build a password strength checker that validates length, character diversity, and common security rules.",
        solution: "Python password checker that evaluates passwords and provides clear feedback on strength and security.",
        features: ["Strength Evaluation", "Character Validation", "Security Feedback", "Console Interface"],
        techStack: ["Python"],
        lessonsLearned: "Learned how to translate security best practices into code that users can understand and apply.",
        githubUrl: "https://github.com/thirutharun65-tech/PYTHON/blob/main/PROJECTS/passwordChecker.py",
        liveUrl: "",
        previewImage: "assets/projects/password checker.png"
    }, {
        id: "library-management-system",
        title: "Library Management System",
        featured: true,
        problem: "Managing library books, borrowers, and transactions manually is slow and error-prone.",
        challenge: "Create a Python system that handles inventory, members, checkouts, returns, and search functionality.",
        solution: "Library management system in Python for book inventory, member records, lending, returns, and history tracking.",
        features: ["Book Inventory", "Member Management", "Checkout/Return", "Search Books", "Record Tracking"],
        techStack: ["Python"],
        lessonsLearned: "Gained practical experience modeling library workflows and managing persistent records in code.",
        githubUrl: "https://github.com/thirutharun65-tech/PYTHON/blob/main/PROJECTS/librarymanagement.py",
        liveUrl: "",
        previewImage: "assets/projects/library management system.png"
    }, {
        id: "hospital-management-system",
        title: "Hospital Management System",
        featured: false,
        problem: "Tracking patient records and appointments manually can slow hospital operations.",
        challenge: "Develop a Java console application to manage patients, doctors, appointments, and medical data.",
        solution: "Hospital management system in Java with patient registration, appointment scheduling, doctor allocation, and record management.",
        features: ["Patient Records", "Appointment Scheduling", "Doctor Management", "Medical History"],
        techStack: ["Java", "OOP"],
        lessonsLearned: "Built a structured healthcare workflow while reinforcing Java object-oriented design and data handling.",
        githubUrl: "https://github.com/thirutharun65-tech/OOPS/blob/main/PROJECTS/HospitalManagement.java",
        liveUrl: "",
        previewImage: "assets/projects/hospital management system.png"
    }, {
        id: "contact-management",
        title: "Contact Management",
        featured: false,
        problem: "Maintaining contact information without structure makes lookups and updates difficult.",
        challenge: "Implement add, edit, search, and delete contact operations using Java.",
        solution: "Java contact management application for organizing and managing personal contact records.",
        features: ["Add/Edit Contacts", "Search Contacts", "Delete Contacts", "Phone/Email Storage"],
        techStack: ["Java", "OOP"],
        lessonsLearned: "Improved data organization skills by building a reliable contact management workflow.",
        githubUrl: "https://github.com/thirutharun65-tech/OOPS/blob/main/PROJECTS/ContactManagement.java",
        liveUrl: "",
        previewImage: "assets/projects/contact management.png"
    }, {
        id: "college-management-website",
        title: "College Management Website",
        featured: false,
        problem: "Colleges need a polished portal to showcase courses, admissions, and campus information.",
        challenge: "Create a responsive website with academic content, contact options, and clean navigation.",
        solution: "Responsive college management website deployed on Vercel, featuring admissions, courses, campus details, and contact sections.",
        features: ["Responsive Design", "Admissions Page", "Course Catalog", "Contact Form", "Campus Overview"],
        techStack: ["HTML", "CSS", "JavaScript"],
        lessonsLearned: "Delivered a production-ready website experience while emphasizing accessibility and responsive layout.",
        githubUrl: "https://github.com/thirutharun65-tech/college-management-website-",
        liveUrl: "https://edunova-technical-campus-rho.vercel.app/",
        previewImage: "assets/projects/college management website.png"
    }],
    skills: [ { title: "Languages", items: ["Java", "Python"] }, { title: "Front End", items: ["HTML", "CSS", "JavaScript"] }, { title: "Tools", items: ["Git", "GitHub", "VS Code"] }, { title: "Design", items: ["Responsive Web Design", "Figma", "Wix"] }, { title: "Backend", items: ["Django", "Pandas"] }, { title: "Currently Learning", items: ["DSA", "C Programming", "C#"] } ],
    certificates: [
        { title: "Infosys Java", issuer: "Infosys", category: "Programming", image: "assets/certificates/java.png", description: "Infosys Java certification covering core Java concepts, OOP principles, and practical application development." },
        { title: "Scalar Java", issuer: "Scalar", category: "Programming", image: "assets/certificates/scalar java.png", description: "Certificate in Java programming from Scalar focusing on software engineering fundamentals and best practices." },
        { title: "Scalar JavaScript", issuer: "Scalar", category: "Programming", image: "assets/certificates/scalar javscript.png", description: "Certificate in JavaScript programming from Scalar with emphasis on modern JS, DOM manipulation, and interactive web experiences." },
        { title: "Infosys Python", issuer: "Infosys", category: "Programming", image: "assets/certificates/python.png", description: "Infosys Python certification covering Python fundamentals, scripting, data handling, and automation." },
        { title: "Responsive Web Design", issuer: "freeCodeCamp", category: "Frontend", image: "assets/certificates/responsive webdesign.png", description: "freeCodeCamp certification in responsive web design covering HTML, CSS, responsive layouts, and cross-device web experiences." },
        { title: "Web Development", issuer: "freeCodeCamp", category: "Frontend", image: "assets/certificates/legacy webdesign.png", description: "freeCodeCamp Web Development certification covering modern web technologies and best practices." },
        { title: "Microsoft Azure Blob Storage", issuer: "Microsoft", category: "Cloud", image: "assets/certificates/microsoft azure.png", description: "Microsoft Azure certification focusing on Blob Storage, scalable object storage, and data management in Azure." },
        { title: "Microsoft Power Apps", issuer: "Microsoft", category: "Cloud", image: "assets/certificates/microsoft power.png", description: "Microsoft Power Apps certification covering low-code app creation, connectors, and business process automation." },
        { title: "Claude AI", issuer: "AI Workshop", category: "AI", image: "assets/certificates/claude.png", description: "Workshop certification in leveraging Claude AI for practical applications — prompt engineering, AI-assisted development, and responsible AI usage." },
        { title: "TCS iON Communication Skills", issuer: "TCS iON", category: "Professional", image: "assets/certificates/tcsion.png", description: "Certificate in communication skills from TCS iON focusing on professional communication, listening, and workplace collaboration." }
    ],
    beyondCoding: [
        { title: "Cricket & Video Games", description: "Passionate cricket player and gaming enthusiast.", icon: "compass" },
        { title: "Typing", description: "Fast and accurate typing skills.", icon: "typewriter" },
        { title: "Reading", description: "I enjoy reading books on various topics.", icon: "book" }
    ],
    social: {
        github: "https://github.com/thirutharun65-tech",
        linkedin: "https://www.linkedin.com/in/thirumurugan-c-aa6228386/",
        instagram: "",
        twitter: "",
        leetcode: "https://leetcode.com/u/thirutharun/",
        mail: "thirutharun65@gmail.com",
        phone: "+91 8148204064",
        location: "India"
    }
};
window.portfolioData = portfolioData;