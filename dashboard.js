// Dashboard JavaScript - Loads all courses from your question bank

// Get current user
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.querySelector('.user-name').textContent = currentUser.name.split(' ')[0];
}

// Course display names
function getCourseName(code) {
    const names = {
        "BIO101": "General Biology I", 
        "BIO102": "General Biology II - Plant Diversity", 
        "BIO103": "Cell Biology", 
        "BIO104": "Genetics",
        "BMS101": "Intro to Medical Sciences", 
        "BMS102": "Medical Biochemistry", 
        "BMS103": "Medical Physiology", 
        "BMS104": "Medical Anatomy", 
        "BMS105": "Pathology", 
        "BMS106": "Pharmacology",
        "MCB101": "General Microbiology", 
        "MCB102": "Bacteriology", 
        "MCB103": "Virology", 
        "MCB104": "Immunology", 
        "MCB105": "Medical Microbiology",
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

// Get all courses from QUESTION_BANK
function getAllCourses() {
    const courses = [];
    if (window.QUESTION_BANK) {
        for (const [code, questions] of Object.entries(window.QUESTION_BANK)) {
            courses.push({
                code: code,
                name: getCourseName(code),
                questionCount: questions.length,
                faculty: getFaculty(code)
            });
        }
    }
    return courses.sort((a, b) => a.code.localeCompare(b.code));
}

// Get faculty/icon
function getFaculty(code) {
    if (code.startsWith("BIO")) return { icon: "🧬", color: "#10b981" };
    if (code.startsWith("BMS")) return { icon: "🏥", color: "#ef4444" };
    if (code.startsWith("MCB")) return { icon: "🦠", color: "#f59e0b" };
    if (code.startsWith("MTH")) return { icon: "📐", color: "#8b5cf6" };
    if (code.startsWith("PHY")) return { icon: "⚡", color: "#3b82f6" };
    if (code.startsWith("CHM")) return { icon: "🧪", color: "#06b6d4" };
    if (code.startsWith("COS")) return { icon: "💻", color: "#ec4899" };
    if (code.startsWith("GST")) return { icon: "📖", color: "#6b7280" };
    return { icon: "📚", color: "#6b7280" };
}

// Load stats from localStorage
function loadStats() {
    const leaderboard = JSON.parse(localStorage.getItem('examPrepLeaderboard') || '[]');
    const userScores = leaderboard.filter(entry => entry.nickname === currentUser?.name);
    document.getElementById('totalAttempts').textContent = userScores.length;
    
    let totalScore = 0;
    userScores.forEach(score => { totalScore += score.rawScore || 0; });
    const avgScore = userScores.length > 0 ? Math.round(totalScore / userScores.length) : 0;
    document.getElementById('avgScore').textContent = avgScore + '%';
    
    const streak = localStorage.getItem('studyStreak') || 1;
    document.getElementById('studyStreak').textContent = streak;
    
    // Update total courses count
    const totalCourses = getAllCourses().length;
    document.getElementById('totalCourses').textContent = totalCourses;
}

// Render courses grid
function renderCourses() {
    const courses = getAllCourses();
    const grid = document.getElementById('coursesGrid');
    const coursesCount = document.getElementById('coursesCount');
    
    if (coursesCount) {
        coursesCount.textContent = courses.length + " COURSES";
    }
    
    if (courses.length === 0) {
        grid.innerHTML = '<div class="loading">No courses found. Please run the question generator.</div>';
        return;
    }
    
    grid.innerHTML = courses.map(course => {
        const faculty = getFaculty(course.code);
        return `
            <div class="course-card glass">
                <div class="course-icon" style="background: ${faculty.color}20;">${faculty.icon}</div>
                <div class="course-info">
                    <div class="course-code">${course.code}</div>
                    <div class="course-title">${course.name}</div>
                    <div class="course-stats">
                        <span>📚 ${course.questionCount} questions</span>
                    </div>
                    <div class="course-buttons">
                        <a href="configure.html?course=${course.code}" class="course-btn cbt">⚔️ CBT Mode</a>
                        <a href="study.html?course=${course.code}" class="course-btn study">📖 Study</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update mastery function
function updateMastery(courseCode, percentage) {
    let masteries = JSON.parse(localStorage.getItem('courseMasteries') || '{}');
    masteries[courseCode] = percentage;
    localStorage.setItem('courseMasteries', JSON.stringify(masteries));
}

// Initialize dashboard
function initDashboard() {
    loadStats();
    renderCourses();
}

// Make logout global
window.logout = function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);