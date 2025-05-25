// game.js – Full version with story chapters and adaptive progression
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

let currentChapter = 0;
let currentLevelIndex = 0;
let currentDifficulty = 1;
let nextImageURL = null;
let startTime = 0;

// 🧠 Game Chapters (50 levels total)
const chapters = [
  {
    name: "The Gear Room",
    type: "add-subtract",
    intro: "🛠 Chapter 1: The Gear Room — Power up the system with addition and subtraction!",
    levels: [
      { scene: "Solve the gear calculation", question: "What is 45 + 32?", choices: [77, 76, 78], correctAnswer: 77, successMessage: "Gear activated!" },
      { scene: "The generator is offline!", question: "What is 78 - 29?", choices: [49, 50, 48], correctAnswer: 49, successMessage: "Generator humming!" },
      { scene: "Turn on the lights", question: "What is 23 + 19?", choices: [42, 43, 44], correctAnswer: 42, successMessage: "Lights on!" },
      { scene: "Open the first hatch", question: "What is 61 - 18?", choices: [43, 42, 44], correctAnswer: 43, successMessage: "Hatch opened!" },
      { scene: "Power the door motor", question: "What is 37 + 42?", choices: [79, 78, 80], correctAnswer: 79, successMessage: "Motor spinning!" },
      { scene: "Start the coolant fans", question: "What is 90 - 45?", choices: [45, 44, 46], correctAnswer: 45, successMessage: "Coolant activated!" },
      { scene: "Calibrate the servo arm", question: "What is 66 + 13?", choices: [79, 78, 80], correctAnswer: 79, successMessage: "Arm calibrated!" },
      { scene: "Recharge the battery unit", question: "What is 100 - 27?", choices: [73, 74, 72], correctAnswer: 73, successMessage: "Battery charged!" },
      { scene: "Activate piston 2", question: "What is 54 + 36?", choices: [90, 91, 89], correctAnswer: 90, successMessage: "Piston 2 operational!" },
      { scene: "Final bolt alignment", question: "What is 88 - 24?", choices: [64, 65, 63], correctAnswer: 64, successMessage: "Alignment complete!" }
    ]
  },
  {
    name: "Conveyor Belt Chaos",
    type: "word-problem",
    intro: "📦 Chapter 2: Conveyor Belt Chaos — Solve story problems to clear the jam!",
    levels: [
      { scene: "Sprocket found 25 toolkits and got 13 more. How many now?", question: "25 + 13 = ?", choices: [38, 37, 39], correctAnswer: 38, successMessage: "Toolkits counted!" },
      { scene: "There are 42 bolts. 17 fell off. How many remain?", question: "42 - 17 = ?", choices: [25, 26, 24], correctAnswer: 25, successMessage: "Bolts updated!" },
      { scene: "Bin A has 16 screws, Bin B has 14. Total?", question: "16 + 14 = ?", choices: [30, 31, 29], correctAnswer: 30, successMessage: "Screws totaled!" },
      { scene: "36 widgets, 28 more added. Total?", question: "36 + 28 = ?", choices: [64, 65, 63], correctAnswer: 64, successMessage: "Widgets loaded!" },
      { scene: "60 rivets, 20 used. Remaining?", question: "60 - 20 = ?", choices: [40, 39, 41], correctAnswer: 40, successMessage: "Rivets remaining!" },
      { scene: "3 boxes × 12 kits. Total kits?", question: "3 × 12 = ?", choices: [36, 35, 37], correctAnswer: 36, successMessage: "Kits counted!" },
      { scene: "15 bins × 5 tools. Total?", question: "15 × 5 = ?", choices: [75, 74, 76], correctAnswer: 75, successMessage: "Inventory tallied!" },
      { scene: "40 wires, 17 used. Wires left?", question: "40 - 17 = ?", choices: [23, 22, 24], correctAnswer: 23, successMessage: "Wires left noted!" },
      { scene: "8 gadgets, 6 more added. Now?", question: "8 + 6 = ?", choices: [14, 13, 15], correctAnswer: 14, successMessage: "Gadget count updated!" },
      { scene: "90 widgets, 45 collected. Left?", question: "90 - 45 = ?", choices: [45, 44, 46], correctAnswer: 45, successMessage: "Belt cleared!" }
    ]
  },
  {
    name: "Glitchy Robot Battle",
    type: "multiplication",
    intro: "🤖 Chapter 3: Glitchy Robot Battle — Use multiplication to disable rogue bots!",
    levels: [
      { scene: "Glitchbot 1!", question: "What is 6 × 8?", choices: [48, 47, 49], correctAnswer: 48, successMessage: "Bot deactivated!" },
      { scene: "Glitchbot 2!", question: "What is 7 × 4?", choices: [28, 27, 29], correctAnswer: 28, successMessage: "Stabilized!" },
      { scene: "Glitchbot 3!", question: "What is 9 × 3?", choices: [27, 28, 26], correctAnswer: 27, successMessage: "Bot neutralized!" },
      { scene: "Glitchbot 4!", question: "What is 5 × 5?", choices: [25, 26, 24], correctAnswer: 25, successMessage: "Bot rebooted!" },
      { scene: "Glitchbot 5!", question: "What is 3 × 9?", choices: [27, 26, 28], correctAnswer: 27, successMessage: "Stunned!" },
      { scene: "Glitchbot 6!", question: "What is 8 × 6?", choices: [48, 47, 49], correctAnswer: 48, successMessage: "Bot disabled!" },
      { scene: "Glitchbot 7!", question: "What is 2 × 7?", choices: [14, 13, 15], correctAnswer: 14, successMessage: "Cleared!" },
      { scene: "Glitchbot 8!", question: "What is 4 × 4?", choices: [16, 15, 17], correctAnswer: 16, successMessage: "Bot offline!" },
      { scene: "Glitchbot 9!", question: "What is 10 × 3?", choices: [30, 31, 29], correctAnswer: 30, successMessage: "Down!" },
      { scene: "Glitchbot 10!", question: "What is 7 × 6?", choices: [42, 41, 43], correctAnswer: 42, successMessage: "Battle won!" }
    ]
  },
  {
    name: "Security Panel Puzzle",
    type: "patterns",
    intro: "🔐 Chapter 4: Security Panel Puzzle — Complete the number patterns to unlock!",
    levels: [
      { scene: "Code: 2, 4, 6, ?, 10", question: "What fits?", choices: [8, 7, 9], correctAnswer: 8, successMessage: "Panel unlocked!" },
      { scene: "Code: 5, 10, ?, 20", question: "What fits?", choices: [15, 14, 16], correctAnswer: 15, successMessage: "Code accepted!" },
      { scene: "Code: 3, 6, 9, ?, 15", question: "What fits?", choices: [12, 11, 13], correctAnswer: 12, successMessage: "Matched!" },
      { scene: "Code: 1, 2, 4, 8, ?", question: "What fits?", choices: [16, 15, 17], correctAnswer: 16, successMessage: "Sequence synced!" },
      { scene: "Code: 7, 14, ?, 28", question: "What fits?", choices: [21, 20, 22], correctAnswer: 21, successMessage: "Logic complete!" },
      { scene: "Code: 9, 18, ?, 36", question: "What fits?", choices: [27, 26, 28], correctAnswer: 27, successMessage: "Access granted!" },
      { scene: "Code: 1, 3, 6, 10, ?", question: "What fits?", choices: [15, 14, 13], correctAnswer: 15, successMessage: "Panel open!" },
      { scene: "Code: 10, 20, ?, 40", question: "What fits?", choices: [30, 29, 31], correctAnswer: 30, successMessage: "Unlocked!" },
      { scene: "Code: 4, 8, 12, ?, 20", question: "What fits?", choices: [16, 15, 17], correctAnswer: 16, successMessage: "Key accepted!" },
      { scene: "Code: 13, 26, 39, ?, 65", question: "What fits?", choices: [52, 50, 54], correctAnswer: 52, successMessage: "Final door opened!" }
    ]
  },
  {
    name: "Robo Reunion",
    type: "review",
    intro: "🎉 Final Chapter: Robo Reunion — Use all your skills to free the robot team!",
    levels: [
      { scene: "Rescue robot 1!", question: "What is 8 × 7?", choices: [56, 57, 55], correctAnswer: 56, successMessage: "Robot freed!" },
      { scene: "Rescue robot 2!", question: "What is 60 ÷ 5?", choices: [12, 11, 13], correctAnswer: 12, successMessage: "Freed!" },
      { scene: "Rescue robot 3!", question: "What is 15 + 26?", choices: [41, 40, 42], correctAnswer: 41, successMessage: "Unlocked!" },
      { scene: "Rescue robot 4!", question: "What is 90 - 45?", choices: [45, 46, 44], correctAnswer: 45, successMessage: "Escape complete!" },
      { scene: "Rescue robot 5!", question: "What is 3 × 9?", choices: [27, 28, 26], correctAnswer: 27, successMessage: "Good job!" },
      { scene: "Rescue robot 6!", question: "What is 72 ÷ 8?", choices: [9, 8, 10], correctAnswer: 9, successMessage: "Unlocked!" },
      { scene: "Rescue robot 7!", question: "What is 25 + 36?", choices: [61, 60, 62], correctAnswer: 61, successMessage: "Door opened!" },
      { scene: "Rescue robot 8!", question: "What is 100 - 25?", choices: [75, 74, 76], correctAnswer: 75, successMessage: "Systems online!" },
      { scene: "Rescue robot 9!", question: "What is 11 + 14?", choices: [25, 26, 24], correctAnswer: 25, successMessage: "Robot rebooted!" },
      { scene: "Rescue robot 10!", question: "What is 6 × 7?", choices: [42, 41, 43], correctAnswer: 42, successMessage: "Mission complete!" }
    ]
  }
];

