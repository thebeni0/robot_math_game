const gameData = wordGameData;
let currentCity = 0;
let currentQuestion = 0;

const sceneEl = document.getElementById("scene");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextButton = document.getElementById("next-button");

function showQuestion() {
  const city = gameData[currentCity];
  const level = city.levels[currentQuestion];
  sceneEl.textContent = level.scene;
  questionEl.textContent = level.question;
  choicesEl.innerHTML = "";
  resultEl.textContent = "";
  level.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(choice);
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(choice) {
  const city = gameData[currentCity];
  const level = city.levels[currentQuestion];
  if (choice === level.correctAnswer) {
    resultEl.textContent = level.successMessage;
    nextButton.style.display = "inline-block";
  } else {
    resultEl.textContent = "Try again!";
  }
}

nextButton.onclick = () => {
  currentQuestion++;
  const city = gameData[currentCity];
  if (currentQuestion >= city.levels.length) {
    currentCity++;
    currentQuestion = 0;
    if (currentCity >= gameData.length) {
      sceneEl.textContent = "🎉 You've completed all the cities!";
      questionEl.textContent = "";
      choicesEl.innerHTML = "";
      resultEl.textContent = "";
      nextButton.style.display = "none";
      return;
    }
  }
  showQuestion();
};

window.onload = () => {
  nextButton.style.display = "none";
  showQuestion();
};
