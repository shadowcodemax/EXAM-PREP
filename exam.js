// Exam Logic - Handles timer, questions, navigation, results

let examData = {
    questions: [],
    userAnswers: [],
    currentIndex: 0,
    config: null,
    timerInterval: null,
    timeRemaining: null,
    examStarted: null
};

// Load exam from sessionStorage
function loadExam() {
    const savedConfig = sessionStorage.getItem('examConfig');
    if (!savedConfig) {
        window.location.href = 'configure.html';
        return;
    }
    
    examData.config = JSON.parse(savedConfig);
    examData.questions = examData.config.questions;
    examData.userAnswers = new Array(examData.questions.length).fill(null);
    examData.examStarted = Date.now();
    
    // Update UI
    document.getElementById('examCourse').textContent = getCourseName(examData.config.course);
    document.getElementById('examCode').textContent = examData.config.course;
    document.getElementById('totalQ').textContent = examData.questions.length;
    
    // Setup timer
    if (examData.config.timerDuration) {
        examData.timeRemaining = examData.config.timerDuration * 60;
        startTimer();
    } else {
        document.querySelector('.exam-timer').innerHTML = '⏱️ Unlimited';
    }
    
    // Display first question
    displayQuestion();
    renderQuestionMap();
}

function getCourseName(code) {
    const names = {
        "BIO101": "General Biology", "MCB101": "Microbiology", "BMS101": "Medical Sciences",
        "MTH101": "Calculus", "PHY101": "Physics", "CHM101": "Chemistry", "COS101": "Computer Science"
    };
    return names[code] || code;
}

function startTimer() {
    examData.timerInterval = setInterval(() => {
        if (examData.timeRemaining <= 0) {
            clearInterval(examData.timerInterval);
            alert('⏰ Time is up! Submitting your exam...');
            submitExam();
            return;
        }
        
        examData.timeRemaining--;
        const minutes = Math.floor(examData.timeRemaining / 60);
        const seconds = examData.timeRemaining % 60;
        document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (examData.timeRemaining < 300) {
            document.getElementById('timerDisplay').style.color = '#ff4444';
        }
    }, 1000);
}

function displayQuestion() {
    const q = examData.questions[examData.currentIndex];
    if (!q) return;
    
    document.getElementById('questionNumber').textContent = examData.currentIndex + 1;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('currentQNum').textContent = examData.currentIndex + 1;
    
    const optionsArea = document.getElementById('optionsArea');
    optionsArea.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = `option-card ${examData.userAnswers[examData.currentIndex] === idx ? 'selected' : ''}`;
        optionDiv.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + idx)}</div>
            <div class="option-text">${opt}</div>
        `;
        optionDiv.onclick = () => selectAnswer(idx);
        optionsArea.appendChild(optionDiv);
    });
    
    updateNavButtons();
}

function selectAnswer(answerIndex) {
    examData.userAnswers[examData.currentIndex] = answerIndex;
    
    // Update styling
    const options = document.querySelectorAll('.option-card');
    options.forEach((opt, idx) => {
        if (idx === answerIndex) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    renderQuestionMap();
    
    // Instant feedback
    if (examData.config.feedbackMode === 'instant') {
        const q = examData.questions[examData.currentIndex];
        const isCorrect = (answerIndex === q.correct);
        
        const feedback = document.createElement('div');
        feedback.className = `instant-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = `
            <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
            <div class="feedback-text">
                <strong>${isCorrect ? 'Correct!' : 'Incorrect!'}</strong>
                <p>${q.explanation || 'No explanation available.'}</p>
            </div>
            <button class="feedback-close" onclick="this.parentElement.remove()">✕</button>
        `;
        
        document.querySelector('.question-area').appendChild(feedback);
        setTimeout(() => feedback.remove(), 4000);
    }
}

function renderQuestionMap() {
    const mapContainer = document.getElementById('questionMap');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = examData.questions.map((_, idx) => {
        const isAnswered = examData.userAnswers[idx] !== null;
        const isCurrent = idx === examData.currentIndex;
        return `<button class="map-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="jumpToQuestion(${idx})">${idx + 1}</button>`;
    }).join('');
}

function jumpToQuestion(index) {
    examData.currentIndex = index;
    displayQuestion();
    renderQuestionMap();
}

