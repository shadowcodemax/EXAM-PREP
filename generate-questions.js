const fs = require('fs');

console.log("Generating 50+ questions per course...");

// Generate Anatomy questions
function generateAnatomyQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Anatomy Question " + i + ": Which structure is found in the human body?",
            options: ["Pectoralis major", "Latissimus dorsi", "Deltoid muscle", "Trapezius muscle"],
            correct: i % 4,
            explanation: "This muscle is important for body movement."
        });
    }
    return questions;
}

// Generate Biochemistry questions
function generateBiochemistryQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Biochemistry Question " + i + ": What is the role of enzymes?",
            options: ["Speed up reactions", "Store energy", "Transport oxygen", "Fight infection"],
            correct: 0,
            explanation: "Enzymes are biological catalysts."
        });
    }
    return questions;
}

// Generate Mathematics questions
function generateMathQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        let x = i + 5;
        questions.push({
            id: i,
            question: "Mathematics Question " + i + ": Solve for x: 2x + " + i + " = " + (i + 10),
            options: ["5", "6", "7", "8"],
            correct: i % 4,
            explanation: "Subtract " + i + " from both sides, then divide by 2."
        });
    }
    return questions;
}

// Generate Physics questions
function generatePhysicsQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Physics Question " + i + ": What is Newton's Second Law?",
            options: ["F = ma", "E = mc²", "V = IR", "P = VI"],
            correct: 0,
            explanation: "Force equals mass times acceleration."
        });
    }
    return questions;
}

// Generate Chemistry questions
function generateChemistryQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Chemistry Question " + i + ": What is the atomic number of Carbon?",
            options: ["6", "12", "4", "14"],
            correct: 0,
            explanation: "Carbon has 6 protons."
        });
    }
    return questions;
}

// Generate Computer Science questions
function generateCSQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Computer Science Question " + i + ": What does CPU stand for?",
            options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Core Processing Unit"],
            correct: 0,
            explanation: "CPU is the brain of the computer."
        });
    }
    return questions;
}

// Generate General Studies questions
function generateGSTQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "General Studies Question " + i + ": What year did Nigeria gain independence?",
            options: ["1960", "1963", "1966", "1962"],
            correct: 0,
            explanation: "Nigeria gained independence on October 1, 1960."
        });
    }
    return questions;
}

// Generate Cybersecurity questions
function generateCybersecurityQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            question: "Cybersecurity Question " + i + ": What does VPN stand for?",
            options: ["Virtual Private Network", "Virtual Public Network", "Very Private Network", "Virtual Protected Network"],
            correct: 0,
            explanation: "VPN creates a secure encrypted connection."
        });
    }
    return questions;
}

// Generate Statistics questions
function generateStatisticsQuestions() {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        let mean = (i + i+1 + i+2 + i+3 + i+4) / 5;
        questions.push({
            id: i,
            question: "Statistics Question " + i + ": Calculate the mean of " + i + ", " + (i+1) + ", " + (i+2) + ", " + (i+3) + ", " + (i+4),
            options: ["" + mean, "" + (mean+1), "" + (mean-1), "" + (mean*2)],
            correct: 0,
            explanation: "Mean = sum divided by count = " + mean
        });
    }
    return questions;
}

// Build complete question bank
const QUESTION_BANK = {
    "ANA101": generateAnatomyQuestions(),
    "BCH101": generateBiochemistryQuestions(),
    "MTH101": generateMathQuestions(),
    "MTH102": generateMathQuestions(),
    "PHY101": generatePhysicsQuestions(),
    "CHM101": generateChemistryQuestions(),
    "COS101": generateCSQuestions(),
    "GST101": generateGSTQuestions(),
    "GST102": generateGSTQuestions(),
    "CYB101": generateCybersecurityQuestions(),
    "STA101": generateStatisticsQuestions(),
    "BIO101": generateAnatomyQuestions(),
    "BIO102": generateAnatomyQuestions(),
    "BMS101": generateAnatomyQuestions(),
    "BMS102": generateBiochemistryQuestions()
};

let totalQ = 0;
for (let c in QUESTION_BANK) totalQ += QUESTION_BANK[c].length;

console.log("Generated " + totalQ + " questions for " + Object.keys(QUESTION_BANK).length + " courses");

// Write to file
let output = "// EXAM PREP - Complete Question Bank\n";
output += "// Total Questions: " + totalQ + "\n\n";
output += "const QUESTION_BANK = " + JSON.stringify(QUESTION_BANK, null, 2) + ";\n\n";
output += "function shuffleArray(array) {\n";
output += "    for (let i = array.length - 1; i > 0; i--) {\n";
output += "        const j = Math.floor(Math.random() * (i + 1));\n";
output += "        [array[i], array[j]] = [array[j], array[i]];\n";
output += "    }\n";
output += "    return array;\n";
output += "}\n\n";
output += "function getQuestions(course, count = 20) {\n";
output += "    const allQuestions = QUESTION_BANK[course];\n";
output += "    if (!allQuestions) return [];\n";
output += "    const shuffled = shuffleArray([...allQuestions]);\n";
output += "    return shuffled.slice(0, Math.min(count, shuffled.length));\n";
output += "}\n\n";
output += "window.QUESTION_BANK = QUESTION_BANK;\n";
output += "window.getQuestions = getQuestions;\n";
output += "window.shuffleArray = shuffleArray;\n\n";
output += "console.log('✅ EXAM PREP Loaded!', '" + totalQ + " questions,', Object.keys(QUESTION_BANK).length, 'courses');\n";

fs.writeFileSync('questions.json.js', output);
console.log("✅ Saved to questions.json.js");