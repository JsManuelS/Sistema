import { initializeDatabase, registerUser } from './database.js';
import { initializeLanguage, setLanguage, getTranslation } from './i18n.js';

// Initialize the database with default users if it doesn't exist
initializeDatabase();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  initializeLanguage();

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const errorMessage = document.getElementById('errorMessage');
  const registerError = document.getElementById('registerError');
  const toggleFormBtn = document.getElementById('toggleForm');
  const formTitle = document.getElementById('formTitle');
  const languageSelector = document.getElementById('languageSelector');
  
  // Language selector change handler
  languageSelector.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });

  // Toggle between login and register forms
  toggleFormBtn.addEventListener('click', () => {
    const isLoginVisible = !loginForm.classList.contains('hidden');
    
    if (isLoginVisible) {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      toggleFormBtn.textContent = getTranslation('toggle_form_login');
      formTitle.textContent = getTranslation('register_button');
    } else {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      toggleFormBtn.textContent = getTranslation('toggle_form');
      formTitle.textContent = getTranslation('signin');
    }
    
    // Clear forms and error messages
    loginForm.reset();
    registerForm.reset();
    errorMessage.classList.add('hidden');
    registerError.classList.add('hidden');
  });
  
  // Handle login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      if (user.status === 'pending') {
        errorMessage.textContent = getTranslation('pending_approval');
        errorMessage.classList.remove('hidden');
        return;
      }
      
      // Store current user info in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role
      }));
      
      // Redirect to dashboard
      window.location.href = '/dashboard.html';
    } else {
      // Show error message
      errorMessage.textContent = getTranslation('login_error');
      errorMessage.classList.remove('hidden');
      
      // Clear password field
      document.getElementById('password').value = '';
    }
  });
  
  // Handle register form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
      registerError.textContent = getTranslation('passwords_not_match');
      registerError.classList.remove('hidden');
      return;
    }
    
    try {
      // Register new user
      await registerUser({
        name,
        username,
        email,
        password
      });
      
      // Show success message and switch to login form
      alert(getTranslation('registration_success'));
      toggleFormBtn.click();
    } catch (error) {
      registerError.textContent = error.message;
      registerError.classList.remove('hidden');
    }
  });
});