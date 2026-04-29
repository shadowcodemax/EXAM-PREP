// configure.js - Load all courses from COURSES object

// Load user info
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) userNameSpan.textContent = currentUser.name.split(' ')[0];
}

// Load all courses from COURSES object
function loadCoursesToDropdown() {
    const courseSelect = document.getElementById('configCourse');
    if (!courseSelect) return;
    
    // Use COURSES from courses.js
    if (typeof window.COURSES === 'undefined') {
        console.error("COURSES not loaded!");
        courseSelect.innerHTML = '<option value="">Error: Courses not loaded</option>';
        return;
    }
    
    const courses = Object.keys(window.COURSES).sort();
    
    if (courses.length === 0) {
        courseSelect.innerHTML = '<option value="">No courses available</option>';
        return;
    }
    
    console.log("Loading", courses.length, "courses to dropdown");
    
    courseSelect.innerHTML = courses.map(code => {
        const courseInfo = window.COURSES[code];
        const displayName = `${code} - ${courseInfo.name}`;
        return `<option value="${code}">${displayName}</option>`;
    }).join('');
    
    // Check URL for preselected course
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam && courses.includes(courseParam)) {
        courseSelect.value = courseParam;
    }
}

// Start practice session
document.getElementById('startPracticeBtn')?.addEventListener('click', () => {
    const course = document.getElementById('configCourse').value;
    if (!course) {
        alert('Please select a course!');
        return;
    }
    
    const feedbackMode = document.querySelector('input[name="feedbackMode"]:checked').value;
    const timerDuration = document.querySelector('input[name="timerDuration"]:checked').value;
    const questionCount = parseInt(document.querySelector('input[name="questionCount"]:checked').value);
    
    // Get questions from QUESTION_BANK or generate fallback
    let questions = [];
    if (window.getQuestions) {
        questions = window.getQuestions(course, questionCount);
    }
    
    if (!questions || questions.length === 0) {
        // Generate fallback questions if none exist
        questions = generateFallbackQuestions(course, questionCount);
    }
    
    if (questions.length === 0) {
        alert('No questions available for this course yet!');
        return;
    }
    
    // Save exam config
    const examConfig = {
        course: course,
        courseName: window.COURSES?.[course]?.name || course,
        feedbackMode: feedbackMode,
        timerDuration: timerDuration === 'unlimited' ? null : parseInt(timerDuration),
        questionCount: questionCount,
        questions: questions,
        startTime: Date.now()
    };
    
    sessionStorage.setItem('examConfig', JSON.stringify(examConfig));
    window.location.href = 'exam.html';
});

// Generate fallback questions if none exist
function generateFallbackQuestions(course, count) {
    const questions = [];
    const courseInfo = window.COURSES?.[course] || { name: course };
    
    for (let i = 1; i <= Math.min(count, 50); i++) {
        questions.push({
            id: i,
            question: `Question ${i}: What is a key concept in ${courseInfo.name} (${course})?`,
            options: ["Option A: Fundamental principle", "Option B: Secondary concept", "Option C: Advanced topic", "Option D: Basic definition"],
            correct: i % 4,
            explanation: `This is a fundamental concept in ${courseInfo.name}. Review your course materials for more details.`
        });
    }
    return questions;
}

// Initialize
loadCoursesToDropdown();