// auth.js - Complete Working Version

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Public pages (no login required)
    const publicPages = ['index.html', 'login.html', 'signup.html', ''];
    
    if (!currentUser && !publicPages.includes(currentPage)) {
        window.location.href = 'index.html';
        return false;
    }
    
    if (currentUser && publicPages.includes(currentPage)) {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Get users from localStorage
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user
        const user = users.find(u => (u.email === email || u.name === email) && u.password === password);
        
        if (!user) {
            alert('❌ Invalid email/username or password!');
            return;
        }
        
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            institution: user.institution
        }));
        
        alert('✅ Login successful!');
        window.location.href = 'dashboard.html';
    });
}

// Handle Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const institution = document.getElementById('signupInstitution')?.value || 'Not specified';
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Validation
        if (password !== confirmPassword) {
            alert('❌ Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('❌ Password must be at least 6 characters!');
            return;
        }
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            alert('❌ User with this email already exists!');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            institution: institution,
            password: password,
            createdAt: new Date().toISOString(),
            stats: {
                totalAttempts: 0,
                avgScore: 0,
                studyStreak: 1
            }
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            institution: newUser.institution
        }));
        
        alert('✅ Account created successfully!');
        window.location.href = 'dashboard.html';
    });
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Show/Hide functions for combined login/signup page
function showSignup() {
    const loginCard = document.querySelector('.auth-card');
    const signupCard = document.getElementById('signupCard');
    if (loginCard) loginCard.style.display = 'none';
    if (signupCard) signupCard.style.display = 'block';
}

function showLogin() {
    const loginCard = document.querySelector('.auth-card');
    const signupCard = document.getElementById('signupCard');
    if (loginCard) loginCard.style.display = 'block';
    if (signupCard) signupCard.style.display = 'none';
}

// Run auth check on page load
checkAuth();