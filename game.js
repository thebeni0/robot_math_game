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

// 🧠 Game Chapters (Cleaned Prompts for Image Generation)
const chapters = [
[
  {
    "name": "The Gear Room",
    "type": "add-subtract",
    "intro": "\ud83d\udee0 Chapter 1: The Gear Room \u2014 Power up the system with addition and subtraction!",
    "levels": [
      {
        "scene": "The robot gears are jammed! Help fix them by solving this math puzzle.",
        "imagePrompt": "a robot gear room with mechanical parts and a friendly robot holding a wrench",
        "question": "What is 45 + 32?",
        "choices": [
          77,
          76,
          78
        ],
        "correctAnswer": 77,
        "successMessage": "Gear activated!"
      },
      {
        "scene": "Oh no! The power generator has stopped working. Let's do some math to turn it back on.",
        "imagePrompt": "a glowing generator with flickering lights and a concerned robot nearby",
        "question": "What is 78 - 29?",
        "choices": [
          49,
          50,
          48
        ],
        "correctAnswer": 49,
        "successMessage": "Generator humming!"
      },
      {
        "scene": "The lights are off in the gear room. Can you solve this to turn them on?",
        "imagePrompt": "a dim gear room with a robot trying to flip a large circuit switch",
        "question": "What is 23 + 19?",
        "choices": [
          42,
          43,
          44
        ],
        "correctAnswer": 42,
        "successMessage": "Lights on!"
      },
      {
        "scene": "The hatch to the main gear shaft is locked! Let\u2019s solve this to open it.",
        "imagePrompt": "a hatch door with glowing locks and a small helper robot nearby",
        "question": "What is 61 - 18?",
        "choices": [
          43,
          42,
          44
        ],
        "correctAnswer": 43,
        "successMessage": "Hatch opened!"
      },
      {
        "scene": "The heavy motor that opens the door needs power! Solve this problem to help.",
        "imagePrompt": "a robot lifting a giant wrench next to a motorized door",
        "question": "What is 37 + 42?",
        "choices": [
          79,
          78,
          80
        ],
        "correctAnswer": 79,
        "successMessage": "Motor spinning!"
      },
      {
        "scene": "The coolant fans have stopped spinning. It\u2019s getting hot! Let\u2019s fix that.",
        "imagePrompt": "a control panel with fans and steam coming out, robot fanning itself",
        "question": "What is 90 - 45?",
        "choices": [
          45,
          44,
          46
        ],
        "correctAnswer": 45,
        "successMessage": "Coolant activated!"
      },
      {
        "scene": "The robot's arm needs a tune-up. Can you calibrate it with this math?",
        "imagePrompt": "a robot arm adjusting knobs on a circuit board",
        "question": "What is 66 + 13?",
        "choices": [
          79,
          78,
          80
        ],
        "correctAnswer": 79,
        "successMessage": "Arm calibrated!"
      },
      {
        "scene": "The battery is low! Help recharge it with the correct answer.",
        "imagePrompt": "a glowing battery being charged by cables connected to a robot",
        "question": "What is 100 - 27?",
        "choices": [
          73,
          74,
          72
        ],
        "correctAnswer": 73,
        "successMessage": "Battery charged!"
      },
      {
        "scene": "Piston 2 isn\u2019t moving. Let\u2019s activate it with your math power!",
        "imagePrompt": "a mechanical piston with steam and a helper robot pressing a button",
        "question": "What is 54 + 36?",
        "choices": [
          90,
          91,
          89
        ],
        "correctAnswer": 90,
        "successMessage": "Piston 2 operational!"
      },
      {
        "scene": "All systems are almost ready. Just align the final bolt!",
        "imagePrompt": "a final gear puzzle with bolts and a robot holding a bolt in one hand",
        "question": "What is 88 - 24?",
        "choices": [
          64,
          65,
          63
        ],
        "correctAnswer": 64,
        "successMessage": "Alignment complete!"
      }
    ]
  {
    name: "Conveyor Belt Chaos",
    type: "word-problem",
    intro: "📦 Chapter 2: Conveyor Belt Chaos — Solve story problems to clear the jam!",
    levels: [
      { scene: "Toolkits are scattered everywhere! Help Sprocket count them all.", question: "25 + 13 = ?", choices: [38, 37, 39], correctAnswer: 38, successMessage: "Toolkits counted!" },
      { scene: "Some bolts have rolled away. Count what’s left.", question: "42 - 17 = ?", choices: [25, 26, 24], correctAnswer: 25, successMessage: "Bolts updated!" },
      { scene: "You found two bins of screws. Let’s add them together!", question: "16 + 14 = ?", choices: [30, 31, 29], correctAnswer: 30, successMessage: "Screws totaled!" },
      { scene: "New widgets have arrived. Time to count them all!", question: "36 + 28 = ?", choices: [64, 65, 63], correctAnswer: 64, successMessage: "Widgets loaded!" },
      { scene: "You used some rivets. How many are still in the bin?", question: "60 - 20 = ?", choices: [40, 39, 41], correctAnswer: 40, successMessage: "Rivets remaining!" },
      { scene: "There are kits in boxes. Let’s see how many we have in total.", question: "3 × 12 = ?", choices: [36, 35, 37], correctAnswer: 36, successMessage: "Kits counted!" },
      { scene: "Check the tool bins—each has the same number of tools!", question: "15 × 5 = ?", choices: [75, 74, 76], correctAnswer: 75, successMessage: "Inventory tallied!" },
      { scene: "Some wires were used. Let’s count the leftovers.", question: "40 - 17 = ?", choices: [23, 22, 24], correctAnswer: 23, successMessage: "Wires left noted!" },
      { scene: "More gadgets just arrived. Add them to the count.", question: "8 + 6 = ?", choices: [14, 13, 15], correctAnswer: 14, successMessage: "Gadget count updated!" },
      { scene: "You just collected some widgets. What’s left?", question: "90 - 45 = ?", choices: [45, 44, 46], correctAnswer: 45, successMessage: "Belt cleared!" }
    ]
  },
  {
    name: "Glitchy Robot Battle",
    type: "multiplication",
    intro: "🤖 Chapter 3: Glitchy Robot Battle — Use multiplication to disable rogue bots!",
    levels: [
      { scene: "A glitchy robot marches toward you! Time for a fast calculation.", question: "What is 6 × 8?", choices: [48, 47, 49], correctAnswer: 48, successMessage: "Bot deactivated!" },
      { scene: "Another bot appears, spinning wildly!", question: "What is 7 × 4?", choices: [28, 27, 29], correctAnswer: 28, successMessage: "Stabilized!" },
      { scene: "Sparks shoot from a bot's eyes as it charges!", question: "What is 9 × 3?", choices: [27, 28, 26], correctAnswer: 27, successMessage: "Bot neutralized!" },
      { scene: "A robot whirs back to life! Can you stop it?", question: "What is 5 × 5?", choices: [25, 26, 24], correctAnswer: 25, successMessage: "Bot rebooted!" },
      { scene: "A fast-moving bot zips your way!", question: "What is 3 × 9?", choices: [27, 26, 28], correctAnswer: 27, successMessage: "Stunned!" },
      { scene: "A bot freezes mid-step. One more calculation to shut it down.", question: "What is 8 × 6?", choices: [48, 47, 49], correctAnswer: 48, successMessage: "Bot disabled!" },
      { scene: "A new bot appears on your radar.", question: "What is 2 × 7?", choices: [14, 13, 15], correctAnswer: 14, successMessage: "Cleared!" },
      { scene: "It’s getting tougher! A robot prepares to launch bolts!", question: "What is 4 × 4?", choices: [16, 15, 17], correctAnswer: 16, successMessage: "Bot offline!" },
      { scene: "A robot blocks the door. It won’t move until you solve this.", question: "What is 10 × 3?", choices: [30, 31, 29], correctAnswer: 30, successMessage: "Down!" },
      { scene: "The final boss bot looms in front of you.", question: "What is 7 × 6?", choices: [42, 41, 43], correctAnswer: 42, successMessage: "Battle won!" }
    ]
  },
  // (Security Panel Puzzle and Robo Reunion would follow in similar style — let me know if you want those next!)
{
    "name": "Security Panel Puzzle",
    "type": "patterns",
    "intro": "\ud83d\udd10 Chapter 4: Security Panel Puzzle \u2014 Complete the number patterns to unlock!",
    "levels": [
      {
        "scene": "A locked door blocks your way. The panel shows blinking numbers.",
        "question": "What fits? 2, 4, 6, ?, 10",
        "choices": [
          8,
          7,
          9
        ],
        "correctAnswer": 8,
        "successMessage": "Panel unlocked!"
      },
      {
        "scene": "A buzzing keypad asks for a missing number in the code.",
        "question": "What fits? 5, 10, ?, 20",
        "choices": [
          15,
          14,
          16
        ],
        "correctAnswer": 15,
        "successMessage": "Code accepted!"
      },
      {
        "scene": "The screen flashes rapidly. You spot a pattern in the chaos.",
        "question": "What fits? 3, 6, 9, ?, 15",
        "choices": [
          12,
          11,
          13
        ],
        "correctAnswer": 12,
        "successMessage": "Matched!"
      },
      {
        "scene": "A laser grid flickers on. You must solve the binary pattern to continue.",
        "question": "What fits? 1, 2, 4, 8, ?",
        "choices": [
          16,
          15,
          17
        ],
        "correctAnswer": 16,
        "successMessage": "Sequence synced!"
      },
      {
        "scene": "You find a strange machine humming. The numbers grow quickly!",
        "question": "What fits? 7, 14, ?, 28",
        "choices": [
          21,
          20,
          22
        ],
        "correctAnswer": 21,
        "successMessage": "Logic complete!"
      },
      {
        "scene": "A spinning disc shows a numeric riddle. Can you crack it?",
        "question": "What fits? 9, 18, ?, 36",
        "choices": [
          27,
          26,
          28
        ],
        "correctAnswer": 27,
        "successMessage": "Access granted!"
      },
      {
        "scene": "The floor lights blink a triangle shape. Solve the number puzzle!",
        "question": "What fits? 1, 3, 6, 10, ?",
        "choices": [
          15,
          14,
          13
        ],
        "correctAnswer": 15,
        "successMessage": "Panel open!"
      },
      {
        "scene": "Big square buttons light up in tens. What\u2019s the next number?",
        "question": "What fits? 10, 20, ?, 40",
        "choices": [
          30,
          29,
          31
        ],
        "correctAnswer": 30,
        "successMessage": "Unlocked!"
      },
      {
        "scene": "A voice says, 'Step through the numbers in four steps.'",
        "question": "What fits? 4, 8, 12, ?, 20",
        "choices": [
          16,
          15,
          17
        ],
        "correctAnswer": 16,
        "successMessage": "Key accepted!"
      },
      {
        "scene": "One last code! You hear gears turning behind the wall.",
        "question": "What fits? 13, 26, 39, ?, 65",
        "choices": [
          52,
          50,
          54
        ],
        "correctAnswer": 52,
        "successMessage": "Final door opened!"
      }
    ]
  },
  {
    "name": "Robo Reunion",
    "type": "review",
    "intro": "\ud83c\udf89 Final Chapter: Robo Reunion \u2014 Use all your skills to free the robot team!",
    "levels": [
      {
        "scene": "You see your first robot friend behind a glass pod. Free them!",
        "question": "What is 8 \u00d7 7?",
        "choices": [
          56,
          57,
          55
        ],
        "correctAnswer": 56,
        "successMessage": "Robot freed!"
      },
      {
        "scene": "Another robot waves for help from inside a power cell.",
        "question": "What is 60 \u00f7 5?",
        "choices": [
          12,
          11,
          13
        ],
        "correctAnswer": 12,
        "successMessage": "Freed!"
      },
      {
        "scene": "A robot\u2019s gears are stuck! You must enter the correct number.",
        "question": "What is 15 + 26?",
        "choices": [
          41,
          40,
          42
        ],
        "correctAnswer": 41,
        "successMessage": "Unlocked!"
      },
      {
        "scene": "One bot is trying to push the door open. Give it a boost!",
        "question": "What is 90 - 45?",
        "choices": [
          45,
          46,
          44
        ],
        "correctAnswer": 45,
        "successMessage": "Escape complete!"
      },
      {
        "scene": "This robot is trapped behind sparks. Think fast!",
        "question": "What is 3 \u00d7 9?",
        "choices": [
          27,
          28,
          26
        ],
        "correctAnswer": 27,
        "successMessage": "Good job!"
      },
      {
        "scene": "You see a robot on a ledge. Lower the bridge!",
        "question": "What is 72 \u00f7 8?",
        "choices": [
          9,
          8,
          10
        ],
        "correctAnswer": 9,
        "successMessage": "Unlocked!"
      },
      {
        "scene": "A sleepy robot blinks. You must unlock its door.",
        "question": "What is 25 + 36?",
        "choices": [
          61,
          60,
          62
        ],
        "correctAnswer": 61,
        "successMessage": "Door opened!"
      },
      {
        "scene": "A happy robot jumps as you approach. Let\u2019s get it out!",
        "question": "What is 100 - 25?",
        "choices": [
          75,
          74,
          76
        ],
        "correctAnswer": 75,
        "successMessage": "Systems online!"
      },
      {
        "scene": "The next robot is stuck in the wall. Break it free!",
        "question": "What is 11 + 14?",
        "choices": [
          25,
          26,
          24
        ],
        "correctAnswer": 25,
        "successMessage": "Robot rebooted!"
      },
      {
        "scene": "The final robot waits with a big smile. Can you finish the mission?",
        "question": "What is 6 \u00d7 7?",
        "choices": [
          42,
          41,
          43
        ],
        "correctAnswer": 42,
        "successMessage": "Mission complete!"
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
