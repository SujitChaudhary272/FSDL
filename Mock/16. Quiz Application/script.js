const quizQuestions = [
  {
    question: "1) HTML stands for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language"],
    answer: 0
  },
  {
    question: "2) CSS is used for?",
    options: ["Styling", "Database", "Networking"],
    answer: 0
  },
  {
    question: "3) JavaScript is mainly used to?",
    options: ["Add interactivity", "Create hardware", "Design logos"],
    answer: 0
  },
  {
    question: "4) Which tag creates a hyperlink?",
    options: ["<a>", "<img>", "<p>"],
    answer: 0
  },
  {
    question: "5) Which property changes text color in CSS?",
    options: ["font-size", "color", "padding"],
    answer: 1
  },
  {
    question: "6) Which method prints in browser console?",
    options: ["console.log()", "print()", "echo()"],
    answer: 0
  }
];

const quizForm = document.getElementById("quizForm");
const scoreText = document.getElementById("scoreText");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

submitBtn.addEventListener("click", checkAnswers);
resetBtn.addEventListener("click", resetQuiz);

showQuestions();

function showQuestions() {
  let allQuestionsHtml = "";

  quizQuestions.forEach(function (item, index) {
    let optionHtml = "";

    item.options.forEach(function (optionText, optionIndex) {
      optionHtml +=
        `<label class="option-label">` +
        `<input type="radio" name="question${index}" value="${optionIndex}"> ` +
        `${optionText}` +
        `</label>`;
    });

    allQuestionsHtml +=
      `<div class="question-box">` +
      `<p class="question-title">${item.question}</p>` +
      `${optionHtml}` +
      `</div>`;
  });

  quizForm.innerHTML = allQuestionsHtml;
}

function checkAnswers() {
  let score = 0;

  quizQuestions.forEach(function (item, index) {
    const selectedOption = quizForm.querySelector(`input[name="question${index}"]:checked`);

    if (selectedOption && Number(selectedOption.value) === item.answer) {
      score += 1;
    }
  });

  scoreText.textContent = `Your Score: ${score} / ${quizQuestions.length}`;
}

function resetQuiz() {
  quizForm.reset();
  scoreText.textContent = "";
}
