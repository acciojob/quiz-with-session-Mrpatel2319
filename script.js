const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get references to DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from session storage
const loadProgress = () => JSON.parse(sessionStorage.getItem("progress")) || {};

// Save progress to session storage
const saveProgress = (progress) => sessionStorage.setItem("progress", JSON.stringify(progress));

// Render quiz questions
function renderQuestions() {
  const progress = loadProgress();

  questionsElement.innerHTML = ""; // Clear previous content
  questions.forEach((q, questionIndex) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;

    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${questionIndex}`;
      radio.value = choice;
      radio.checked = progress[questionIndex] === choice;

      radio.addEventListener("change", () => {
        progress[questionIndex] = choice;
        saveProgress(progress);
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br")); // Line break for better spacing
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate and display the score
function calculateScore() {
  const progress = loadProgress();
  let score = 0;

  questions.forEach((q, i) => {
    if (progress[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem("score", score); // Save score to local storage
}

// Event listener for submit button
submitButton.addEventListener("click", calculateScore);

// Initial render
renderQuestions();
