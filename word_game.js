const cities = [
  {
    name: "Paris",
    challenge: "Unscramble the word: _E_I_F",
    choices: ["FEIUR", "EIFRL", "EIFFEL"],
    correctAnswer: "EIFFEL",
    successMessage: "Très bien! You earned the Paris stamp!"
  },
  {
    name: "Tokyo",
    challenge: "Choose the correct spelling: ______ tower",
    choices: ["Toyko", "Tokyo", "Tokiyo"],
    correctAnswer: "Tokyo",
    successMessage: "すごい! The Tokyo tower lights up!"
  },
  {
    name: "Cairo",
    challenge: "Fill in the blank: The Great ______ of Giza",
    choices: ["Pirameed", "Piramid", "Pyramid"],
    correctAnswer: "Pyramid",
    successMessage: "Correct! The Pyramid shines under the sun!"
  },
  {
    name: "Beaverton",
    challenge: "Which word starts with the same sound as Beaverton?",
    choices: ["Banana", "Pizza", "Garden"],
    correctAnswer: "Banana",
    successMessage: "Nice work! You reached Beaverton with a B-bounce!"
  },
  {
    name: "Gibraltar",
    challenge: "Which letter does Gibraltar start with?",
    choices: ["G", "J", "R"],
    correctAnswer: "G",
    successMessage: "Good job! The Rock of Gibraltar welcomes you!"
  }
];

let currentCity = 0;

function showCity() {
  const city = cities[currentCity];
  document.getElementById("city-name").textContent = "✈️ Destination: " + city.name;
  document.getElementById("challenge").textContent = city.challenge;
  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  city.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesEl.appendChild(btn);
  });
  document.getElementById("result").textContent = "";
  document.getElementById("next-city-button").style.display = "none";
}

function checkAnswer(choice) {
  const city = cities[currentCity];
  if (choice === city.correctAnswer) {
    document.getElementById("result").textContent = city.successMessage;
    document.getElementById("next-city-button").style.display = "inline-block";
  } else {
    document.getElementById("result").textContent = "Try again!";
  }
}

document.getElementById("next-city-button").onclick = () => {
  currentCity++;
  if (currentCity < cities.length) {
    showCity();
  } else {
    document.getElementById("word-game-container").innerHTML = "<h2>🎉 You've completed the Word Traveler adventure!</h2>";
  }
};

showCity();
