// script.js
  function shrinkVideo() {
    // Get the container
    var container = document.getElementById('videoContainer');
    var welcomeText = document.getElementById('welcomeText');
    // Add the 'small' class to the container
    container.classList.add('small');
    welcomeText.style.display = 'none';
    // Redirect or perform other actions after a slight delay
    setTimeout(function(){
        window.location.href = './quiz/page/HomePage.php'; 
    }, 2000); // delay time in milliseconds
}

  // menu button toggle
  var menuButton = document.getElementById('menuButton');
  if (menuButton) {
    menuButton.addEventListener('click', function() {
      var navList = document.querySelector('nav ul');
      if (navList.style.display === 'block') {
        navList.style.display = 'none';
      } else {
        navList.style.display = 'block';
      }
    });
  }
  
  // Resize event listener
  var navList = document.getElementById('navList');
  window.addEventListener('resize', function() {
    if (navList) {
      if (window.innerWidth > 600) {
        navList.style.display = 'block'; // Ensure it's visible on larger screens
      } else {
        navList.style.display = 'none'; // Hide on smaller screens
      }
    }
  });

 var showRegisterForm = document.getElementById('showRegisterForm');
  if(showRegisterForm){
    showRegisterForm.addEventListener('click', function(){
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    
    // Toggle the display of forms
    if (registerForm.style.display === 'none') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
  }
    )};
  


function checkPasswords() {
  var password = document.getElementById('newPassword').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  // Check if passwords match
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false; // Prevent form submission
  }
  return true; // Allow form submission
}
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');

    if (error) {
      switch (error) {
          case 'username_exists':
              loginForm.style.display = 'none';
              registerForm.style.display = 'block';
              alert('Username already exists.');
              break;
          case 'email_exists':
              loginForm.style.display = 'none';
              registerForm.style.display = 'block';
              alert('Email already exists.');
              break;
          case 'invalid_username':
              alert('Invalid username.');
              break;
          case 'invalid_password':
              alert('Invalid Password.');
              break;
          case 'registration_complete':
              alert('Registration Complete! Please Login.');
              break;
          default:
              console.log('Unknown error.');
              break;
      }
  }
};

function togglePasswordVisibility(inputId, toggleIcon) {
  var passwordInput = document.getElementById(inputId);
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.textContent = '🔒'; 
  } else {
      passwordInput.type = 'password';
      toggleIcon.textContent = '🔓'; 
  }
}

