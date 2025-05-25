
// game.js – Updated with chapters, adaptive difficulty, and progression
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

const chapters = [
  {
    name: "The Gear Room",
    type: "add-subtract",
    intro: "🛠 Chapter 1: The Gear Room — Power up the system with addition and subtraction!",
    levels: [
      { scene: "Fuse box malfunction.", question: "What is 47 + 18?", choices: [65, 66, 64], correctAnswer: 65, successMessage: "Fuse restored!" },
      { scene: "Power coupler fault.", question: "What is 92 - 57?", choices: [35, 36, 34], correctAnswer: 35, successMessage: "Coupler re-engaged!" },
      { scene: "Main panel flicker.", question: "What is 30 + 45?", choices: [75, 74, 76], correctAnswer: 75, successMessage: "Main panel stable!" }
    ]
  },
  {
    name: "Conveyor Belt Chaos",
    type: "word-problem",
    intro: "📦 Chapter 2: Conveyor Belt Chaos — Solve story problems to clear the jam!",
    levels: [
      { scene: "Boxes are piling up!", question: "You had 40 boxes and shipped 15. How many remain?", choices: [25, 26, 27], correctAnswer: 25, successMessage: "Boxes cleared!" },
      { scene: "Delivery robot delay.", question: "Ben programmed 3 robots with 6 commands each. How many total commands?", choices: [18, 16, 20], correctAnswer: 18, successMessage: "Robots back on track!" }
    ]
  },
  {
    name: "Glitchy Robot Battle",
    type: "multiplication",
    intro: "🤖 Chapter 3: Glitchy Robot Battle — Use multiplication to disable rogue bots!",
    levels: [
      { scene: "First glitchbot encounter!", question: "What is 6 × 3?", choices: [18, 17, 16], correctAnswer: 18, successMessage: "Bot shut down!" },
      { scene: "New threat detected.", question: "What is 9 × 2?", choices: [18, 19, 20], correctAnswer: 18, successMessage: "Bot neutralized!" }
    ]
  },
  {
    name: "Security Panel Puzzle",
    type: "patterns",
    intro: "🔐 Chapter 4: Security Panel Puzzle — Complete the number patterns to unlock!",
    levels: [
      { scene: "Enter passcode sequence.", question: "2, 4, 6, ?, 10", choices: [7, 8, 9], correctAnswer: 8, successMessage: "Pattern accepted!" },
      { scene: "Next puzzle incoming.", question: "5, 10, ?, 20", choices: [12, 15, 18], correctAnswer: 15, successMessage: "Panel opened!" }
    ]
  },
  {
    name: "Robo Reunion",
    type: "review",
    intro: "🎉 Final Chapter: Robo Reunion — Use all your skills to free the robot team!",
    levels: [
      { scene: "Final lock!", question: "What is 8 × 7?", choices: [56, 54, 58], correctAnswer: 56, successMessage: "Robot unlocked!" },
      { scene: "System reboot!", question: "What is 60 ÷ 5?", choices: [12, 10, 15], correctAnswer: 12, successMessage: "System fully rebooted!" }
    ]
  }
];

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
