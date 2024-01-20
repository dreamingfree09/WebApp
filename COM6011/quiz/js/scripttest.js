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
        window.location.href = './page/HomePage.php'; 
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
document.addEventListener("DOMContentLoaded", function() {
  fetch('../php/fetch_questions.php')
    .then(response => response.json())
    .then(questions => {
      
let currentQuestionIndex = 0;
let timerInterval; // Variable to store the timer's interval ID
let isFlashQuiz = false; // To distinguish between regular and flash quizzes
let correctAnswersCount =0; // Variable to track the number of correct answers
let startTime;
// Fisher-Yates (aka Knuth) Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayNextQuestion() {
  if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const questionProgress = `${currentQuestionIndex + 1}/${questions.length}: `;
      document.getElementById('questionText').textContent = questionProgress +question.question;
      const optionsContainer = document.getElementById('optionsContainer');
      optionsContainer.innerHTML = ''; // Clear previous options
      question.options.forEach(option => {
          const button = document.createElement('button');
          button.textContent = option;
          button.onclick = function() { checkAnswer(option, question.answer,question.explanation); };
          optionsContainer.appendChild(button);
      });
      currentQuestionIndex++;
  } else {
      endQuiz();
  }
}

function checkAnswer(selectedOption, correctAnswer,explanation) {
  if (selectedOption === correctAnswer) {
      correctAnswersCount++; // Increment correct answers count
      if(!isFlashQuiz) {
        showModal(`Correct!\n\n ${explanation} `,false);
      }
  } else {
      if(!isFlashQuiz) {
       showModal(`Wrong answer!\n\nThe correct anser is: ${correctAnswer}\n\n${explanation}`,false);
      }
  }
  displayNextQuestion(); // Move on to the next question
}

function startQuiz() {
  isFlashQuiz = false; // Set the quiz type to regular
  shuffleArray(questions);
  currentQuestionIndex = 0;
  document.getElementById('timer').style.visibility = 'hidden'; // Hide timer
  displayNextQuestion();
  hideQuizButtons();
}

function startFlashQuiz() {
  isFlashQuiz = true; // Set the quiz type to flash
  shuffleArray(questions);
  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  startTime = Date.now();
  startTimer();
  document.getElementById('timer').style.visibility = 'visible'; // Show timer
  displayNextQuestion();
  hideQuizButtons();
}
function hideQuizButtons() {
  document.getElementById('startQuizBtn').style.display = 'none';
  document.getElementById('startFlashQuizBtn').style.display = 'none';
}
function endQuiz() {
  let baseMessage;
  if (isFlashQuiz) {
      stopTimer();
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      baseMessage = `Flash quiz completed! Time: ${timeTaken} seconds\nCorrect answers: ${correctAnswersCount} out of ${questions.length}`;
      // Send results to server
      sendResultsToServer('flash_quiz', correctAnswersCount, questions.length, timeTaken);
  } else {
      baseMessage = `You've completed the quiz!\nCorrect answers: ${correctAnswersCount} out of ${questions.length}`;
      // Send results to server
      sendResultsToServer('regular_quiz', correctAnswersCount, questions.length);
  }
    let finalMessage=baseMessage;
  if (loggedInUsername) {
      finalMessage = `\n\nWell done ${loggedInUsername}, ${baseMessage}\nGo to Top Scores to see your score.`;
  } else {
      finalMessage += `\n\nLogin or Register to record your score!`;
  }

  showModal(finalMessage, true);

  // Reset for next round or display results
  currentQuestionIndex = 0;
  correctAnswersCount = 0;
}
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
  }).then(response => response.json())
  .then(data => {
      console.log(data); // Handle response from the server
  })
  .catch(error => console.error('Error sending quiz results:', error));
}



function startTimer() {
  const startTime = Date.now();
  timerInterval = setInterval(function() {
      const elapsedTime = Date.now() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      document.getElementById('timer').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = "Time: 00:00";
  document.getElementById('timer').style.visibility = 'hidden'; // Hide timer after quiz
}

// Wait until the DOM is fully loaded before attaching event listeners

  var startQuizBtn = document.getElementById('startQuizBtn');
  if(startQuizBtn){
      startQuizBtn.addEventListener('click', startQuiz);
  }
  var startFlashQuizBtn = document.getElementById('startFlashQuizBtn');
  if(startFlashQuizBtn){
      startFlashQuizBtn.addEventListener('click', startFlashQuiz);
  }
  var timer= document.getElementById('timer');
  if(timer){
  timer.style.visibility = 'hidden';
  }
  function showModal(message,showRestartButton = false) {
    document.getElementById('modalText').innerText = message;
    document.getElementById('customModal').style.display = "block";
    document.getElementById('restartQuizBtn').style.display = showRestartButton ? "block" : "none";
}

var closeButton = document.querySelector('.close');
if (closeButton) { // Ensure it's not null
    closeButton.onclick = function() {
        document.getElementById('customModal').style.display = "none";
    };
} 
// Event listener for restarting the quiz
var restartQuizBtn = document.getElementById('restartQuizBtn');
if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', function() {
        window.location.reload(); // Reload the page to restart the quiz
    });
}
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
       
    });
  });
  