// quiz_questions hadling
if (window.location.pathname.includes('quiz.php')) {
// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // fetch questions from database
  fetch('../php/fetch_questions.php')
    .then(response => response.json())
    .then(questions => {
  // Get references to HTML elements
  const startQuizBtn = document.getElementById('startQuizBtn');
  const startFlashQuizBtn = document.getElementById('startFlashQuizBtn');
  const timer = document.getElementById('timer');
  const closeButton = document.querySelector('.close');
  const restartQuizBtn = document.getElementById('restartQuizBtn');
  const modalText = document.getElementById('modalText');
  const customModal = document.getElementById('customModal');

  // Initialize variables to manage quiz state
  let currentQuestionIndex = 0;
  let timerInterval;
  let isFlashQuiz = false;
  let correctAnswersCount = 0;
  let startTime;
  let wrongAnswersCount=0;
  // Function to shuffle an array randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to display the next quiz question
  function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const questionProgress = `${currentQuestionIndex + 1}/${questions.length}: `;
      document.getElementById('questionText').textContent = questionProgress + question.question;
      const optionsContainer = document.getElementById('optionsContainer');
      optionsContainer.innerHTML = '';
      question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = function () { checkAnswer(option, question.answer, question.explanation); };
        optionsContainer.appendChild(button);
      });
      currentQuestionIndex++;
    } 
  }

  // Function to check if the selected answer is correct
  function checkAnswer(selectedOption, correctAnswer, explanation) {
    if (selectedOption === correctAnswer) {
      correctAnswersCount++;
      if (!isFlashQuiz) {
        showModal(`Correct!\n\n ${explanation} `, false);
      }
    } else {
      if (!isFlashQuiz) {
        showModal(`Wrong answer!\n\nThe correct answer is: ${correctAnswer}\n\n${explanation}`, false);
      }else {
        wrongAnswersCount++; // Increment wrong answers count for flash quiz
        if (wrongAnswersCount > 10) {
          showModal(`Too many wrong answers! Try again`, true);
          return; // End the function here to avoid displaying the next question
        }
      }
    }
    if (currentQuestionIndex < questions.length) {
    displayNextQuestion();
    }else {
      endQuiz();
    }
  }

  // Function to start a regular quiz
  function startQuiz() {
    isFlashQuiz = false;
    shuffleArray(questions);
    currentQuestionIndex = 0;
    timer.style.visibility = 'hidden';
    displayNextQuestion();
    hideQuizButtons();
  }

  // Function to start a flash quiz
  function startFlashQuiz() {
    isFlashQuiz = true;
    shuffleArray(questions);
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    startTime = Date.now();
    startTimer();
    timer.style.visibility = 'visible';
    displayNextQuestion();
    hideQuizButtons();
  }

  // Function to hide quiz buttons
  function hideQuizButtons() {
    startQuizBtn.style.display = 'none';
    startFlashQuizBtn.style.display = 'none';
  }

  // Function to end the quiz and display results
  function endQuiz() {
    let baseMessage;
    if (isFlashQuiz) {
      stopTimer();
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      baseMessage = `Flash quiz completed! Time: ${timeTaken} seconds\nCorrect answers: ${correctAnswersCount} out of ${questions.length}`;
      sendResultsToServer('flash_quiz', correctAnswersCount, questions.length, timeTaken);
    } else {
      baseMessage = `You've completed the quiz!\nCorrect answers: ${correctAnswersCount} out of ${questions.length}`;
      sendResultsToServer('regular_quiz', correctAnswersCount, questions.length);
    }
    let finalMessage = baseMessage;
    if (loggedInUsername) {
      finalMessage = `\n\nWell done ${loggedInUsername}, ${baseMessage}\nGo to Top Scores to see your score.`;
    } else {
      finalMessage += `\n\nLogin or Register to record your score!`;
    }

    showModal(finalMessage, true);

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
  }

  // Function to send quiz results to the server
  function sendResultsToServer(quizType, correctCount, totalQuestions, timeTaken = null) {
    fetch('../php/save_quiz_results.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizType: quizType,
        correctAnswers: correctCount,
        totalQuestions: totalQuestions,
        timeTaken: timeTaken
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error sending quiz results:', error));
  }

  // Function to start the timer
  function startTimer() {
    const startTime = Date.now();
    timerInterval = setInterval(function () {
      const elapsedTime = Date.now() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      timer.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  // Function to stop the timer
  function stopTimer() {
    clearInterval(timerInterval);
    timer.textContent = "Time: 00:00";
    timer.style.visibility = 'hidden';
  }

  // Function to display a modal with a message
  function showModal(message, showRestartButton = false) {
    modalText.innerText = message;
    customModal.style.display = "block";
    restartQuizBtn.style.display = showRestartButton ? "block" : "none";
  }

  // Add event listeners for quiz buttons
  startQuizBtn.addEventListener('click', startQuiz);
  startFlashQuizBtn.addEventListener('click', startFlashQuiz);
  timer.style.visibility = 'hidden';

  // Add event listener for closing the modal
  closeButton.onclick = function () {
    customModal.style.display = "none";
  };

  // Add event listener for restarting the quiz
  restartQuizBtn.addEventListener('click', function () {
    window.location.reload();
  });
})
.catch(error => {
  console.error('Error fetching questions:', error);
});
});
}