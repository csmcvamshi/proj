// Toggle between the Login form and the Sign-Up form
function toggleForms() {
    const signupBox = document.getElementById('signup-box');
    const loginForm = document.getElementById('login-form');
    
    // If the signup box is hidden, show it and hide the login form text
    if (signupBox.style.display === 'none' || signupBox.style.display === '') {
      signupBox.style.display = 'block';
      loginForm.parentElement.style.display = 'none';
    } else {
      signupBox.style.display = 'none';
      loginForm.parentElement.style.display = 'block';
    }
  }
  
  // Example placeholders for your actual logic:
  function handleGoogleLogin(response) {
    console.log('Google login callback:', response);
  }
  