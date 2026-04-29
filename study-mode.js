// study-mode.js - Complete Study Mode with AI Tutor

// Load user name
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.name.split(' ')[0];
}

// Comprehensive course notes based on your PDFs
const COURSE_NOTES = {
    "BIO102": {
        title: "BIO102 - General Biology II (Plant Diversity)",
        notes: `
            <div class="notes-section">
                <h3>🌿 The Plant Kingdom</h3>
                <p>According to R.H. Whittaker, all living organisms are classified into 5 kingdoms: <strong>Monera, Protista, Fungi, Plantae and Animalia</strong>.</p>
                
                <h4>Characteristics of Kingdom Plantae:</h4>
                <ul>
                    <li>They are non-motile</li>
                    <li>Presence of rigid cell wall</li>
                    <li>They are autotrophs (make their own food via photosynthesis)</li>
                    <li>They are multicellular eukaryotes</li>
                    <li>Possess photosynthetic pigment called chlorophyll</li>
                    <li>Have different organelles for anchorage, reproduction, support and photosynthesis</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>📚 Classification of Plant Kingdom</h3>
                <p>Based on plant body, vascular system, and seed formation, the plant kingdom is classified into <strong>five subgroups (Divisions)</strong>:</p>
                <ul>
                    <li><strong>Thallophyta</strong> - Algae (Spirogyra, Volvox, Fucus, Ulothrix)</li>
                    <li><strong>Bryophyta</strong> - Mosses, liverworts, hornworts</li>
                    <li><strong>Pteridophyta</strong> - Ferns, horsetails, clubmosses</li>
                    <li><strong>Gymnosperms</strong> - Naked seed plants (Pine, Cycads, Ginkgo)</li>
                    <li><strong>Angiosperms</strong> - Flowering plants (enclosed seeds)</li>
                </ul>
                <p><strong>Note:</strong> Cryptogams = Non-flowering and non-seed bearing plants (Thallophyta, Bryophyta, Pteridophyta)<br>
                <strong>Phanerogams</strong> = Flowering and seed bearing plants (Gymnosperms and Angiosperms)</p>
            </div>

            <div class="notes-section">
                <h3>🔬 Thallophyta (Algae)</h3>
                <ul>
                    <li>Absence of well-differentiated body parts (plant body called <strong>thallus</strong>)</li>
                    <li>May be filamentous, colonial, branched or unbranched</li>
                    <li>Found where there is adequate moisture</li>
                    <li>Cell wall composed of true cellulose</li>
                    <li>Reserve carbohydrate is starch</li>
                    <li>Examples: Spirogyra, Volvox, Fucus, Ulothrix, Chlamydomonas</li>
                </ul>
                
                <h4>Classification of Algae (9 divisions):</h4>
                <ul>
                    <li><strong>Chlorophyophyta</strong> (Green algae) - Chlamydomonas, Spirogyra, Chlorella</li>
                    <li><strong>Phaeophycophyta</strong> (Brown algae) - Fucus, Sargassum, Laminaria</li>
                    <li><strong>Rhodophycophyta</strong> (Red algae) - Plumaria elegans</li>
                    <li><strong>Bacillariophyophyta</strong> (Diatoms) - Diatoma, Fragilaria</li>
                    <li><strong>Euglenophycophyta</strong> (Euglenoids) - Euglena, Trachelomonas</li>
                    <li><strong>Pyrrophycophyta</strong> (Dinoflagellates) - Ceratium, Peridinium</li>
                    <li><strong>Xanthophyophyta</strong> (Yellow-green algae) - Vaucheria, Botrydium</li>
                    <li><strong>Chrysophycophyta</strong> (Golden algae) - Synura, Mallomonas</li>
                    <li><strong>Cryptophycophyta</strong> (Cryptomonads) - Cryptomonas, Chroomonas</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>🌱 Bryophytes (Non-vascular Plants)</h3>
                <ul>
                    <li>Lack specialized cells for transporting water and nutrients</li>
                    <li>Seedless in nature</li>
                    <li>Emerged early in evolutionary timeline of land plants</li>
                    <li>Examples: Liverworts, mosses, and hornworts</li>
                    <li>Gametophyte is the dominant generation</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>🌿 Pteridophytes (Seedless Vascular Plants)</h3>
                <ul>
                    <li>First vascular plants to evolve on land</li>
                    <li>Reproduce through <strong>spores</strong> (not seeds)</li>
                    <li>Contain vascular tissues (xylem and phloem) but lack xylem vessels and phloem companion cells</li>
                    <li>Have well-differentiated plant body into <strong>root, stem and leaves</strong></li>
                    <li>Spores develop in <strong>sporangia</strong></li>
                    <li>Can be <strong>homosporous</strong> (one type of spore) or <strong>heterosporous</strong> (two types: microspores and megaspores)</li>
                    <li>Male sex organs: <strong>Antheridia</strong> | Female sex organs: <strong>Archegonia</strong></li>
                    <li><strong>Sporophyte (2n)</strong> is the dominant generation</li>
                    <li>Examples: Ferns, horsetails, clubmosses, spike mosses</li>
                </ul>
                
                <h4>Classes of Pteridophytes:</h4>
                <ul>
                    <li><strong>Lycopodiopsida</strong> - Clubmosses, spike mosses (oldest vascular plants)</li>
                    <li><strong>Polypodiopsida</strong> - True ferns (most advanced, 10,500+ species)</li>
                    <li><strong>Psilotopsida</strong> - Whisk ferns, moonworts</li>
                    <li><strong>Equisetopsida</strong> - Horsetails (jointed stems, silica-rich)</li>
                </ul>
                
                <h4>Fern Structure:</h4>
                <ul>
                    <li>Leaves called <strong>fronds</strong>, divided into smaller segments called <strong>pinnae</strong></li>
                    <li><strong>Sori</strong> - Clusters of sporangia on underside of fronds</li>
                    <li><strong>Sporophylls</strong> - Leaves that bear sporangia</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>🌲 Gymnosperms (Naked Seeds)</h3>
                <ul>
                    <li>Seeds are <strong>not enclosed</strong> within an ovary (no fruit)</li>
                    <li>Usually have woody stems, mostly evergreen trees or shrubs</li>
                    <li>Pollination is mostly by <strong>wind</strong></li>
                    <li>Ovules exposed on scale-like structures called ovuliferous scales</li>
                    <li>Four main divisions: Coniferophyta, Cycadophyta, Ginkgophyta, Gnetophyta</li>
                    <li>Examples: Pine (Pinus), Cycads, Ginkgo, Conifers</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>🌸 Angiosperms (Flowering Plants)</h3>
                <ul>
                    <li>Seeds enclosed within an <strong>ovary</strong> that matures into a <strong>fruit</strong></li>
                    <li>Highly diverse, including herbs, shrubs, and trees</li>
                    <li>Have flowers for reproduction</li>
                    <li><strong>Double fertilization</strong> is unique to angiosperms</li>
                    <li>Pollination by wind, insects, animals, or water</li>
                    <li>Examples: Sunflower, Mango, Wheat, Rice, Maize</li>
                </ul>
            </div>

            <div class="notes-section">
                <h3>📖 Seed Structure and Importance</h3>
                <p>A seed consists of:</p>
                <ul>
                    <li><strong>Seed coat (testa)</strong> - Protective outer layer</li>
                    <li><strong>Embryo</strong> - Developing young sporophyte</li>
                    <li><strong>Endosperm</strong> - Nutritive tissue for embryo</li>
                    <li><strong>Cotyledons</strong> - Seed leaves that may store food</li>
                </ul>
                <p><strong>Importance of Seeds:</strong> Protection of embryo, food reserve, facilitates dispersal, dormancy helps timing germination</p>
            </div>

            <div class="notes-section">
                <h3>📊 Comparison Table</h3>
                <table class="comparison-table">
                    <tr><th>Feature</th><th>Bryophytes</th><th>Pteridophytes</th><th>Gymnosperms/Angiosperms</th></tr>
                    <tr><td>Vascular tissue</td><td>Absent</td><td>Present</td><td>Present</td></tr>
                    <tr><td>Dominant phase</td><td>Gametophyte</td><td>Sporophyte</td><td>Sporophyte</td></tr>
                    <tr><td>True roots, stems, leaves</td><td>Absent</td><td>Present</td><td>Present</td></tr>
                    <tr><td>Seed formation</td><td>No</td><td>No</td><td>Yes</td></tr>
                    <tr><td>Reproduction</td><td>Spores</td><td>Spores</td><td>Seeds</td></tr>
                </table>
            </div>
        `
    }
};

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

