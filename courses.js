// EXAM PREP - Complete Course List
// All Nigerian University Courses

const COURSES = {
    // ========== BIOLOGICAL SCIENCES ==========
    "BIO101": { name: "General Biology I", icon: "🧬", questions: 50 },
    "BIO102": { name: "General Biology II - Plant Diversity", icon: "🌿", questions: 50 },
    "BIO103": { name: "Cell Biology", icon: "🔬", questions: 40 },
    "BIO104": { name: "Genetics", icon: "🧬", questions: 45 },
    "BIO201": { name: "Molecular Biology", icon: "🧪", questions: 40 },
    "BIO202": { name: "Ecology", icon: "🌍", questions: 35 },
    
    // ========== BASIC MEDICAL SCIENCES (BMS) ==========
    "BMS101": { name: "Introduction to Medical Sciences", icon: "🏥", questions: 40 },
    "BMS102": { name: "Medical Biochemistry", icon: "🧪", questions: 50 },
    "BMS103": { name: "Medical Physiology", icon: "❤️", questions: 55 },
    "BMS104": { name: "Medical Anatomy", icon: "🦴", questions: 60 },
    "BMS105": { name: "Pathology", icon: "🔬", questions: 45 },
    "BMS106": { name: "Pharmacology", icon: "💊", questions: 50 },
    "BMS107": { name: "Medical Microbiology", icon: "🦠", questions: 45 },
    "BMS108": { name: "Immunology", icon: "🛡️", questions: 40 },
    "BMS109": { name: "Parasitology", icon: "🐛", questions: 35 },
    "BMS110": { name: "Virology", icon: "🦠", questions: 35 },
    "BMS201": { name: "Clinical Medicine", icon: "🏥", questions: 50 },
    "BMS202": { name: "Surgery", icon: "🔪", questions: 45 },
    "BMS203": { name: "Obstetrics & Gynecology", icon: "👶", questions: 40 },
    "BMS204": { name: "Pediatrics", icon: "👧", questions: 40 },
    "BMS205": { name: "Psychiatry", icon: "🧠", questions: 35 },
    "BMS206": { name: "Community Health", icon: "👥", questions: 35 },
    
    // ========== BIOCHEMISTRY (BCH) ==========
    "BCH101": { name: "General Biochemistry", icon: "🧪", questions: 50 },
    "BCH102": { name: "Protein Biochemistry", icon: "🥚", questions: 40 },
    "BCH103": { name: "Enzymology", icon: "⚡", questions: 40 },
    "BCH104": { name: "Metabolism", icon: "🔥", questions: 45 },
    "BCH105": { name: "Clinical Biochemistry", icon: "🩺", questions: 40 },
    "BCH106": { name: "Molecular Biochemistry", icon: "🧬", questions: 35 },
    
    // ========== ANATOMY (ANA) ==========
    "ANA101": { name: "Gross Anatomy I", icon: "🦴", questions: 50 },
    "ANA102": { name: "Gross Anatomy II", icon: "🦴", questions: 50 },
    "ANA103": { name: "Neuroanatomy", icon: "🧠", questions: 45 },
    "ANA104": { name: "Regional Anatomy", icon: "📍", questions: 40 },
    "ANA105": { name: "Histology", icon: "🔬", questions: 40 },
    "ANA106": { name: "Embryology", icon: "🥚", questions: 35 },
    
    // ========== CYBER SECURITY (CYB) ==========
    "CYB101": { name: "Introduction to Cybersecurity", icon: "🔒", questions: 45 },
    "CYB102": { name: "Network Security", icon: "🌐", questions: 40 },
    "CYB103": { name: "Ethical Hacking", icon: "💻", questions: 50 },
    "CYB104": { name: "Digital Forensics", icon: "🔍", questions: 40 },
    "CYB105": { name: "Cryptography", icon: "🔐", questions: 45 },
    "CYB106": { name: "Information Security", icon: "📁", questions: 40 },
    "CYB201": { name: "Penetration Testing", icon: "🎯", questions: 45 },
    "CYB202": { name: "Incident Response", icon: "🚨", questions: 35 },
    
    // ========== SENATE (SEN) - Social/Management ==========
    "SEN101": { name: "Leadership Studies", icon: "👑", questions: 35 },
    "SEN102": { name: "Public Administration", icon: "🏛️", questions: 35 },
    "SEN103": { name: "Governance & Politics", icon: "🗳️", questions: 35 },
    "SEN104": { name: "Ethics & Values", icon: "⚖️", questions: 30 },
    
    // ========== STATISTICS (STA) ==========
    "STA101": { name: "Introduction to Statistics", icon: "📊", questions: 45 },
    "STA102": { name: "Probability Theory", icon: "🎲", questions: 40 },
    "STA103": { name: "Statistical Inference", icon: "📈", questions: 40 },
    "STA104": { name: "Regression Analysis", icon: "📉", questions: 35 },
    "STA105": { name: "Multivariate Statistics", icon: "📊", questions: 35 },
    "STA201": { name: "Time Series Analysis", icon: "⏰", questions: 35 },
    "STA202": { name: "Bayesian Statistics", icon: "📊", questions: 30 },
    
    // ========== MATHEMATICS ==========
    "MTH101": { name: "Calculus I", icon: "📐", questions: 50 },
    "MTH102": { name: "Calculus II", icon: "📈", questions: 50 },
    "MTH103": { name: "Linear Algebra", icon: "📊", questions: 45 },
    "MTH104": { name: "Abstract Algebra", icon: "🔢", questions: 40 },
    
    // ========== PHYSICS ==========
    "PHY101": { name: "General Physics I", icon: "⚡", questions: 50 },
    "PHY102": { name: "General Physics II", icon: "🌊", questions: 50 },
    "PHY103": { name: "Electricity & Magnetism", icon: "🧲", questions: 45 },
    
    // ========== CHEMISTRY ==========
    "CHM101": { name: "General Chemistry I", icon: "🧪", questions: 50 },
    "CHM102": { name: "General Chemistry II", icon: "⚗️", questions: 50 },
    "CHM103": { name: "Organic Chemistry", icon: "🧴", questions: 45 },
    "CHM104": { name: "Inorganic Chemistry", icon: "🔬", questions: 40 },
    
    // ========== COMPUTER SCIENCE ==========
    "COS101": { name: "Intro to Computer Science", icon: "💻", questions: 50 },
    "COS102": { name: "Programming Fundamentals", icon: "📝", questions: 50 },
    "COS103": { name: "Data Structures", icon: "🌲", questions: 45 },
    "COS104": { name: "Database Systems", icon: "🗄️", questions: 40 },
    "COS105": { name: "Web Development", icon: "🌐", questions: 40 },
    "COS106": { name: "Artificial Intelligence", icon: "🤖", questions: 45 },
    
    // ========== ENGINEERING ==========
    "ENG101": { name: "Engineering Drawing", icon: "✏️", questions: 40 },
    "ENG102": { name: "Engineering Mechanics", icon: "⚙️", questions: 40 },
    "ENG103": { name: "Fluid Mechanics", icon: "💧", questions: 35 },
    "ENG104": { name: "Thermodynamics", icon: "🔥", questions: 35 },
    
    // ========== GENERAL STUDIES ==========
    "GST101": { name: "Use of English", icon: "📖", questions: 45 },
    "GST102": { name: "Nigerian Peoples & Culture", icon: "🇳🇬", questions: 40 },
    "GST103": { name: "Philosophy & Logic", icon: "🧠", questions: 35 },
    "GST104": { name: "Entrepreneurship", icon: "💼", questions: 35 },
    "GST105": { name: "ICT Appreciation", icon: "💻", questions: 40 }
};

// Make available globally
window.COURSES = COURSES;
console.log("✅ Courses loaded:", Object.keys(COURSES).length, "courses");