document.addEventListener('DOMContentLoaded', (event) => {

    // Function to validate the username
    window.validateUsername = function() {
        const username = document.getElementById('username');
        const errorDiv = document.getElementById('username-error');
        if(username.value.length < 6 || username.value.length > 20) {
            errorDiv.textContent = 'Username must be between 6 and 20 characters.';
        } else {
            errorDiv.textContent = '';
        }
    };

    // Function to validate the email
    window.validateEmail = function() {
        const email = document.getElementById('email');
        const errorDiv = document.getElementById('email-error');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!regex.test(email.value)) {
            errorDiv.textContent = 'Invalid email format.';
        } else {
            errorDiv.textContent = '';
        }
    };

    // Function to validate the password
    window.validatePassword = function() {
        const password = document.getElementById('password');
        const errorDiv = document.getElementById('password-error');
        if(password.value.length < 8 || password.value.length > 20) {
            errorDiv.textContent = 'Password must be between 8 and 20 characters.';
        } else {
            errorDiv.textContent = '';
        }
    };

    // Function to validate the confirm password
    window.validateConfirmPassword = function() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const errorDiv = document.getElementById('confirm-password-error');
        if(confirmPassword.value !== password.value) {
            errorDiv.textContent = 'Passwords do not match.';
        } else {
            errorDiv.textContent = '';
        }
    };

     // Function to validate the email in the login form
    window.validateLoginEmail = function() {
        const email = document.getElementById('login-email');
        const errorDiv = document.getElementById('login-email-error');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!regex.test(email.value)) {
            errorDiv.textContent = 'Invalid email format.';
        } else {
            errorDiv.textContent = '';
        }
    };

    // Function to validate the password in the login form
    window.validateLoginPassword = function() {
        const password = document.getElementById('login-password');
        const errorDiv = document.getElementById('login-password-error');
        if(password.value.length < 8) {
            errorDiv.textContent = 'Password must be at least 8 characters.';
        } else {
            errorDiv.textContent = '';
        }
    };
    // Set the current year in the footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Initialize carousel images
    const carouselImages = [
        { src: "/img/player1.png", alt: "Player 1" },
        { src: "/img/player2.png", alt: "Player 2" },
        { src: "/img/player3.png", alt: "Player 3" },
        { src: "/img/player4.png", alt: "Player 4" },
        { src: "/img/player5.png", alt: "Player 5" },
        { src: "/img/player6.png", alt: "Player 6" },
    ];

    const imageCarousel = document.getElementById("imageCarousel");

    // Add images to the carousel
    carouselImages.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.classList.add("carousel-image");
        imageCarousel.appendChild(imgElement);
    });

    // Define changeImage function
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

    // Set up interval to change image
    setInterval(() => {
        changeImage(1);
    }, 3000); // Change image every 3000 milliseconds (3 seconds)


});

// All the questions and options
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

function initializeTimerAndButtons() {
    clearInterval(timer);
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = `<div id="timer"></div>`;
    quizForm.innerHTML += `<div id="quizProgress"></div>`;
    quizForm.innerHTML += `<button id="nextQuestion" disabled>Next Question</button>`;
}

function displayCurrentQuestion() {
    clearInterval(timer);
    const question = selectedQuestions[currentQuestionIndex];
    const quizForm = document.getElementById('quizForm');
    quizForm.removeChild(document.getElementsByClassName('question-container')[0]);
    quizForm.innerHTML += createQuestionHtml(question);
    startTimer();
    updateProgress();
}

// Function to create HTML for a single quiz question
function createQuestionHtml(question) {
    let htmlContent = `<div class="question-container" id="question-${question.id}">
        <h3>${question.question}</h3>
        <ul>`;

    question.shuffledOptions.forEach((option, index) => {
        let optionId = `option-${question.id}-${index}`;
        htmlContent += `<li>
            <input type="radio" id="${optionId}" name="answer-${question.id}" value="${index}" onchange="answerSelected(${index}, ${question.id})">
            <label for="${optionId}">${option}</label>
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

    const selectedOption = document.querySelector(`input[name='answer-${questionId}']:checked`);
    const optionsList = document.querySelectorAll(`input[name='answer-${questionId}']`);
    optionsList.forEach(option => option.disabled = true); // Disable all options

    if (question.correctAnswerIndex === selectedOptionIndex) {
        correctCount++;
        selectedOption.parentElement.classList.add('correct-answer'); 
    } else {
        wrongCount++;
        selectedOption.parentElement.classList.add('wrong-answer');
    }

    enableNextButton();
};


// The timer and its implementation
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
// To display results
function displayResults() {
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = `<h3>Quiz Completed!</h3>
        <p>Correct Answers: ${correctCount}</p>
        <p>Wrong Answers: ${wrongCount}</p>
        <p>Incomplete Answers: ${incompleteCount}</p>`;
}
// Starting the quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    incompleteCount = 0;
    selectedQuestions = selectRandomQuestions([...quizQuestions], 10);
    initializeTimerAndButtons();
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
    // Restart quiz function
    function restartQuiz() {
        currentQuestionIndex = 0;
        correctCount = 0;
        wrongCount = 0;
        incompleteCount = 0;
        selectedQuestions = selectRandomQuestions([...quizQuestions], 10);
        displayCurrentQuestion();
        document.getElementById('quizForm').classList.remove('hidden');
        document.getElementById('startQuiz').style.display = 'none';
    }
    //Update progress quiz
    
    
});
function updateProgress() {
    const progressElement = document.getElementById('quizProgress');
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`;
}