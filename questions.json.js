// EXAM PREP - Question Bank
const QUESTION_BANK = {
    "BIO102": [
        { "id": 1, "question": "According to R.H. Whittaker, Kingdom Plantae includes organisms that 
are:", "options": ["Prokaryotic and heterotrophic", "Eukaryotic and autotrophic", "Prokaryotic and 
autotrophic", "Eukaryotic and heterotrophic"], "correct": 1, "explanation": "Plants are eukaryotic, 
multicellular and autotrophic organisms." },
        { "id": 2, "question": "Which of the following is NOT a characteristic of Kingdom Plantae?", 
"options": ["Presence of rigid cell wall", "They are autotrophs", "They are motile", "They contain 
chlorophyll"], "correct": 2, "explanation": "Plants are non-motile organisms." },
        { "id": 3, "question": "The plant body of thallophytes is called:", "options": ["Thallus", 
"Frond", "Rhizome", "Corm"], "correct": 0, "explanation": "Thallophytes have a primitive plant body 
called thallus." },
        { "id": 4, "question": "Which division of plants is known as non-flowering and non-seed 
bearing?", "options": ["Phanerogams", "Cryptogams", "Angiosperms", "Gymnosperms"], "correct": 1, 
"explanation": "Cryptogams are non-flowering and non-seed bearing plants." },
        { "id": 5, "question": "Pteridophytes are considered the first:", "options": ["Vascular plants 
to evolve on land", "Non-vascular plants", "Flowering plants", "Seed-bearing plants"], "correct": 0, 
"explanation": "Pteridophytes are the first vascular plants on land." },
        { "id": 6, "question": "Gymnosperms are characterized by:", "options": ["Naked seeds", "Seeds 
enclosed in fruit", "No seeds", "Only flowers"], "correct": 0, "explanation": "Gymnosperms have naked 
seeds not enclosed in fruit." },
        { "id": 7, "question": "Angiosperms are characterized by:", "options": ["Seeds enclosed in 
fruit", "Naked seeds", "No seeds", "Only cones"], "correct": 0, "explanation": "Angiosperms have seeds 
enclosed within fruits." },
        { "id": 8, "question": "Which of the following is a gymnosperm?", "options": ["Pine tree", 
"Sunflower", "Mango tree", "Wheat"], "correct": 0, "explanation": "Pine is a gymnosperm." },
        { "id": 9, "question": "What is double fertilization?", "options": ["Fusion of one sperm with 
egg, and another with polar nuclei", "Two sperm fusing with one egg", "One sperm fusing with two 
eggs", "Fusion of sperm with polar nuclei only"], "correct": 0, "explanation": "Double fertilization 
is unique to angiosperms." }
    ],
    "MTH101": [
        { "id": 1, "question": "Find the derivative of f(x) = 3x⁴", "options": ["12x³", "3x³", "4x³", 
"12x⁵"], "correct": 0, "explanation": "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹" }
    ],
    "CHM101": [
        { "id": 1, "question": "What is the atomic number of Carbon?", "options": ["6", "12", "4", 
"14"], "correct": 0, "explanation": "Carbon has 6 protons." }
    ],
    "PHY107": [
        { "id": 1, "question": "What is Newton's Second Law?", "options": ["F = ma", "F = mg", "E = 
mc²", "V = IR"], "correct": 0, "explanation": "Force = mass × acceleration" }
    ],
    "COS101": [
        { "id": 1, "question": "What does CPU stand for?", "options": ["Central Processing Unit", 
"Computer Personal Unit", "Central Program Unit", "Core Processing Unit"], "correct": 0, 
"explanation": "CPU is the brain of the computer." }
    ]
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getQuestions(course, count = 20) {
    const allQuestions = QUESTION_BANK[course];
    if (!allQuestions) return [];
    const shuffled = shuffleArray([...allQuestions]);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

window.QUESTION_BANK = QUESTION_BANK;
window.getQuestions = getQuestions;
window.shuffleArray = shuffleArray;

console.log("✅ EXAM PREP Loaded! Courses:", Object.keys(QUESTION_BANK).join(", "));
