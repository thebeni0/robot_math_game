const storyEl = document.getElementById("story");
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextButton = document.getElementById("next-button");

const levels = [
  {
    scene: "Chapter 1: The Gear Room. Sprocket is stuck and needs power to open the door!",
    question: "What is 23 + 15?",
    choices: [38, 37, 39],
    correctAnswer: 38,
    successMessage: "You powered the system! The door unlocks!"
  }
];

let currentLevel = 0;

function showLevel(level) {
  const current = levels[level];
  storyEl.textContent = current.scene;
  questionEl.textContent = current.question;
  choicesEl.innerHTML = "";
  current.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(choice);
    choicesEl.appendChild(btn);
  });
  questionContainer.classList.remove("hidden");
  resultEl.textContent = "";
  nextButton.classList.add("hidden");
}

function handleAnswer(choice) {
  const current = levels[currentLevel];
  if (choice === current.correctAnswer) {
    resultEl.textContent = current.successMessage;
    nextButton.classList.remove("hidden");
  } else {
    resultEl.textContent = "Oops! Try again.";
  }
}

nextButton.onclick = () => {
  currentLevel++;
  if (currentLevel < levels.length) {
    showLevel(currentLevel);
  } else {
    storyEl.textContent = "🎉 You rescued all the robots! Great job!";
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
  }
};

showLevel(currentLevel);