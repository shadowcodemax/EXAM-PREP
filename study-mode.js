// study-mode.js - Complete Study Mode with AI Tutor

// Course notes based on your lecture PDFs
const COURSE_NOTES = {
    "BIO102": {
        title: "General Biology II - Plant Diversity",
        notes: `
            <h3>📖 The Plant Kingdom</h3>
            <p>According to R.H. Whittaker, all living organisms are classified into 5 kingdoms: Monera, Protista, Fungi, Plantae and Animalia.</p>
            
            <h3>🌿 Characteristics of Kingdom Plantae</h3>
            <ul>
                <li>They are non-motile</li>
                <li>Presence of rigid cell wall</li>
                <li>They are autotrophs (make their own food)</li>
                <li>Multicellular eukaryotes</li>
                <li>Possess chlorophyll for photosynthesis</li>
            </ul>
            
            <h3>📚 Classification of Plant Kingdom</h3>
            <p>Five subgroups (Divisions):</p>
            <ul>
                <li><strong>Thallophyta</strong> - Algae (Spirogyra, Volvox, Fucus)</li>
                <li><strong>Bryophyta</strong> - Mosses, liverworts, hornworts</li>
                <li><strong>Pteridophyta</strong> - Ferns, horsetails, clubmosses</li>
                <li><strong>Gymnosperms</strong> - Naked seed plants (Pine, Cycads, Ginkgo)</li>
                <li><strong>Angiosperms</strong> - Flowering plants (enclosed seeds)</li>
            </ul>
            
            <h3>🔬 Pteridophytes (Seedless Vascular Plants)</h3>
            <ul>
                <li>First vascular plants to evolve on land</li>
                <li>Reproduce through spores (not seeds)</li>
                <li>Have true roots, stems, and leaves</li>
                <li>Dominant generation is sporophyte (2n)</li>
                <li>Examples: Ferns, horsetails, clubmosses</li>
            </ul>
            
            <h3>🌲 Gymnosperms (Naked Seeds)</h3>
            <ul>
                <li>Seeds not enclosed in fruit</li>
                <li>Mostly evergreen trees or shrubs</li>
                <li>Wind-pollinated</li>
                <li>Examples: Pine, Cycads, Ginkgo, Conifers</li>
            </ul>
            
            <h3>🌸 Angiosperms (Flowering Plants)</h3>
            <ul>
                <li>Seeds enclosed in fruit</li>
                <li>Have flowers for reproduction</li>
                <li>Double fertilization unique to angiosperms</li>
                <li>Examples: Sunflower, Mango, Wheat, Rice</li>
            </ul>
        `
    }
};

// Load user name
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.name.split(' ')[0];
}

// Get all courses from QUESTION_BANK
function getStudyCourses() {
    const courses = [];
    for (const [code, questions] of Object.entries(window.QUESTION_BANK || {})) {
        courses.push({
            code: code,
            name: getCourseDisplayName(code),
            questionCount: questions.length,
            hasNotes: COURSE_NOTES[code] ? true : false
        });
    }
    return courses.sort((a, b) => a.code.localeCompare(b.code));
}

function getCourseDisplayName(code) {
    const names = {
        "BIO101": "General Biology I",
        "BIO102": "General Biology II - Plant Diversity",
        "BMS101": "Basic Medical Sciences I",
        "BMS102": "Basic Medical Sciences II",
        "MCB101": "General Microbiology",
        "MTH101": "Calculus I",
        "MTH102": "Calculus II",
        "PHY101": "General Physics I",
        "PHY102": "General Physics II",
        "CHM101": "General Chemistry I",
        "CHM102": "General Chemistry II",
        "COS101": "Intro to Computer Science",
        "GST101": "Use of English"
    };
    return names[code] || code;
}

// Render study courses
function renderStudyCourses() {
    const courses = getStudyCourses();
    const grid = document.getElementById('studyCoursesGrid');
    
    if (courses.length === 0) {
        grid.innerHTML = '<div class="loading">No courses available. Please run question generator first.</div>';
        return;
    }
    
    grid.innerHTML = courses.map(course => `
        <div class="study-course-card glass" onclick="loadStudyNotes('${course.code}')">
            <div class="course-icon">📖</div>
            <div class="course-info">
                <div class="course-code">${course.code}</div>
                <div class="course-title">${course.name}</div>
                <div class="course-meta">${course.questionCount} questions available</div>
            </div>
            <div class="study-arrow">→</div>
        </div>
    `).join('');
}

// Load study notes for selected course
function loadStudyNotes(courseCode) {
    const courseNotes = COURSE_NOTES[courseCode];
    const panel = document.getElementById('studyNotesPanel');
    const title = document.getElementById('notesCourseTitle');
    const content = document.getElementById('notesContent');
    
    if (courseNotes) {
        title.textContent = courseNotes.title;
        content.innerHTML = courseNotes.notes;
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
    
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
}

function closeNotes() {
    document.getElementById('studyNotesPanel').style.display = 'none';
}

// AI Tutor Function
async function askAITutor() {
    const question = document.getElementById('aiQuestion').value.trim();
    if (!question) return;
    
    const chatBox = document.getElementById('chatBox');
    const loading = document.getElementById('aiLoading');
    
    // Add user message
    chatBox.innerHTML += `<div class="chat-message user"><strong>You:</strong> ${question}</div>`;
    document.getElementById('aiQuestion').value = '';
    loading.style.display = 'block';
    
    try {
        // Get API key
        let apiKey = localStorage.getItem('geminiKey');
        let answer = '';
        
        if (apiKey) {
            // Use Gemini API
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `You are an AI tutor for Nigerian university students. Answer this question based on the course material: ${question}` }] }]
                })
            });
            const data = await response.json();
            answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate an answer. Please try again.";
        } else {
            // Fallback responses based on keywords
            if (question.toLowerCase().includes('pteridophyte')) {
                answer = "Pteridophytes are seedless vascular plants that reproduce via spores. They were the first vascular plants to evolve on land and include ferns, horsetails, and clubmosses. The sporophyte generation is dominant in pteridophytes.";
            } else if (question.toLowerCase().includes('gymnosperm')) {
                answer = "Gymnosperms are seed plants with 'naked seeds' not enclosed in an ovary. They include conifers (pines), cycads, ginkgo, and gnetophytes. They are mostly evergreen trees and are wind-pollinated.";
            } else if (question.toLowerCase().includes('angiosperm')) {
                answer = "Angiosperms are flowering plants that produce seeds enclosed within fruits. They are the most diverse group of land plants and include monocots and dicots. They have unique double fertilization.";
            } else if (question.toLowerCase().includes('photosynthesis')) {
                answer = "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using chlorophyll, carbon dioxide, and water, releasing oxygen as a byproduct.";
            } else {
                answer = "I'm your AI tutor! Please connect your Gemini API key on the dashboard to get instant AI responses, or ask me about plant biology, pteridophytes, gymnosperms, angiosperms, or photosynthesis.";
            }
        }
        
        chatBox.innerHTML += `<div class="chat-message bot"><strong>🤖 AI Tutor:</strong> ${answer}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="chat-message bot"><strong>🤖 AI Tutor:</strong> Sorry, I encountered an error. Please check your API key or try again later.</div>`;
    } finally {
        loading.style.display = 'none';
    }
}

// Initialize
renderStudyCourses();
window.loadStudyNotes = loadStudyNotes;
window.closeNotes = closeNotes;
window.askAITutor = askAITutor;