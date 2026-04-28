// AUTHENTICATION SYSTEM
// Uses localStorage for demo (in production, use backend)

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Public pages (no login required)
    const publicPages = ['login.html', 'signup.html'];
    
    if (!currentUser && !publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (currentUser && publicPages.includes(currentPage)) {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Handle Signup
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const institution = document.getElementById('signupInstitution').value;
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
    
    // Check if user already exists
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('❌ User with this email already exists!');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        institution: institution,
        password: password,
        createdAt: new Date().toISOString(),
        stats: {
            totalAttempts: 0,
            avgScore: 0,
            studyStreak: 1,
            lastLogin: new Date().toISOString()
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

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => (u.email === email || u.name === email) && u.password === password);
    
    if (!user) {
        alert('❌ Invalid email/username or password!');
        return;
    }
    
    // Update last login
    user.stats.lastLogin = new Date().toISOString();
    localStorage.setItem('users', JSON.stringify(users));
    
    // Store current user (without password)
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        institution: user.institution
    }));
    
    alert('✅ Login successful!');
    window.location.href = 'dashboard.html';
});

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Run auth check on page load
checkAuth();