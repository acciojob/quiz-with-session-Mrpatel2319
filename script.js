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

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const loadProgress = () => JSON.parse(sessionStorage.getItem("progress")) || {};

const saveProgress = (progress) => sessionStorage.setItem("progress", JSON.stringify(progress));

function renderQuestions() {
  const progress = loadProgress();

  questionsElement.innerHTML = "";
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
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

function calculateScore() {
  const progress = loadProgress();
  let score = 0;

  questions.forEach((q, i) => {
    if (progress[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem("score", score);
}

submitButton.addEventListener("click", calculateScore);

renderQuestions();