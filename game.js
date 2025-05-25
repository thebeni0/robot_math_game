// game.js
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
const storyEl = document.getElementById("story");
const robotAnimation = document.getElementById("robot-animation");
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
  },
  {
    scene: "Chapter 2: The Bridge is broken! Answer the riddle to fix the controls.",
    question: "What is 42 - 19?",
    choices: [23, 24, 25],
    correctAnswer: 23,
    successMessage: "The bridge lowers and you move forward!"
  }
];

let currentLevel = 0;

startButton.onclick = () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  showLevel(currentLevel);
};

function showLevel(level) {
  const current = levels[level];
  storyEl.textContent = current.scene;
  const imageEl = document.getElementById("story-image"); // add <img id="story-image"> in your HTML

  fetch("https://dalle-image-api.onrender.com/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: current.scene })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Image generation response:", data);
      if (data.image_url) {
        imageEl.src = data.image_url;
        imageEl.classList.remove("hidden");
      } else {
        imageEl.alt = "No image could be generated";
      }
    });

  robotAnimation.classList.remove("hidden");
  setTimeout(() => {
    robotAnimation.classList.add("hidden");
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
  }, 1000);
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
    questionContainer.classList.add("hidden");
    showLevel(currentLevel);
  } else {
    storyEl.textContent = "🎉 You rescued all the robots! Great job!";
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
  }
};
