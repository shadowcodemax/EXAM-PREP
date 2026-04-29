// study-mode.js - Study Mode for EXAM PREP

// Load user name
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.name.split(' ')[0];
}

// Get course display name
function getCourseDisplayName(code) {
    const names = {
        "BIO101": "General Biology I",
        "BIO102": "General Biology II - Plant Diversity",
        "BIO103": "Cell Biology",
        "BIO104": "Genetics",
        "BMS101": "Intro to Medical Sciences",
        "BMS102": "Medical Biochemistry",
        "BMS103": "Medical Physiology",
        "BMS104": "Medical Anatomy",
        "MCB101": "General Microbiology",
        "MCB102": "Bacteriology",
        "MCB103": "Virology",
        "MCB104": "Immunology",
        "MTH101": "Calculus I",
        "MTH102": "Calculus II",
        "PHY101": "General Physics I",
        "PHY102": "General Physics II",
        "CHM101": "General Chemistry I",
        "CHM102": "General Chemistry II",
        "COS101": "Intro to Computer Science",
        "COS102": "Programming",
        "GST101": "Use of English",
        "GST102": "Nigerian Peoples & Culture"
    };
    return names[code] || code;
}

// Get all courses from QUESTION_BANK (same as dashboard)
function getStudyCourses() {
    const courses = [];
    if (window.QUESTION_BANK) {
        for (const [code, questions] of Object.entries(window.QUESTION_BANK)) {
            courses.push({
                code: code,
                name: getCourseDisplayName(code),
                questionCount: questions.length
            });
        }
    }
    return courses.sort((a, b) => a.code.localeCompare(b.code));
}

// Render study courses grid
function renderStudyCourses() {
    const courses = getStudyCourses();
    const grid = document.getElementById('studyCoursesGrid');
    
    if (courses.length === 0) {
        grid.innerHTML = '<div class="loading">No courses found. Please run the question generator first.</div>';
        return;
    }
    
    grid.innerHTML = courses.map(course => `
        <div class="study-course-card glass" onclick="loadStudyNotes('${course.code}')">
            <div class="course-icon">📖</div>
            <div class="course-info">
                <div class="course-code">${course.code}</div>
                <div class="course-title">${course.name}</div>
                <div class="course-meta">📚 ${course.questionCount} questions available</div>
            </div>
            <div class="study-arrow">→</div>
        </div>
    `).join('');
}

// Study notes content (you can add more courses here)
const STUDY_NOTES = {
    "BIO102": {
        title: "BIO102 - General Biology II (Plant Diversity)",
        content: `
            <div class="notes-section">
                <h3>🌿 The Plant Kingdom</h3>
                <p>According to R.H. Whittaker, all living organisms are classified into 5 kingdoms: Monera, Protista, Fungi, Plantae and Animalia.</p>
                
                <h4>Characteristics of Kingdom Plantae:</h4>
                <ul>
                    <li>They are non-motile</li>
                    <li>Presence of rigid cell wall</li>
                    <li>They are autotrophs (make their own food)</li>
                    <li>Multicellular eukaryotes</li>
                    <li>Possess chlorophyll for photosynthesis</li>
                </ul>
            </div>
            <div class="notes-section">
                <h3>📚 Classification of Plant Kingdom</h3>
                <ul>
                    <li><strong>Thallophyta</strong> - Algae (Spirogyra, Volvox, Fucus)</li>
                    <li><strong>Bryophyta</strong> - Mosses, liverworts, hornworts</li>
                    <li><strong>Pteridophyta</strong> - Ferns, horsetails, clubmosses</li>
                    <li><strong>Gymnosperms</strong> - Naked seed plants (Pine, Cycads, Ginkgo)</li>
                    <li><strong>Angiosperms</strong> - Flowering plants (enclosed seeds)</li>
                </ul>
            </div>
        `
    }
};

function loadStudyNotes(courseCode) {
    const panel = document.getElementById('studyNotesPanel');
    const title = document.getElementById('notesCourseTitle');
    const content = document.getElementById('notesContent');
    
    const notes = STUDY_NOTES[courseCode];
    
    if (notes) {
        title.textContent = notes.title;
        content.innerHTML = notes.content;
    } else {
        title.textContent = getCourseDisplayName(courseCode);
        content.innerHTML = `
            <div class="placeholder-notes">
                <div class="placeholder-icon">📚</div>
                <h3>Study Notes Coming Soon</h3>
                <p>Comprehensive lecture notes for ${getCourseDisplayName(courseCode)} are being prepared.</p>
                <p>In the meantime, try the <strong>Challenge Arena</strong> to test your knowledge!</p>
                <a href="configure.html?course=${courseCode}" class="btn">⚔️ Take CBT Exam</a>
            </div>
        `;
    }
    
    // Reset chat
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.innerHTML = `<div class="chat-message bot">👋 Hi! I'm your AI Tutor. Ask me anything about ${getCourseDisplayName(courseCode)}!</div>`;
    }
    
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
    window.currentStudyCourse = courseCode;
}

function closeNotes() {
    document.getElementById('studyNotesPanel').style.display = 'none';
}

// AI Tutor
async function askAITutor() {
    const question = document.getElementById('aiQuestion').value.trim();
    if (!question) return;
    
    const chatBox = document.getElementById('chatBox');
    const loading = document.getElementById('aiLoading');
    
    chatBox.innerHTML += `<div class="chat-message user"><strong>You:</strong> ${question}</div>`;
    document.getElementById('aiQuestion').value = '';
    loading.style.display = 'block';
    chatBox.scrollTop = chatBox.scrollHeight;
    
    setTimeout(() => {
        const q = question.toLowerCase();
        let answer = "";
        
        if (q.includes('pteridophyte') || q.includes('fern')) {
            answer = "Pteridophytes are seedless vascular plants that reproduce via spores. They were the first vascular plants to evolve on land. Examples: ferns, horsetails, clubmosses. The sporophyte generation is dominant.";
        } else if (q.includes('gymnosperm')) {
            answer = "Gymnosperms are seed plants with 'naked seeds' not enclosed in an ovary. They are mostly evergreen trees, wind-pollinated. Examples: Pine, Cycads, Ginkgo.";
        } else if (q.includes('angiosperm')) {
            answer = "Angiosperms are flowering plants that produce seeds enclosed within fruits. They undergo double fertilization. Examples: Sunflower, Mango, Wheat, Rice.";
        } else if (q.includes('bryophyte')) {
            answer = "Bryophytes are non-vascular plants. The gametophyte generation is dominant. Examples: Mosses, liverworts, hornworts.";
        } else {
            answer = `I'm your AI Tutor for ${getCourseDisplayName(window.currentStudyCourse)}. Ask me about plant classification, pteridophytes, gymnosperms, angiosperms, or connect your Gemini API key on the dashboard for more detailed responses!`;
        }
        
        chatBox.innerHTML += `<div class="chat-message bot"><strong>🤖 AI Tutor:</strong><br>${answer}</div>`;
        loading.style.display = 'none';
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// Initialize
renderStudyCourses();
window.loadStudyNotes = loadStudyNotes;
window.closeNotes = closeNotes;
window.askAITutor = askAITutor;