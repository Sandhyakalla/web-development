<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Quiz</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(45deg, #3498db, #e74c3c);
            color: #fff;
            overflow: hidden;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
            color: #ecf0f1;
        }

        .quiz-container {
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%);
            box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 20px;
            margin: 20px;
            text-align: center;
        }

        .question {
            font-size: 1.2em;
            margin-bottom: 20px;
        }

        .options {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .options li {
            margin: 10px;
            padding: 10px;
            border: 1px solid #ecf0f1;
            border-radius: 8px;
            cursor: pointer;
        }

        .progress-bar {
            margin-top: 20px;
            height: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }

        .progress {
            height: 100%;
            width: 0;
            background-color: #2ecc71;
            border-radius: 10px;
        }

        .timer {
            font-size: 1em;
            margin-top: 10px;
        }

        .score {
            font-size: 1.2em;
            margin-top: 20px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Interactive Quiz</h1>
    <div class="quiz-container">
        <div class="question" id="question"></div>
        <ul class="options" id="options"></ul>
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
        <div class="timer" id="timer">Time: 10</div>
        <div class="score" id="score">Score: 0</div>
    </div>
</div>

<script>
    const questions = [
        {
            question: "Which of the following is the correct way to declare a variable in JavaScript?",
            options: ["let x = 5;", "const x = 5;", "var x = 5;", "int x = 5;"],
            correctAnswer: "let x = 5;"
        },
        {   question: "What does the 'DOM' stand for in web development?",
            options: ["Document Object Model", "Data Object Model", "Digital Object Model", "Dynamic Object Model"],
            correctAnswer: "Document Object Model"
        },
        {   question: "How can you prevent the default behavior of a form submission in JavaScript?",
            options: ["event.preventDefault();", "event.stop();", "form.preventDefault();", "form.stop();"],
            correctAnswer: "event.preventDefault();"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    document.addEventListener("DOMContentLoaded", startQuiz);

    function startQuiz() {
        loadQuestion();
        startTimer();
    }

    function loadQuestion() {
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");

        questionElement.textContent = questions[currentQuestionIndex].question;
        optionsElement.innerHTML = "";

        questions[currentQuestionIndex].options.forEach((option, index) => {
            const li = document.createElement("li");
            li.textContent = option;
            li.addEventListener("click", handleOptionClick);
            optionsElement.appendChild(li);
        });

        updateProgressBar();
    }

    function handleOptionClick(event) {
        clearInterval(timer);

        const selectedOption = event.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (selectedOption === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            startTimer();
        } else {
            showResults();
        }
    }

    function showResults() {
        const quizContainer = document.querySelector(".quiz-container");
        const scoreElement = document.getElementById("score");

        quizContainer.innerHTML = <h2>Quiz Completed!</h2><p>Your Score: ${score} out of ${questions.length}</p>;
        scoreElement.style.display = "none";
    }

    function updateProgressBar() {
        const progressElement = document.getElementById("progress");
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressElement.style.width = ${progress}%;
    }

    function startTimer() {
        let timeRemaining = 10;
        const timerElement = document.getElementById("timer");

        timer = setInterval(() => {
            timerElement.textContent = Time: ${timeRemaining};

            if (timeRemaining === 0) {
                clearInterval(timer);
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                    startTimer();
                } else {
                    showResults();
                }
            }

            timeRemaining--;
        }, 1000);
    }
</script>

</body>
</html>
