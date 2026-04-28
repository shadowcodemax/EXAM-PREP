// ========== PARTICLE BACKGROUND ANIMATION ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.3,
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.fill();
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
    
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
drawParticles();

// ========== API CONFIGURATION ==========
let currentAPI = null; // 'gemini' or 'chatgpt'

// Load saved API keys from localStorage
if (localStorage.getItem('geminiKey')) {
    currentAPI = 'gemini';
    document.getElementById('apiStatus').innerHTML = '✅ Gemini connected. Ready to use AI Tutor.';
}
if (localStorage.getItem('chatgptKey')) {
    currentAPI = 'chatgpt';
    document.getElementById('apiStatus').innerHTML = '✅ ChatGPT connected. Ready to use AI Tutor.';
}

// Gemini Connection
document.getElementById('geminiBtn').addEventListener('click', () => {
    const key = prompt('🔑 Enter your Gemini API Key:\n\nGet it from: https://makersuite.google.com/app/apikey');
    if (key && key.length > 10) {
        localStorage.setItem('geminiKey', key);
        currentAPI = 'gemini';
        document.getElementById('apiStatus').innerHTML = '✅ Gemini connected successfully!';
        setTimeout(() => {
            document.getElementById('apiStatus').innerHTML = '✅ Gemini active. Go to Study Mode to use AI Tutor.';
        }, 2000);
    } else {
        alert('Invalid API key. Please check and try again.');
    }
});

// ChatGPT Connection
document.getElementById('chatgptBtn').addEventListener('click', () => {
    const key = prompt('🔑 Enter your OpenAI API Key:\n\nGet it from: https://platform.openai.com/api-keys');
    if (key && key.startsWith('sk-')) {
        localStorage.setItem('chatgptKey', key);
        currentAPI = 'chatgpt';
        document.getElementById('apiStatus').innerHTML = '✅ ChatGPT connected successfully!';
        setTimeout(() => {
            document.getElementById('apiStatus').innerHTML = '✅ ChatGPT active. Go to Study Mode to use AI Tutor.';
        }, 2000);
    } else {
        alert('Invalid API key. Must start with "sk-"');
    }
});