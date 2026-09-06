const quizData = {
    'Andhra Pradesh': [
        {
            question: "What is a major water-sharing conflict in Andhra Pradesh?",
            answer: "Conflicts over Krishna and Godavari rivers.",
            options: [
                "Conflicts over Krishna and Godavari rivers.",
                "Dams on Tungabhadra River",
                "Urban water shortage",
                "Excess rainfall causing floods"
            ]
        },
        {
            question: "What water-intensive crop is widely grown in Andhra Pradesh?",
            answer: "Paddy.",
            options: [
                "Paddy.",
                "Wheat",
                "Cotton",
                "Millets"
            ]
        },
        {
            question: "What major project could ease water scarcity in Andhra Pradesh?",
            answer: "The Godavari-Krishna river-linking project.",
            options: [
                "The Godavari-Krishna river-linking project.",
                "Polavaram Dam",
                "Rainwater harvesting initiative",
                "Groundwater recharge program"
            ]
        }
    ],
    'Telangana': [
        {
            question: "What causes water scarcity in Telangana?",
            answer: "Over-dependence on agriculture and groundwater depletion.",
            options: [
                "Over-dependence on agriculture and groundwater depletion.",
                "Lack of reservoirs",
                "Low annual rainfall",
                "Increased industrial use"
            ]
        },
        {
            question: "Which crop is a primary consumer of water in Telangana?",
            answer: "Paddy.",
            options: [
                "Paddy.",
                "Sugarcane",
                "Wheat",
                "Cotton"
            ]
        },
        {
            question: "What infrastructure project is suggested for Telangana?",
            answer: "The Godavari-Krishna river-linking project.",
            options: [
                "The Godavari-Krishna river-linking project.",
                "Kaleshwaram Lift Irrigation Project",
                "Solar-powered water pumps",
                "Groundwater recharge stations"
            ]
        }
    ],
    'Uttar Pradesh': [
        {
            question: "What is the primary reason for groundwater depletion in Uttar Pradesh?",
            answer: "Overuse of groundwater for irrigation.",
            options: [
                "Overuse of groundwater for irrigation.",
                "Over-pumping for urban consumption",
                "Pollution of groundwater sources",
                "Inadequate river water management"
            ]
        },
        {
            question: "Which major river in Uttar Pradesh suffers from pollution?",
            answer: "The Ganges.",
            options: [
                "The Ganges.",
                "The Yamuna",
                "The Gomti",
                "The Ghaghara"
            ]
        },
        {
            question: "What agricultural solution is proposed for water conservation in Uttar Pradesh?",
            answer: "Promotion of drought-resistant crops.",
            options: [
                "Promotion of drought-resistant crops.",
                "Increased irrigation canals",
                "Implementation of rainwater harvesting",
                "Use of drip irrigation methods"
            ]
        }
    ],
    'Bihar': [
        {
            question: "What environmental challenge does Bihar face alongside water scarcity?",
            answer: "Floods during monsoons and droughts in dry seasons.",
            options: [
                "Floods during monsoons and droughts in dry seasons.",
                "Severe groundwater pollution",
                "Loss of river biodiversity",
                "High evaporation rates"
            ]
        },
        {
            question: "What river in Bihar faces pollution challenges?",
            answer: "The Ganges.",
            options: [
                "The Ganges.",
                "The Kosi",
                "The Gandak",
                "The Son"
            ]
        },
        {
            question: "What is a key method to recharge groundwater in Bihar?",
            answer: "Rainwater harvesting and artificial recharge programs.",
            options: [
                "Rainwater harvesting and artificial recharge programs.",
                "Afforestation along river banks",
                "Building more dams",
                "Reducing water-intensive crop cultivation"
            ]
        }
    ]
};
// Create a new Date object to get the current date
let currentDate = new Date();
// Format the date in YYYY-MM-DD format
const formattedDate = currentDate.toISOString().split('T')[0];
globalThis.xval = globalThis.xval || [];
globalThis.yval = globalThis.yval || [];


// HTML Element References
const userDetailsContainer = document.getElementById("user-details-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.querySelector(".question-text");
const backgroundImage = document.querySelector(".background-image");
const optionsContainer = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const totalQuestionsDisplay = document.getElementById("total-questions");
const userNameDisplay = document.getElementById("user-name-display");
const downloadButton = document.getElementById("download-btn");
const graphContainer=document.getElementById('quiz-container')
const subButton=document.getElementById("submit");

const urlParams = new URLSearchParams(window.location.search);
let currentQuestion = 0;
let score = 0;

const userName = urlParams.get('username');
const state = urlParams.get('state');
const quiz = urlParams.get('quiz');
const data=quizData[state];

if(quiz === 'ok'){
    // Initialize the quiz
    userDetailsContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

// Start the quiz
function loadQuestion() {
    const currentData = data[currentQuestion];
    

    // Update question text and background
    questionElement.textContent = currentData.question;
    

    // Clear and populate options
    optionsContainer.innerHTML = "";
    const options = currentData.options;
    options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        
        
        button.onclick = () => {
            if (option === currentData.answer) {
                score++;
                button.style.backgroundColor = "green"; // Correct
            } else {
                score--;
                button.style.backgroundColor = "red"; // Incorrect
            }
            
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < data.length) {
                    loadQuestion();
                }
            }, 1000);
        };
        
        
        optionsContainer.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    currentQuestion--;
    if (currentQuestion < data.length) {
        loadQuestion();
    } 
});

subButton.addEventListener("click", () => {
    
    showResult();
});


function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    nextButton.style.display='none';
    subButton.style.display='block';
    userNameDisplay.textContent = userName;
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = data.length;
    downloadButton.style.display = "inline-block";
    
}


downloadButton.addEventListener("click", () => {
    const timestamp = new Date().toLocaleString();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277); // Border
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text('Water Conservation Quiz Certificate', 70, 30, { align: "center" });
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`Congratulations, ${userName}!`, 20, 60);
    doc.text(`You scored ${score} out of ${data.length}.`, 20, 80);
    doc.text('Issued by Hydro Hub', 20, 100);
    doc.text(`Certificate ID: ${timestamp}`, 20, 120);
    doc.save('certificate.pdf');    

});
