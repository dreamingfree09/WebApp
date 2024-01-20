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
  document.getElementById('insertQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    fetch('../php/insert_question.php', { // PHP script to insert question
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        this.reset(); // Reset form after insertion
    })
    .catch(error => console.error('Error:', error));
});
document.getElementById('LogoutButton').addEventListener('click', function() {
  window.location.href = '../php/logout.php'; 
});