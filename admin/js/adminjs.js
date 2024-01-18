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
 