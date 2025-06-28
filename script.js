const quizData = [
  {
    question: "Why are forests important?",
    options: ["Provide oxygen", "Make noise", "Are empty"],
    correct: "Provide oxygen"
  },
  {
    question: "Which of these can be recycled?",
    options: ["Plastic bottle", "Food waste", "Tissue paper"],
    correct: "Plastic bottle"
  },
  {
    question: "Which animal is endangered?",
    options: ["Tiger", "Cat", "Hen"],
    correct: "Tiger"
  },
  {
    question: "What causes climate change?",
    options: ["Greenhouse gases", "Planting trees", "Rain"],
    correct: "Greenhouse gases"
  },
  {
    question: "How can we protect wildlife?",
    options: ["Destroy forests", "Protect habitats", "Hunt animals"],
    correct: "Protect habitats"
  },
  {
    question: "What is the benefit of recycling paper?",
    options: ["Increases tree cutting", "Saves trees", "Makes noise"],
    correct: "Saves trees"
  },
  {
    question: "Which gas is mainly responsible for global warming?",
    options: ["Carbon dioxide", "Oxygen", "Hydrogen"],
    correct: "Carbon dioxide"
  },
  {
    question: "What should we do to conserve water?",
    options: ["Leave taps running", "Use water wisely", "Flood fields"],
    correct: "Use water wisely"
  },
  {
    question: "Which energy is renewable?",
    options: ["Coal", "Solar", "Petrol"],
    correct: "Solar"
  },
  {
    question: "Why should we plant more trees?",
    options: ["To cause deforestation", "To improve oxygen", "To cut them later"],
    correct: "To improve oxygen"
  }
];

let current = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function loadQuestion() {
  const q = quizData[current];
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  if (!questionElement || !optionsContainer || !feedback) return;

  questionElement.textContent = q.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (!feedback) return;

  if (selected === quizData[current].correct) {
    score++;
    correctAnswers++;
    feedback.textContent = "✅ Correct!";
  } else {
    wrongAnswers++;
    feedback.textContent = "❌ Wrong!";
  }

  // Move to next question after 1 second
  current++;
  setTimeout(() => {
    if (current < quizData.length) {
      loadQuestion();
    } else {
      localStorage.setItem("ecoScore", score);
      localStorage.setItem("ecoCorrect", correctAnswers);
      localStorage.setItem("ecoWrong", wrongAnswers);
      window.location.href = "result.html";
    }
  }, 1000);
}

window.onload = () => {
  if (window.location.pathname.endsWith("quiz.html")) {
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    localStorage.removeItem("ecoScore");
    localStorage.removeItem("ecoCorrect");
    localStorage.removeItem("ecoWrong");

    loadQuestion();
  }
};
