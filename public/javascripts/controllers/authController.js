document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const openLoginBtn = document.getElementById('openLoginModal');
    const authLink = document.getElementById('authLink');
    const reservationsLinkHeader = document.getElementById('reservationsLinkHeader');
    const reservationsLinkFooter = document.getElementById('reservationsLinkFooter');
  
    // Function to update UI based on auth state
    function updateUIForAuth() {
      const token = localStorage.getItem('authToken');
      const authText = document.getElementById('authText'); // Login/Logout text

      if (token) {
        // User is logged in
        authText.textContent = 'Logout';
        authLink.removeEventListener('click', openLoginModalHandler);
        authLink.addEventListener('click', logoutHandler);
  
        // Show reservations link
        reservationsLinkHeader.style.display = 'inline-block';
        reservationsLinkFooter.style.display = 'inline-block';
      } else {
        // User is logged out
        authText.textContent = 'Login';
        authLink.removeEventListener('click', logoutHandler);
        authLink.addEventListener('click', openLoginModalHandler);
  
        // Hide reservations link
        reservationsLinkHeader.style.display = 'none';
        reservationsLinkFooter.style.display = 'none';
      }
    }
  
    function openLoginModalHandler(e) {
      e.preventDefault();
      signupModal.style.display = 'none';
      loginModal.style.display = 'flex';
    }
  
    function logoutHandler(e) {
      e.preventDefault();
      // Remove token and update UI
      localStorage.removeItem('authToken');
      updateUIForAuth();
    }
  
    // Set initial UI state on page load
    updateUIForAuth();
    
    // If you still have a separate openLoginBtn (not needed if using authLink)
    if (openLoginBtn) {
      openLoginBtn.addEventListener('click', openLoginModalHandler);
    }
  
    // Sign up and other modals logic
    const openSignupBtn = document.getElementById('openSignupModal');
    const openLoginFromSignupBtn = document.getElementById('openLoginFromSignupModal');
  
    if (openSignupBtn) {
      openSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
      });
    }
  
    if (openLoginFromSignupBtn) {
      openLoginFromSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
      });
    }
  
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, password })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Store token, update UI
          localStorage.setItem('authToken', result.token);
          loginModal.style.display = 'none';
          updateUIForAuth();
        } else {
          alert(result.message || 'Login failed.');
        }
      });
    }
  
    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = signupForm.name.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const passwordConfirm = signupForm.passwordConfirm.value;
        
        if (password !== passwordConfirm) {
          alert('Passwords do not match');
          return;
        }
  
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const result = await response.json();
        if (response.ok) {
          // After successful signup, open login modal
          signupModal.style.display = 'none';
          loginModal.style.display = 'flex';
        } else {
          alert(result.message || 'Sign up failed.');
        }
      });
    }
  
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
      });
    });
  
    // Close the modal if user clicks outside modal-content
    window.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
      }
      if (e.target === signupModal) {
        signupModal.style.display = 'none';
      }
    });
  
  });
  