// EXAM PREP - CHALLENGE MODE
// Features: Timer countdown, shuffled questions, detailed results

let currentQuiz = {
    questions: [],
    userAnswers: [],
    currentIndex: 0,
    score: 0,
    nickname: '',
    course: '',
    startTime: null,
    timerInterval: null,
    timeLimit: null, // in seconds
    selectedAnswer: null,
    quizActive: true
};

// Start challenge
document.getElementById('startChallengeBtn').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
        alert('⚠️ Please enter a nickname!');
        return;
    }
    
    const course = document.getElementById('challengeCourse').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);
    
    // Get shuffled questions
    const questions = getQuestions(course, questionCount);
    
    if (questions.length === 0) {
        alert('No questions available for this course yet.');
        return;
    }
    
    // Set time limit based on question count (1 minute per question)
    const timeLimit = questionCount * 60;
    
    currentQuiz = {
        questions: questions,
        userAnswers: new Array(questions.length).fill(null),
        currentIndex: 0,
        score: 0,
        nickname: nickname,
        course: course,
        startTime: Date.now(),
        timerInterval: null,
        timeLimit: timeLimit,
        selectedAnswer: null,
        quizActive: true
    };
    
    // Hide setup, show quiz
    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('quizScreen').classList.remove('quiz-screen-hidden');
    document.getElementById('resultScreen').classList.add('result-screen-hidden');
    
    // Update UI
    document.getElementById('quizNickname').textContent = nickname;
    document.getElementById('quizCourse').textContent = course;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('currentScore').textContent = '0';
    document.getElementById('questionCounter').textContent = `Question 1 of ${questions.length}`;
    
    startTimer();
    displayQuestion();
});

// Start countdown timer
function startTimer() {
    if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);
    
    currentQuiz.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
        const remaining = currentQuiz.timeLimit - elapsed;
        
        if (remaining <= 0) {
            // Time's up - auto submit
            clearInterval(currentQuiz.timerInterval);
            alert('⏰ Time is up! Submitting your exam...');
            endQuiz();
            return;
        }
        
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning color when time is low (< 5 minutes)
        if (remaining < 300) {
            timerElement.style.color = '#ff4444';
        } else {
            timerElement.style.color = '#ffd700';
        }
    }, 1000);
}

