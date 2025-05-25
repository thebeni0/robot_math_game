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
  // Chapter 1: Gear Room
  { scene: "Chapter 1: The Gear Room. Sprocket is stuck and needs power to open the door!", question: "What is 23 + 15?", choices: [38, 37, 39], correctAnswer: 38, successMessage: "You powered the system! The door unlocks!" },
  { scene: "Chapter 1: The Gear Room. A second panel requires calibration!", question: "What is 9 + 6?", choices: [14, 15, 16], correctAnswer: 15, successMessage: "Calibration successful!" },
  { scene: "Chapter 1: Gear Room - Battery check initiated.", question: "What is 45 - 17?", choices: [28, 27, 29], correctAnswer: 28, successMessage: "Battery charged!" },
  { scene: "Chapter 1: Gear Room - Valve pressure needs solving.", question: "What is 7 × 4?", choices: [28, 27, 30], correctAnswer: 28, successMessage: "Valve is stable!" },
  { scene: "Chapter 1: System reboot challenge!", question: "What is 81 ÷ 9?", choices: [9, 8, 7], correctAnswer: 9, successMessage: "System rebooted!" },
  { scene: "Chapter 1: Final Gear Lock Challenge!", question: "What is 13 + 14?", choices: [27, 28, 26], correctAnswer: 27, successMessage: "Lock released!" },
  { scene: "Chapter 1: Cooling system calibration.", question: "What is 36 ÷ 4?", choices: [8, 9, 10], correctAnswer: 9, successMessage: "Cooling stabilized!" },
  { scene: "Chapter 1: Pressure override code needed.", question: "What is 64 - 28?", choices: [36, 35, 37], correctAnswer: 36, successMessage: "Override successful!" },
  { scene: "Chapter 1: Backup generator sync.", question: "What is 5 × 6?", choices: [30, 31, 29], correctAnswer: 30, successMessage: "Generator synced!" },
  { scene: "Chapter 1: Last fuse test.", question: "What is 20 + 15?", choices: [34, 35, 36], correctAnswer: 35, successMessage: "Fuse passed! Gear Room complete!" },

  // Chapter 2: The Bridge
  { scene: "Chapter 2: The Bridge is broken! Answer the riddle to fix the controls.", question: "What is 42 - 19?", choices: [23, 24, 25], correctAnswer: 23, successMessage: "The bridge lowers and you move forward!" },
  { scene: "Chapter 2: Support beam math.", question: "What is 12 × 3?", choices: [36, 35, 34], correctAnswer: 36, successMessage: "Beam locked in!" },
  { scene: "Chapter 2: Fixing bridge light sensors.", question: "What is 50 ÷ 5?", choices: [10, 9, 11], correctAnswer: 10, successMessage: "Sensors calibrated!" },
  { scene: "Chapter 2: Activating balance coils.", question: "What is 72 - 18?", choices: [54, 55, 53], correctAnswer: 54, successMessage: "Balance achieved!" },
  { scene: "Chapter 2: Emergency backup lift.", question: "What is 8 × 5?", choices: [40, 45, 48], correctAnswer: 40, successMessage: "Lift operational!" },
  { scene: "Chapter 2: Reboot secondary bridge.", question: "What is 63 ÷ 7?", choices: [9, 8, 7], correctAnswer: 9, successMessage: "Bridge reboot complete!" },
  { scene: "Chapter 2: Unlock remote terminal.", question: "What is 25 + 36?", choices: [61, 60, 62], correctAnswer: 61, successMessage: "Terminal unlocked!" },
  { scene: "Chapter 2: Power fuse riddle.", question: "What is 90 - 45?", choices: [45, 44, 46], correctAnswer: 45, successMessage: "Power stabilized!" },
  { scene: "Chapter 2: Crossbeam integrity scan.", question: "What is 11 + 14?", choices: [25, 24, 26], correctAnswer: 25, successMessage: "Scan complete!" },
  { scene: "Chapter 2: Final lock override.", question: "What is 6 × 7?", choices: [42, 41, 43], correctAnswer: 42, successMessage: "Bridge fully restored!" }
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
  const imageEl = document.getElementById("story-image");
  imageEl.classList.add("hidden");
  imageEl.src = "";

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