// ... CONTINUES WITH preloadImage(), showLevel(), handleAnswer(), etc.
// [See your previous full script for remaining logic]




function preloadImage(scene) {
  fetch("https://dalle-image-api.onrender.com/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: scene })
  })
    .then(res => res.json())
    .then(data => {
      if (data.image_url) {
        nextImageURL = data.image_url;
      }
    });
}

function startGame() {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  showChapterIntro();
}

function showChapterIntro() {
  const chapter = chapters[currentChapter];
  storyEl.textContent = chapter.intro;
  robotAnimation.classList.remove("hidden");
  resultEl.textContent = "";
  questionContainer.classList.add("hidden");
  nextButton.classList.remove("hidden");
  preloadImage(chapter.levels[0].scene);
}

function showLevel() {
  const chapter = chapters[currentChapter];
  const level = chapter.levels[currentLevelIndex];
  storyEl.textContent = level.scene;
  const imageEl = document.getElementById("story-image");
  imageEl.classList.add("hidden");
  imageEl.src = "";

  if (nextImageURL) {
    imageEl.src = nextImageURL;
    imageEl.classList.remove("hidden");
    nextImageURL = null;
  }

  const nextLevel = chapter.levels[currentLevelIndex + 1] || chapters[currentChapter + 1]?.levels[0];
  if (nextLevel) preloadImage(nextLevel.scene);

  robotAnimation.classList.remove("hidden");
  setTimeout(() => {
    robotAnimation.classList.add("hidden");
    questionEl.textContent = level.question;
    choicesEl.innerHTML = "";
    level.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => handleAnswer(choice);
      choicesEl.appendChild(btn);
    });
    questionContainer.classList.remove("hidden");
    resultEl.textContent = "";
    nextButton.classList.add("hidden");
    startTime = Date.now();
  }, 1000);
}

