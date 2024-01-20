
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
  document.getElementById('searchButton').addEventListener('click', function() {
    var questionId = document.getElementById('searchQuestionId').value;
    fetch(`../php/fetch_single_question.php?questionId=${questionId}`) 
        .then(response => response.json())
        .then(question => {
            // Populate the questionContainer with question details
            var questionContainer = document.getElementById('questionContainer');
            questionContainer.innerHTML = `
            <div class="questionId"><b><u>ID:</b></u> ${question.id}</div>
            <div class="question"><b><u>Question:</b></u><br><br> ${question.question}</div>
            <div class="questionOptions"><b><u>Options:</b></u><br><br>1. ${question.option1}<br> 2. ${question.option2} <br>3. ${question.option3} <br>4. ${question.option4}</div>
            <div class="questionAnswer"><b><u>Correct answer:</b></u><br><br> ${question.correct_answer}</div>
            <div class="questionExplanation"><b><u>Explanation:</b></u><br><br>  ${question.explanation}</div>
        `;
        document.getElementById('updateId').value = question.id;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('updateQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    fetch('../php/update_question.php', { // PHP script to update question
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // Optionally, clear the form and hide it after update
    })
    .catch(error => console.error('Error:', error));
});
document.getElementById('LogoutButton').addEventListener('click', function() {
  window.location.href = '../php/logout.php'; 
});