// Get all courses from QUESTION_BANK
function getStudyCourses() {
    const courses = [];
    if (window.QUESTION_BANK) {
        for (const [code, questions] of Object.entries(window.QUESTION_BANK)) {
            courses.push({
                code: code,
                name: getCourseDisplayName(code),
                questionCount: questions.length,
                hasNotes: COURSE_NOTES[code] ? true : false
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
            <div class="course-icon">${course.hasNotes ? '📖' : '📚'}</div>
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
    
    // Clear previous chat
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.innerHTML = `<div class="chat-message bot">👋 Hi! I'm your AI Tutor. Ask me anything about ${getCourseDisplayName(courseCode)}!</div>`;
    }
    
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
    
    // Store current course for AI
    window.currentStudyCourse = courseCode;
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
    chatBox.scrollTop = chatBox.scrollHeight;
    
    try {
        let answer = '';
        
        // Fallback responses based on keywords (since Gemini needs API key)
        const q = question.toLowerCase();
        
        if (q.includes('pteridophyte') || q.includes('fern')) {
            answer = "Pteridophytes are seedless vascular plants that reproduce via spores. They were the first vascular plants to evolve on land. Key features: have true roots, stems, and leaves (fronds); sporophyte is dominant generation; reproduce through spores in sporangia (sori); examples include ferns, horsetails, and clubmosses.";
        } 
        else if (q.includes('gymnosperm')) {
            answer = "Gymnosperms are seed plants with 'naked seeds' not enclosed in an ovary or fruit. They are mostly evergreen trees or shrubs, wind-pollinated, and have needle-like or scale-like leaves. Four divisions: Coniferophyta (pines, firs), Cycadophyta (cycads), Ginkgophyta (ginkgo), and Gnetophyta. Examples: Pine, Cycads, Ginkgo.";
        }
        else if (q.includes('angiosperm')) {
            answer = "Angiosperms are flowering plants that produce seeds enclosed within fruits. They are the most diverse group of land plants. Key features: have flowers for reproduction, undergo double fertilization (unique to angiosperms), seeds enclosed in fruit, can be herbs, shrubs, or trees. Examples: Sunflower, Mango, Wheat, Rice, Maize.";
        }
        else if (q.includes('bryophyte')) {
            answer = "Bryophytes are non-vascular plants that lack specialized cells for transporting water and nutrients. They are seedless and were among the first plants to colonize land. The gametophyte generation is dominant. Examples include mosses, liverworts, and hornworts.";
        }
        else if (q.includes('algae') || q.includes('thallophyta')) {
            answer = "Algae (Thallophyta) are simple plants with undifferentiated body called thallus. They are classified into 9 divisions based on pigments, reserved food, and reproduction. Examples: Green algae (Spirogyra, Chlamydomonas), Brown algae (Fucus, Sargassum), Red algae (Plumaria), Diatoms, Euglenoids, Dinoflagellates.";
        }
        else if (q.includes('seed')) {
            answer = "A seed consists of: Seed coat (testa) for protection, embryo (developing young plant), endosperm (nutritive tissue), and cotyledons (seed leaves). Seeds protect the embryo, provide food reserve, facilitate dispersal, and allow dormancy for germination under favorable conditions.";
        }
        else if (q.includes('photosynthesis')) {
            answer = "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose). It occurs in chloroplasts using chlorophyll. Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.";
        }
        else if (q.includes('difference') || q.includes('compare')) {
            answer = "Here's a quick comparison:\n\n• Bryophytes: Non-vascular, gametophyte dominant, no true roots/stems/leaves, reproduce by spores\n• Pteridophytes: Vascular, sporophyte dominant, have true roots/stems/leaves, reproduce by spores\n• Gymnosperms: Vascular, sporophyte dominant, naked seeds, mostly evergreen trees\n• Angiosperms: Vascular, sporophyte dominant, seeds enclosed in fruit, have flowers, double fertilization";
        }
        else {
            answer = `I'm your AI tutor for ${getCourseDisplayName(window.currentStudyCourse)}! Please ask me specific questions about:\n\n• Plant classification (Thallophyta, Bryophyta, Pteridophyta, Gymnosperms, Angiosperms)\n• Algae types and characteristics\n• Ferns and pteridophytes\n• Seed plants (Gymnosperms vs Angiosperms)\n• Plant anatomy and physiology\n• Differences between plant groups\n\nOr connect your Gemini API key on the dashboard for more detailed AI responses!`;
        }
        
        chatBox.innerHTML += `<div class="chat-message bot"><strong>🤖 AI Tutor:</strong><br>${answer}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="chat-message bot"><strong>🤖 AI Tutor:</strong> Sorry, I encountered an error. Please try again.</div>`;
    } finally {
        loading.style.display = 'none';
    }
}

// Initialize
renderStudyCourses();

// Make functions global
window.loadStudyNotes = loadStudyNotes;
window.closeNotes = closeNotes;
window.askAITutor = askAITutor;