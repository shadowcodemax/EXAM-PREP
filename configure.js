// Configure Session Logic

// Load user info
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.name.split(' ')[0];
}

// Load courses into dropdown
function loadCourses() {
    const courseSelect = document.getElementById('configCourse');
    if (!courseSelect) return;
    
    const courses = window.QUESTION_BANK ? Object.keys(window.QUESTION_BANK) : [];
    
    if (courses.length === 0) {
        courseSelect.innerHTML = '<option value="">No courses found. Run generator first.</option>';
        return;
    }
    
    courseSelect.innerHTML = courses.map(code => {
        let name = code;
        if (code.startsWith('BIO')) name = code + ' - Biology';
        else if (code.startsWith('BMS')) name = code + ' - Medical Sciences';
        else if (code.startsWith('MCB')) name = code + ' - Microbiology';
        else if (code.startsWith('MTH')) name = code + ' - Mathematics';
        else if (code.startsWith('PHY')) name = code + ' - Physics';
        else if (code.startsWith('CHM')) name = code + ' - Chemistry';
        else if (code.startsWith('COS')) name = code + ' - Computer Science';
        else if (code.startsWith('GST')) name = code + ' - General Studies';
        else name = code;
        
        return `<option value="${code}">${name}</option>`;
    }).join('');
    
    // Check URL for selected course
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam && courses.includes(courseParam)) {
        courseSelect.value = courseParam;
    }
}

// Start practice session
document.getElementById('startPracticeBtn').addEventListener('click', () => {
    const course = document.getElementById('configCourse').value;
    if (!course) {
        alert('Please select a course!');
        return;
    }
    
    const feedbackMode = document.querySelector('input[name="feedbackMode"]:checked').value;
    const timerDuration = document.querySelector('input[name="timerDuration"]:checked').value;
    const questionCount = parseInt(document.querySelector('input[name="questionCount"]:checked').value);
    
    // Get questions for the course
    const questions = window.getQuestions ? window.getQuestions(course, questionCount) : [];
    
    if (questions.length === 0) {
        alert('No questions available for this course!');
        return;
    }
    
    // Save exam config to sessionStorage
    const examConfig = {
        course: course,
        feedbackMode: feedbackMode,
        timerDuration: timerDuration === 'unlimited' ? null : parseInt(timerDuration),
        questionCount: questionCount,
        questions: questions,
        startTime: Date.now()
    };
    
    sessionStorage.setItem('examConfig', JSON.stringify(examConfig));
    
    // Redirect to exam page
    window.location.href = 'exam.html';
});

// Load courses when page loads
loadCourses();