function handleAnswer(choice) {
  const chapter = chapters[currentChapter];
  const level = chapter.levels[currentLevelIndex];
  const timeTaken = Date.now() - startTime;

  if (choice === level.correctAnswer) {
    if (timeTaken < 5000) currentDifficulty = Math.min(3, currentDifficulty + 1);
    resultEl.textContent = level.successMessage;
    nextButton.classList.remove("hidden");
  } else {
    currentDifficulty = Math.max(1, currentDifficulty - 1);
    resultEl.textContent = "Oops! Try again.";
  }

  console.log(`Time: ${timeTaken}ms | Difficulty: ${currentDifficulty}`);
}

nextButton.onclick = () => {
  const chapter = chapters[currentChapter];
  currentLevelIndex++;
  if (currentLevelIndex >= chapter.levels.length) {
    currentChapter++;
    currentLevelIndex = 0;
    if (currentChapter < chapters.length) {
      showChapterIntro();
    } else {
      storyEl.textContent = "🎉 You reunited all the robots! Mission complete!";
      questionContainer.classList.add("hidden");
      nextButton.classList.add("hidden");
    }
  } else {
    questionContainer.classList.add("hidden");
    showLevel();
  }
};

startButton.onclick = startGame;
preloadImage(chapters[0].levels[0].scene);
