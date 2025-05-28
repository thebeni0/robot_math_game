let gameData = [];
let currentCity = 0;
let currentQuestion = 0;

const sceneEl = document.getElementById("scene");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextButton = document.getElementById("next-button");
const imageEl = document.getElementById("scene-image");

function preloadImage(prompt) {
  fetch("https://dalle-image-api.onrender.com/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      if (data.image_url) {
        imageEl.src = data.image_url;
        imageEl.style.display = "block";
      }
    })
    .catch(err => console.error("Image load error:", err));
}

function showQuestion() {
  const city = gameData[currentCity];
  const level = city.questions[currentQuestion];
  sceneEl.textContent = city.intro;
  resultEl.textContent = "";
  nextButton.style.display = "none";
  choicesEl.innerHTML = "";
  imageEl.style.display = "none";

  if (city.type === "spelling") {
    questionEl.textContent = `Spell this word: ${level.imageWord}`;
    preloadImage(level.imagePrompt);
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type the word";
    input.id = "spelling-input";
    choicesEl.appendChild(input);

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => {
      const userInput = document.getElementById("spelling-input").value.trim().toLowerCase();
      handleAnswer(userInput);
    };
    choicesEl.appendChild(submitBtn);
  } else {
    questionEl.textContent = level.question;
    preloadImage(level.imagePrompt);
    level.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => handleAnswer(choice);
      choicesEl.appendChild(btn);
    });
  }
}

function handleAnswer(choice) {
  const city = gameData[currentCity];
  const level = city.questions[currentQuestion];
  const correct = city.type === "spelling" ? level.imageWord.toLowerCase() : level.answer;
  if (choice === correct) {
    resultEl.textContent = level.successMessage || "Great job!";
    nextButton.style.display = "inline-block";
  } else {
    resultEl.textContent = "Try again!";
  }
}

nextButton.onclick = () => {
  currentQuestion++;
  const city = gameData[currentCity];
  if (currentQuestion >= city.questions.length) {
    currentCity++;
    currentQuestion = 0;
    if (currentCity >= gameData.length) {
      sceneEl.textContent = "🎉 You've completed all the cities!";
      questionEl.textContent = "";
      choicesEl.innerHTML = "";
      resultEl.textContent = "";
      nextButton.style.display = "none";
      imageEl.style.display = "none";
      return;
    }
  }
  showQuestion();
};

window.onload = () => {
  fetch("world_game_data.json")
    .then(res => res.json())
    .then(data => {
      gameData = data;
      nextButton.style.display = "none";
      showQuestion();
    })
    .catch(err => {
      sceneEl.textContent = "Error loading game data.";
      console.error("Fetch error:", err);
    });
};

