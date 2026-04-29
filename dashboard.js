// Dashboard JavaScript
console.log("Dashboard loading...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM ready");
    
    // Check if COURSES exists
    if (typeof window.COURSES === 'undefined') {
        console.error("COURSES not found! Check if courses.js loaded.");
        const grid = document.getElementById('coursesGrid');
        if (grid) grid.innerHTML = '<div class="error">Error: Course list not loaded. Please refresh.</div>';
        return;
    }
    
    console.log("COURSES found with", Object.keys(window.COURSES).length, "courses");
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const userNameSpan = document.querySelector('.user-name');
        if (userNameSpan) userNameSpan.textContent = currentUser.name.split(' ')[0];
    }
    
    // Get all courses from COURSES object
    function getAllCourses() {
        const courses = [];
        for (const [code, info] of Object.entries(window.COURSES)) {
            courses.push({
                code: code,
                name: info.name,
                icon: info.icon,
                questionCount: info.questions
            });
        }
        return courses.sort((a, b) => a.code.localeCompare(b.code));
    }
    
    // Render courses grid
    function renderCourses() {
        const courses = getAllCourses();
        const grid = document.getElementById('coursesGrid');
        const coursesCount = document.getElementById('coursesCount');
        
        if (!grid) {
            console.error("coursesGrid element not found!");
            return;
        }
        
        console.log("Rendering", courses.length, "courses");
        
        if (courses.length === 0) {
            grid.innerHTML = '<div class="loading">No courses found. Please check back later.</div>';
            return;
        }
        
        if (coursesCount) coursesCount.textContent = courses.length + " COURSES";
        const totalCoursesElem = document.getElementById('totalCourses');
        if (totalCoursesElem) totalCoursesElem.textContent = courses.length;
        
        grid.innerHTML = courses.map(course => `
            <div class="course-card glass">
                <div class="course-icon" style="font-size: 2rem;">${course.icon || '📚'}</div>
                <div class="course-info">
                    <div class="course-code">${course.code}</div>
                    <div class="course-title">${course.name}</div>
                    <div class="course-stats"><span>📚 ${course.questionCount}+ questions</span></div>
                    <div class="course-buttons">
                        <a href="configure.html?course=${course.code}" class="course-btn cbt">⚔️ CBT Mode</a>
                        <a href="study.html?course=${course.code}" class="course-btn study">📖 Study</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Load stats
    function loadStats() {
        const leaderboard = JSON.parse(localStorage.getItem('examPrepLeaderboard') || '[]');
        const userScores = leaderboard.filter(entry => entry.nickname === currentUser?.name);
        const totalAttemptsElem = document.getElementById('totalAttempts');
        if (totalAttemptsElem) totalAttemptsElem.textContent = userScores.length;
        
        let totalScore = 0;
        userScores.forEach(score => { totalScore += score.rawScore || 0; });
        const avgScore = userScores.length > 0 ? Math.round(totalScore / userScores.length) : 0;
        const avgScoreElem = document.getElementById('avgScore');
        if (avgScoreElem) avgScoreElem.textContent = avgScore + '%';
    }
    
    renderCourses();
    loadStats();
});

window.logout = function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};