// Display current question
function displayQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    if (!q) return;
    
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('questionCounter').textContent = `Question ${currentQuiz.currentIndex + 1} of ${currentQuiz.questions.length}`;
    
    const optionsDiv = document.getElementById('optionsContainer');
    optionsDiv.innerHTML = '';
    
    // Shuffle options for each question
    const shuffledOptions = [...q.options];
    const correctAnswerIndex = q.correct;
    const correctAnswerText = q.options[correctAnswerIndex];
    
    // Find new index of correct answer after shuffle
    for (let i = 0; i < shuffledOptions.length; i++) {
        if (shuffledOptions[i] === correctAnswerText) {
            q.shuffledCorrectIndex = i;
            break;
        }
    }
    
    q.shuffledOptions = shuffledOptions;
    
    shuffledOptions.forEach((opt, idx) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" name="answer" value="${idx}" id="opt${idx}" ${currentQuiz.userAnswers[currentQuiz.currentIndex] === idx ? 'checked' : ''}>
            <label for="opt${idx}">${escapeHtml(opt)}</label>
        `;
        
        const radio = optionDiv.querySelector('input');
        radio.addEventListener('change', (e) => {
            if (e.target.checked && currentQuiz.quizActive) {
                currentQuiz.selectedAnswer = idx;
                // Save answer immediately
                currentQuiz.userAnswers[currentQuiz.currentIndex] = idx;
                
                // Highlight selected option
                document.querySelectorAll('.option').forEach(opt => opt.style.background = 'rgba(255,255,255,0.03)');
                optionDiv.style.background = 'rgba(139, 92, 246, 0.3)';
            }
        });
        
        // Restore previously selected answer
        if (currentQuiz.userAnswers[currentQuiz.currentIndex] === idx) {
            radio.checked = true;
            optionDiv.style.background = 'rgba(139, 92, 246, 0.3)';
            currentQuiz.selectedAnswer = idx;
        }
        
        optionsDiv.appendChild(optionDiv);
    });
}

// Next question
function nextQuestion() {
    if (!currentQuiz.quizActive) return;
    
    // Save current answer if selected
    if (currentQuiz.selectedAnswer !== null) {
        currentQuiz.userAnswers[currentQuiz.currentIndex] = currentQuiz.selectedAnswer;
    } else {
        // If no answer selected, check if user wants to proceed
        if (currentQuiz.userAnswers[currentQuiz.currentIndex] === null) {
            const confirmMove = confirm('You haven\'t answered this question yet. Are you sure you want to skip?');
            if (!confirmMove) return;
        }
    }
    
    // Move to next question
    if (currentQuiz.currentIndex + 1 < currentQuiz.questions.length) {
        currentQuiz.currentIndex++;
        currentQuiz.selectedAnswer = currentQuiz.userAnswers[currentQuiz.currentIndex];
        displayQuestion();
        updateScoreDisplay();
    } else {
        // End of quiz
        endQuiz();
    }
}

// Previous question
function previousQuestion() {
    if (!currentQuiz.quizActive) return;
    
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        currentQuiz.selectedAnswer = currentQuiz.userAnswers[currentQuiz.currentIndex];
        displayQuestion();
    }
}

// Update score display
function updateScoreDisplay() {
    let correctCount = 0;
    for (let i = 0; i <= currentQuiz.currentIndex; i++) {
        if (currentQuiz.userAnswers[i] !== null) {
            const q = currentQuiz.questions[i];
            if (currentQuiz.userAnswers[i] === q.shuffledCorrectIndex) {
                correctCount++;
            }
        }
    }
    currentQuiz.score = correctCount;
    document.getElementById('currentScore').textContent = currentQuiz.score;
}

// End quiz and show detailed results
function endQuiz() {
    currentQuiz.quizActive = false;
    clearInterval(currentQuiz.timerInterval);
    
    // Calculate final score
    let finalScore = 0;
    const detailedResults = [];
    
    for (let i = 0; i < currentQuiz.questions.length; i++) {
        const q = currentQuiz.questions[i];
        const userAnswerIdx = currentQuiz.userAnswers[i];
        const isCorrect = (userAnswerIdx === q.shuffledCorrectIndex);
        
        if (isCorrect) finalScore++;
        
        detailedResults.push({
            id: q.id,
            question: q.question,
            userAnswer: userAnswerIdx !== null ? q.shuffledOptions[userAnswerIdx] : 'Not answered',
            correctAnswer: q.shuffledOptions[q.shuffledCorrectIndex],
            isCorrect: isCorrect,
            explanation: q.explanation || 'No explanation provided.'
        });
    }
    
    currentQuiz.score = finalScore;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((finalScore / total) * 100);
    const timeSpent = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    // Store results for detailed view
    window.detailedResults = detailedResults;
    window.quizSummary = {
        nickname: currentQuiz.nickname,
        course: currentQuiz.course,
        score: finalScore,
        total: total,
        percentage: percentage,
        timeSpent: `${minutes}:${seconds.toString().padStart(2, '0')}`,
        results: detailedResults
    };
    
    // Hide quiz, show results
    document.getElementById('quizScreen').classList.add('quiz-screen-hidden');
    document.getElementById('resultScreen').classList.remove('result-screen-hidden');
    
    // Determine grade class
    let gradeClass = 'grade-f';
    if (percentage >= 70) gradeClass = 'grade-a';
    else if (percentage >= 50) gradeClass = 'grade-b';
    
    let resultMessage = '';
    if (percentage >= 70) resultMessage = '<p class="result-message success">🎉 Excellent! You crushed it!</p>';
    else if (percentage >= 50) resultMessage = '<p class="result-message warning">👍 Good effort! Review your mistakes and try again.</p>';
    else resultMessage = '<p class="result-message error">📚 Keep practicing! Review the explanations below.</p>';
    
    // Display results summary
    document.getElementById('resultDetails').innerHTML = `
        <div class="result-summary">
            <p>🏆 <strong>${escapeHtml(currentQuiz.nickname)}</strong></p>
            <p>📖 Course: ${currentQuiz.course}</p>
            <p>📊 Score: ${finalScore}/${total} (${percentage}%)</p>
            <p>⏱️ Time: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
            <div class="grade-circle ${gradeClass}">
                ${percentage}%
            </div>
            ${resultMessage}
        </div>
        <button id="viewDetailsBtn" class="btn">📋 View Detailed Results</button>
    `;
    
    // Add event listener for details button
    document.getElementById('viewDetailsBtn').addEventListener('click', showDetailedResults);
}

// Show detailed results with correct/incorrect answers
function showDetailedResults() {
    const results = window.detailedResults;
    const summary = window.quizSummary;
    if (!results) return;
    
    let resultsHtml = `
        <div class="detailed-results">
            <h3>📋 Detailed Exam Analysis</h3>
            <div class="results-summary-banner">
                <span>✅ Correct: ${summary.score}</span>
                <span>❌ Incorrect: ${summary.total - summary.score}</span>
                <span>📊 Score: ${summary.percentage}%</span>
                <span>⏱️ Time: ${summary.timeSpent}</span>
            </div>
            <div class="questions-review">
    `;
    
    results.forEach((q, idx) => {
        resultsHtml += `
            <div class="review-question ${q.isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-header">
                    <span class="q-num">Question ${idx + 1}</span>
                    <span class="q-status">${q.isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}</span>
                </div>
                <p class="q-text">${escapeHtml(q.question)}</p>
                <div class="answer-details">
                    <p class="your-answer">📝 Your answer: ${escapeHtml(q.userAnswer)}</p>
                    <p class="correct-answer">✓ Correct answer: ${escapeHtml(q.correctAnswer)}</p>
                    ${!q.isCorrect ? `<p class="explanation">💡 Explanation: ${escapeHtml(q.explanation)}</p>` : ''}
                </div>
            </div>
        `;
    });
    
    resultsHtml += `
            </div>
            <div class="results-actions">
                <button id="closeDetailsBtn" class="btn">← Back to Summary</button>
                <button id="newChallengeBtn" class="btn">🔄 New Challenge</button>
                <button id="saveAfterDetailsBtn" class="btn">💾 Save to Leaderboard</button>
            </div>
        </div>
    `;
    
    document.getElementById('resultDetails').innerHTML = resultsHtml;
    
    document.getElementById('closeDetailsBtn').addEventListener('click', () => {
        endQuiz();
    });
    
    document.getElementById('newChallengeBtn').addEventListener('click', () => {
        document.getElementById('setupScreen').style.display = 'block';
        document.getElementById('resultScreen').classList.add('result-screen-hidden');
        document.getElementById('nickname').value = '';
        window.detailedResults = null;
        window.quizSummary = null;
    });
    
    document.getElementById('saveAfterDetailsBtn').addEventListener('click', () => {
        if (window.quizSummary) {
            saveScoreToLeaderboard(window.quizSummary);
            alert('✅ Score saved to leaderboard!');
            document.getElementById('saveAfterDetailsBtn').disabled = true;
        }
    });
}

// Save score to leaderboard
document.getElementById('saveScoreBtn').addEventListener('click', () => {
    if (window.quizSummary) {
        saveScoreToLeaderboard(window.quizSummary);
        alert('✅ Score saved to leaderboard!');
        document.getElementById('saveScoreBtn').disabled = true;
    }
});

// Try again button
document.getElementById('tryAgainBtn').addEventListener('click', () => {
    document.getElementById('setupScreen').style.display = 'block';
    document.getElementById('resultScreen').classList.add('result-screen-hidden');
    document.getElementById('nickname').value = '';
    window.detailedResults = null;
    window.quizSummary = null;
});

// Save to localStorage
function saveScoreToLeaderboard(score) {
    let leaderboard = JSON.parse(localStorage.getItem('examPrepLeaderboard') || '[]');
    leaderboard.push({
        nickname: score.nickname,
        course: score.course,
        score: `${score.score}/${score.total} (${score.percentage}%)`,
        rawScore: score.percentage,
        date: new Date().toLocaleDateString()
    });
    leaderboard.sort((a, b) => b.rawScore - a.rawScore);
    leaderboard = leaderboard.slice(0, 50);
    localStorage.setItem('examPrepLeaderboard', JSON.stringify(leaderboard));
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions global
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.showDetailedResults = showDetailedResults;
// Question Map functionality
function renderQuestionMap() {
    const mapContainer = document.getElementById('questionMap');
    if (!mapContainer) return;
    
    let mapHtml = '<div class="question-map"><h4>📋 QUESTION MAP</h4><div class="map-buttons">';
    
    currentQuiz.questions.forEach((_, idx) => {
        const isAnswered = currentQuiz.userAnswers[idx] !== null;
        const isCurrent = idx === currentQuiz.currentIndex;
        mapHtml += `<button class="map-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="jumpToQuestion(${idx})">${idx + 1}</button>`;
    });
    
    mapHtml += '</div></div>';
    mapContainer.innerHTML = mapHtml;
}

// Jump to specific question
function jumpToQuestion(index) {
    if (!currentQuiz.quizActive) return;
    
    // Save current answer
    if (currentQuiz.selectedAnswer !== null) {
        currentQuiz.userAnswers[currentQuiz.currentIndex] = currentQuiz.selectedAnswer;
    }
    
    currentQuiz.currentIndex = index;
    currentQuiz.selectedAnswer = currentQuiz.userAnswers[currentQuiz.currentIndex];
    displayQuestion();
    updateScoreDisplay();
    renderQuestionMap();
}