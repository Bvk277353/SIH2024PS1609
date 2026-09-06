const quizData = [
    {
        question: "What percentage of Earth's surface is covered by water?",
        options: ["50%", "70%", "85%", "90%"],
        answer: "70%",
        background: "images/quizimg1.jpeg" // Ensure this file exists in the `images` folder
    },
    {
        question: "Which of the following is a major cause of water scarcity?",
        options: ["Overconsumption", "Pollution", "Climate change", "All of the above"],
        answer: "All of the above",
        background: "images/pollution.jpg" // Ensure this file exists in the `images` folder
    },
    {
        question: "What is desalination?",
        options: ["Purification of water", "Conversion of seawater into freshwater", "Water filtration", "Water recycling"],
        answer: "Conversion of seawater into freshwater",
        background: "images/desalination.jpg" // Ensure this file exists in the `images` folder
    }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

// HTML Element References
const userDetailsContainer = document.getElementById("user-details-container");
const userForm = document.getElementById("user-form");
const userNameInput = document.getElementById("user-name");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const totalQuestionsDisplay = document.getElementById("total-questions");
const userNameDisplay = document.getElementById("user-name-display");
const downloadButton = document.getElementById("download-btn");
// Start the quiz
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userName = userNameInput.value.trim();
    if (userName) {
        userDetailsContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    }
});
function loadQuestion() {
    const currentData = quizData[currentQuestion];
    
    // Update question text
    document.querySelector(".question-text").textContent = currentData.question;

    // Update background image
    document.querySelector(".background-image").src = currentData.background;

    // Clear and populate options
    optionsContainer.innerHTML = "";
    currentData.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => {
            if (option === currentData.answer) {
                score++;
            }
            setTimeout(() => nextButton.click(), 500);
        };
        optionsContainer.appendChild(button);
    });
}
nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    userNameDisplay.textContent = userName;
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = quizData.length;

    downloadButton.style.display = "inline-block";
}
downloadButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4"
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Border
    doc.setLineWidth(4);
    doc.setDrawColor(0, 102, 204);
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40, "S");

    // Logo
    const logoPath = "images/logo.png"; // Update with your logo path
    doc.addImage(logoPath, "PNG", pageWidth / 2 - 60, 40, 120, 120);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(0, 102, 204);
    doc.text("Certificate of Achievement", pageWidth / 2, 200, { align: "center" });

    // Recipient's Name
    doc.setFont("times", "italic");
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text(`Presented to`, pageWidth / 2, 250, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.text(`${userName}`, pageWidth / 2, 300, { align: "center" });

    // Score and Message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text(`For successfully completing the Water Conservation Quiz`, pageWidth / 2, 350, { align: "center" });
    doc.text(`and scoring ${score} out of ${quizData.length}.`, pageWidth / 2, 380, { align: "center" });

    // Issuer and Date
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    const issueDate = new Date().toLocaleDateString();
    doc.text(`Issued by Hydro Hub`, pageWidth - 200, pageHeight - 50);
    doc.text(`Date: ${issueDate}`, 50, pageHeight - 50);

    // Save PDF
    doc.save("certificate.pdf");
});
