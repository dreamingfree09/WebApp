
  var menuButton = document.getElementById('menuButton');
  if (menuButton){
  document.getElementById('menuButton').addEventListener('click', function() {
    var navList = document.getElementById('navList');
    if (navList.style.display === 'block') {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'block';
      }
    });
  }
  function loadQuestions() {
    fetch('../php/fetch_questions.php')
        .then(response => response.json())
        .then(questions => {
            const main = document.querySelector('main');
            questions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('questionContainer');

                questionDiv.innerHTML = `
                    <div class="questionId"><b><u>ID:</b></u> ${question.id}</div>
                    <div class="question"><b><u>Question:</b></u><br><br> ${question.question}</div>
                    <div class="questionOptions"><b><u>Options:</b></u><br><br>1. ${question.option1}<br> 2. ${question.option2} <br>3. ${question.option3} <br>4. ${question.option4}</div>
                    <div class="questionAnswer"><b><u>Correct answer:</b></u><br><br> ${question.correct_answer}</div>
                    <div class="questionExplanation"><b><u>Explanation:</b></u><br><br>  ${question.explanation}</div>
                `;
                main.appendChild(questionDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadQuestions);
document.getElementById('LogoutButton').addEventListener('click', function() {
  window.location.href = '../php/logout.php'; 
});