
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

// game.js — 50 questions across 5 chapters

const chapters = [
  {
    name: "The Gear Room",
    type: "add-subtract",
    intro: "🛠 Chapter 1: The Gear Room — Power up the system with addition and subtraction!",
    levels: [
  {
    "scene": "Solve the gear calculation: 38 + 24",
    "question": "What is 38 + 24?",
    "choices": [
      62,
      63,
      61
    ],
    "correctAnswer": 62,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 62 + 15",
    "question": "What is 62 + 15?",
    "choices": [
      77,
      78,
      76
    ],
    "correctAnswer": 77,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 72 + 24",
    "question": "What is 72 + 24?",
    "choices": [
      96,
      97,
      95
    ],
    "correctAnswer": 96,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 32 + 46",
    "question": "What is 32 + 46?",
    "choices": [
      78,
      79,
      77
    ],
    "correctAnswer": 78,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 13 + 64",
    "question": "What is 13 + 64?",
    "choices": [
      77,
      78,
      76
    ],
    "correctAnswer": 77,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 57 + 24",
    "question": "What is 57 + 24?",
    "choices": [
      81,
      82,
      80
    ],
    "correctAnswer": 81,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 22 + 33",
    "question": "What is 22 + 33?",
    "choices": [
      55,
      56,
      54
    ],
    "correctAnswer": 55,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 22 + 46",
    "question": "What is 22 + 46?",
    "choices": [
      68,
      69,
      67
    ],
    "correctAnswer": 68,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 35 + 45",
    "question": "What is 35 + 45?",
    "choices": [
      80,
      81,
      79
    ],
    "correctAnswer": 80,
    "successMessage": "Gear activated!"
  },
  {
    "scene": "Solve the gear calculation: 45 + 14",
    "question": "What is 45 + 14?",
    "choices": [
      59,
      60,
      58
    ],
    "correctAnswer": 59,
    "successMessage": "Gear activated!"
  }
]
  },
  {
    name: "Conveyor Belt Chaos",
    type: "word-problem",
    intro: "📦 Chapter 2: Conveyor Belt Chaos — Solve story problems to clear the jam!",
    levels: [
  {
    "scene": "Conveyor jam detected (task 1).",
    "question": "You had 14 parts. You used 3. How many are left?",
    "choices": [
      11,
      12,
      10
    ],
    "correctAnswer": 11,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 2).",
    "question": "You had 15 parts. You used 15. How many are left?",
    "choices": [
      0,
      1,
      -1
    ],
    "correctAnswer": 0,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 3).",
    "question": "You had 5 parts. You used 1. How many are left?",
    "choices": [
      4,
      5,
      3
    ],
    "correctAnswer": 4,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 4).",
    "question": "You had 5 parts. You used 4. How many are left?",
    "choices": [
      1,
      2,
      0
    ],
    "correctAnswer": 1,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 5).",
    "question": "You had 14 parts. You used 14. How many are left?",
    "choices": [
      0,
      1,
      -1
    ],
    "correctAnswer": 0,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 6).",
    "question": "You had 10 parts. You used 8. How many are left?",
    "choices": [
      2,
      3,
      1
    ],
    "correctAnswer": 2,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 7).",
    "question": "You had 6 parts. You used 6. How many are left?",
    "choices": [
      0,
      1,
      -1
    ],
    "correctAnswer": 0,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 8).",
    "question": "You had 14 parts. You used 1. How many are left?",
    "choices": [
      13,
      14,
      12
    ],
    "correctAnswer": 13,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 9).",
    "question": "You had 13 parts. You used 3. How many are left?",
    "choices": [
      10,
      11,
      9
    ],
    "correctAnswer": 10,
    "successMessage": "Jam cleared!"
  },
  {
    "scene": "Conveyor jam detected (task 10).",
    "question": "You had 15 parts. You used 12. How many are left?",
    "choices": [
      3,
      4,
      2
    ],
    "correctAnswer": 3,
    "successMessage": "Jam cleared!"
  }
]
  },
  {
    name: "Glitchy Robot Battle",
    type: "multiplication",
    intro: "🤖 Chapter 3: Glitchy Robot Battle — Use multiplication to disable rogue bots!",
    levels: [
  {
    "scene": "Glitchbot threat level 1.",
    "question": "What is 5 \u00d7 9?",
    "choices": [
      45,
      46,
      44
    ],
    "correctAnswer": 45,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 2.",
    "question": "What is 7 \u00d7 2?",
    "choices": [
      14,
      15,
      13
    ],
    "correctAnswer": 14,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 3.",
    "question": "What is 10 \u00d7 8?",
    "choices": [
      80,
      81,
      79
    ],
    "correctAnswer": 80,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 4.",
    "question": "What is 10 \u00d7 5?",
    "choices": [
      50,
      51,
      49
    ],
    "correctAnswer": 50,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 5.",
    "question": "What is 3 \u00d7 7?",
    "choices": [
      21,
      22,
      20
    ],
    "correctAnswer": 21,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 6.",
    "question": "What is 3 \u00d7 7?",
    "choices": [
      21,
      22,
      20
    ],
    "correctAnswer": 21,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 7.",
    "question": "What is 7 \u00d7 5?",
    "choices": [
      35,
      36,
      34
    ],
    "correctAnswer": 35,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 8.",
    "question": "What is 6 \u00d7 7?",
    "choices": [
      42,
      43,
      41
    ],
    "correctAnswer": 42,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 9.",
    "question": "What is 10 \u00d7 10?",
    "choices": [
      100,
      101,
      99
    ],
    "correctAnswer": 100,
    "successMessage": "Bot neutralized!"
  },
  {
    "scene": "Glitchbot threat level 10.",
    "question": "What is 4 \u00d7 8?",
    "choices": [
      32,
      33,
      31
    ],
    "correctAnswer": 32,
    "successMessage": "Bot neutralized!"
  }
]
  },
  {
    name: "Security Panel Puzzle",
    type: "patterns",
    intro: "🔐 Chapter 4: Security Panel Puzzle — Complete the number patterns to unlock!",
    levels: [
  {
    "scene": "Pattern lock 1.",
    "question": "5, 7, ?, 11 \u2014 what fits?",
    "choices": [
      9,
      10,
      8
    ],
    "correctAnswer": 9,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 2.",
    "question": "3, 5, ?, 9 \u2014 what fits?",
    "choices": [
      7,
      8,
      6
    ],
    "correctAnswer": 7,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 3.",
    "question": "5, 7, ?, 11 \u2014 what fits?",
    "choices": [
      9,
      10,
      8
    ],
    "correctAnswer": 9,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 4.",
    "question": "4, 6, ?, 10 \u2014 what fits?",
    "choices": [
      8,
      9,
      7
    ],
    "correctAnswer": 8,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 5.",
    "question": "4, 6, ?, 10 \u2014 what fits?",
    "choices": [
      8,
      9,
      7
    ],
    "correctAnswer": 8,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 6.",
    "question": "1, 3, ?, 7 \u2014 what fits?",
    "choices": [
      5,
      6,
      4
    ],
    "correctAnswer": 5,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 7.",
    "question": "4, 6, ?, 10 \u2014 what fits?",
    "choices": [
      8,
      9,
      7
    ],
    "correctAnswer": 8,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 8.",
    "question": "1, 3, ?, 7 \u2014 what fits?",
    "choices": [
      5,
      6,
      4
    ],
    "correctAnswer": 5,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 9.",
    "question": "5, 7, ?, 11 \u2014 what fits?",
    "choices": [
      9,
      10,
      8
    ],
    "correctAnswer": 9,
    "successMessage": "Pattern accepted!"
  },
  {
    "scene": "Pattern lock 10.",
    "question": "3, 5, ?, 9 \u2014 what fits?",
    "choices": [
      7,
      8,
      6
    ],
    "correctAnswer": 7,
    "successMessage": "Pattern accepted!"
  }
]
  },
  {
    name: "Robo Reunion",
    type: "review",
    intro: "🎉 Final Chapter: Robo Reunion — Use all your skills to free the robot team!",
    levels: [
  {
    "scene": "Final system test 1.",
    "question": "What is 9 \u00d7 11 - 3?",
    "choices": [
      96,
      97,
      95
    ],
    "correctAnswer": 96,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 2.",
    "question": "What is 7 \u00d7 4 - 6?",
    "choices": [
      22,
      23,
      21
    ],
    "correctAnswer": 22,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 3.",
    "question": "What is 9 \u00d7 8 - 2?",
    "choices": [
      70,
      71,
      69
    ],
    "correctAnswer": 70,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 4.",
    "question": "What is 5 \u00d7 10 - 4?",
    "choices": [
      46,
      47,
      45
    ],
    "correctAnswer": 46,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 5.",
    "question": "What is 9 \u00d7 12 - 3?",
    "choices": [
      105,
      106,
      104
    ],
    "correctAnswer": 105,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 6.",
    "question": "What is 9 \u00d7 4 - 4?",
    "choices": [
      32,
      33,
      31
    ],
    "correctAnswer": 32,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 7.",
    "question": "What is 9 \u00d7 8 - 8?",
    "choices": [
      64,
      65,
      63
    ],
    "correctAnswer": 64,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 8.",
    "question": "What is 3 \u00d7 9 - 3?",
    "choices": [
      24,
      25,
      23
    ],
    "correctAnswer": 24,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 9.",
    "question": "What is 10 \u00d7 3 - 5?",
    "choices": [
      25,
      26,
      24
    ],
    "correctAnswer": 25,
    "successMessage": "System passed!"
  },
  {
    "scene": "Final system test 10.",
    "question": "What is 8 \u00d7 7 - 6?",
    "choices": [
      50,
      51,
      49
    ],
    "correctAnswer": 50,
    "successMessage": "System passed!"
  }
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
