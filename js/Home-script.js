document.addEventListener('DOMContentLoaded', (event) => {
    let currentImageIndex = 0;
    let images = document.querySelectorAll('.carousel-image');

    function changeImage(direction) {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex += direction;

        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        images[currentImageIndex].style.display = 'block';
    }

    setInterval(() => {
        changeImage(1);
    }, 3000); // Change image every 3000 milliseconds (3 seconds)

    const quizQuestions = [
    {
        id: 1,
        question: "Who won the FIFA World Cup in 2018?",
        options: ["Brazil", "France", "Germany", "Spain"],
        correctAnswerIndex: 1 // France
    },
    {
        id: 2,
        question: "Which player holds the record for the most goals in the Premier League?",
        options: ["Alan Shearer", "Wayne Rooney", "Thierry Henry", "Sergio Agüero"],
        correctAnswerIndex: 0 // Alan Shearer
    },
    {
        id: 3,
        question: "Which country is known as the 'Home of Football'?",
        options: ["Brazil", "Italy", "England", "Spain"],
        correctAnswerIndex: 2 // England
    },
    {
        id: 4,
        question: "What is the maximum number of players a football team can have on the field at any time?",
        options: ["11", "12", "10", "9"],
        correctAnswerIndex: 0 // 11
    },
    {
        id: 5,
        question: "Which team won the UEFA Champions League in 2005 in a dramatic comeback against AC Milan?",
        options: ["Liverpool", "Manchester United", "Chelsea", "Barcelona"],
        correctAnswerIndex: 0 // Liverpool
    },
    {
        id: 6,
        question: "Which player is known as 'The King of Football'?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Pele", "Diego Maradona"],
        correctAnswerIndex: 2 // Pele
    },
    {
        id: 7,
        question: "What color card does a referee show to indicate a player is being warned?",
        options: ["Red", "Yellow", "Green", "Blue"],
        correctAnswerIndex: 1 // Yellow
    },
    {
        id: 8,
        question: "Which country won the first ever FIFA World Cup in 1930?",
        options: ["Uruguay", "Brazil", "Argentina", "Italy"],
        correctAnswerIndex: 0 // Uruguay
    },
    {
        id: 9,
        question: "How long is a standard professional football match?",
        options: ["90 minutes", "80 minutes", "100 minutes", "120 minutes"],
        correctAnswerIndex: 0 // 90 minutes
    },
    {
        id: 10,
        question: "Which football club is known as 'The Red Devils'?",
        options: ["Arsenal", "Liverpool", "Manchester United", "Chelsea"],
        correctAnswerIndex: 2 // Manchester United
    },
    {
        id: 11,
        question: "Who is the only player to have won three European Golden Shoes?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Robert Lewandowski", "Kylian Mbappe"],
        correctAnswerIndex: 1 // Lionel Messi
    },
    {
        id: 12,
        question: "In which year was the UEFA Champions League founded?",
        options: ["1955", "1960", "1970", "1985"],
        correctAnswerIndex: 0 // 1955
    },
    {
        id: 20,
        question: "Which player is known for the famous 'bicycle kick'?",
        options: ["Cristiano Ronaldo", "Ronaldinho", "Lionel Messi", "Zlatan Ibrahimovic"],
        correctAnswerIndex: 3 // Zlatan Ibrahimovic
    }
];




// Shuffle and select 10 random questions with shuffled options
    function selectRandomQuestions(questions, count) {
    shuffleArray(questions);
    return questions.slice(0, count).map(question => {
        let shuffledOptions = shuffleArray([...question.options]);
        return {...question, shuffledOptions};
    });
}


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let currentQuestionIndex = 0;
    let selectedQuestions = selectRandomQuestions([...quizQuestions], 10);

    let correctCount = 0;
    let wrongCount = 0;
    let incompleteCount = 0;
    let timer;

    function displayCurrentQuestion() {
        clearInterval(timer);
        const question = selectedQuestions[currentQuestionIndex];
        const quizForm = document.getElementById('quizForm');
        quizForm.innerHTML = `<div id="timer"></div>` + createQuestionHtml(question);
        quizForm.innerHTML += `<button id="nextQuestion" disabled>Next Question</button>`;
        startTimer();
    }

// Function to create HTML for a single quiz question
function createQuestionHtml(question) {
    let htmlContent = `<div class="question-container" id="question-${question.id}">
        <h3>${question.question}</h3>
        <ul>`;

    question.shuffledOptions.forEach((option, index) => {
        htmlContent += `<li>
            <input type="radio" name="answer-${question.id}" value="${index}" onchange="answerSelected(${index}, ${question.id})">
            <label for="option-${question.id}-${index}">${option}</label>
        </li>`;
    });

    htmlContent += `</ul></div>`;
    return htmlContent;
}



    window.enableNextButton = function() {
        document.getElementById('nextQuestion').disabled = false;
    };

// Function to handle answer selection
window.answerSelected = function(selectedOptionIndex, questionId) {
    const question = selectedQuestions.find(q => q.id === questionId);
    clearInterval(timer);

    if (question.correctAnswerIndex === selectedOptionIndex) {
        correctCount++;
    } else {
        wrongCount++;
    }
    enableNextButton();
};




    function startTimer() {
        let timeLeft = 15;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time left: ${timeLeft} seconds`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timerElement.textContent = 'Time is up!';
                incompleteCount++;
                goToNextQuestion();
            }
        }, 1000);
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < selectedQuestions.length - 1) {
            currentQuestionIndex++;
            displayCurrentQuestion();
        } else {
            clearInterval(timer);
            displayResults();
        }
    }

    function displayResults() {
        const quizForm = document.getElementById('quizForm');
        quizForm.innerHTML = `<h3>Quiz Completed!</h3>
            <p>Correct Answers: ${correctCount}</p>
            <p>Wrong Answers: ${wrongCount}</p>
            <p>Incomplete Answers: ${incompleteCount}</p>`;
    }

    function initializeQuiz() {
        currentQuestionIndex = 0;
        correctCount = 0;
        wrongCount = 0;
        incompleteCount = 0;
        selectedQuestions = selectRandomQuestions([...quizQuestions], 10);
        displayCurrentQuestion();
        document.getElementById('quizForm').classList.remove('hidden');
        document.getElementById('startQuiz').style.display = 'none';
        document.getElementById('quiz-container').style.backgroundImage = 'none';
    }

    document.getElementById('startQuiz').addEventListener('click', initializeQuiz);

    document.getElementById('quizForm').addEventListener('click', (event) => {
        if (event.target && event.target.id === 'nextQuestion') {
            goToNextQuestion();
        }
    });
});