function nextQuestion() {
    if (examData.currentIndex + 1 < examData.questions.length) {
        examData.currentIndex++;
        displayQuestion();
        renderQuestionMap();
    } else {
        submitExam();
    }
}

function previousQuestion() {
    if (examData.currentIndex > 0) {
        examData.currentIndex--;
        displayQuestion();
        renderQuestionMap();
    }
}

function updateNavButtons() {
    const nextBtn = document.getElementById('nextBtn');
    if (examData.currentIndex === examData.questions.length - 1) {
        nextBtn.textContent = 'Submit Exam →';
    } else {
        nextBtn.textContent = 'Next Question →';
    }
}

function submitExam() {
    if (examData.timerInterval) clearInterval(examData.timerInterval);
    
    // Calculate score
    let score = 0;
    const results = [];
    
    examData.questions.forEach((q, idx) => {
        const userAnswer = examData.userAnswers[idx];
        const isCorrect = (userAnswer === q.correct);
        if (isCorrect) score++;
        
        results.push({
            question: q.question,
            userAnswer: userAnswer !== null ? q.options[userAnswer] : 'Not answered',
            correctAnswer: q.options[q.correct],
            isCorrect: isCorrect,
            explanation: q.explanation
        });
    });
    
    const total = examData.questions.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = Math.floor((Date.now() - examData.examStarted) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    // Save to leaderboard
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        let leaderboard = JSON.parse(localStorage.getItem('examPrepLeaderboard') || '[]');
        leaderboard.push({
            nickname: currentUser.name,
            course: examData.config.course,
            score: `${score}/${total} (${percentage}%)`,
            rawScore: percentage,
            date: new Date().toLocaleDateString()
        });
        leaderboard.sort((a, b) => b.rawScore - a.rawScore);
        leaderboard = leaderboard.slice(0, 50);
        localStorage.setItem('examPrepLeaderboard', JSON.stringify(leaderboard));
    }
    
    // Show results
    showResults(score, total, percentage, minutes, seconds, results);
}

function showResults(score, total, percentage, minutes, seconds, results) {
    const modal = document.getElementById('resultsModal');
    const content = document.getElementById('resultsContent');
    
    let gradeClass = percentage >= 70 ? 'grade-a' : percentage >= 50 ? 'grade-b' : 'grade-f';
    let message = percentage >= 70 ? '🎉 Excellent! You crushed it!' : percentage >= 50 ? '👍 Good effort!' : '📚 Keep practicing!';
    
    let html = `
        <div class="results-summary">
            <div class="grade-circle ${gradeClass}">${percentage}%</div>
            <h2>Exam Complete!</h2>
            <p>Score: ${score}/${total} (${percentage}%)</p>
            <p>Time: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
            <p class="grade-message">${message}</p>
        </div>
        <div class="results-details">
            <h3>Detailed Results</h3>
    `;
    
    results.forEach((r, idx) => {
        html += `
            <div class="result-item ${r.isCorrect ? 'correct' : 'incorrect'}">
                <div class="result-header"><span>Q${idx + 1}</span><span>${r.isCorrect ? '✅' : '❌'}</span></div>
                <p>${r.question}</p>
                <p>Your: ${r.userAnswer}</p>
                <p>Correct: ${r.correctAnswer}</p>
                ${!r.isCorrect ? `<p>💡 ${r.explanation}</p>` : ''}
            </div>
        `;
    });
    
    html += `</div><div class="results-actions"><button class="btn" onclick="closeResultsAndRetry()">Try Again</button><button class="btn" onclick="closeResultsAndDashboard()">Dashboard</button></div>`;
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function toggleMap() {
    const container = document.getElementById('questionMapContainer');
    const btn = document.querySelector('.toggle-map');
    container.classList.toggle('collapsed');
    btn.textContent = container.classList.contains('collapsed') ? '+' : '−';
}

function closeResults() {
    document.getElementById('resultsModal').style.display = 'none';
}

function closeResultsAndRetry() {
    closeResults();
    window.location.href = 'configure.html';
}

function closeResultsAndDashboard() {
    closeResults();
    window.location.href = 'dashboard.html';
}

// Make functions global
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.jumpToQuestion = jumpToQuestion;
window.toggleMap = toggleMap;
window.closeResults = closeResults;
window.closeResultsAndRetry = closeResultsAndRetry;
window.closeResultsAndDashboard = closeResultsAndDashboard;

// Load exam when page loads
loadExam();