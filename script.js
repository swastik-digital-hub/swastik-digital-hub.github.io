// Interactive button behavior and authentication management
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const articlesSection = document.getElementById('articles');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Check if login modal overlay exists and handle persistence
    const loginModalOverlay = document.getElementById('loginModalOverlay');
    if (loginModalOverlay) {
        const savedUser = localStorage.getItem('user_name');
        if (savedUser) {
            loginModalOverlay.style.display = 'none';
        }
    }
});

// Login form submission handler
function handleLoginSubmit(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('loginUser');
    if (usernameInput) {
        const username = usernameInput.value;
        localStorage.setItem('user_name', username);
        
        const loginModalOverlay = document.getElementById('loginModalOverlay');
        if (loginModalOverlay) {
            loginModalOverlay.style.display = 'none';
        }
    }
}

// Google login simulation
function handleGoogleLogin() {
    localStorage.setItem('user_name', 'Google User');
    const loginModalOverlay = document.getElementById('loginModalOverlay');
    if (loginModalOverlay) {
        loginModalOverlay.style.display = 'none';
    }
}

// Toggle password visibility field
function togglePasswordVisibility() {
    const passInput = document.getElementById('loginPass');
    const icon = document.querySelector('.toggle-password');
    if (passInput && icon) {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// Toggle between Login and Sign Up modes
let isLoginMode = true;
function toggleAuthMode(event) {
    event.preventDefault();
    isLoginMode = !isLoginMode;
    const headerP = document.querySelector('.login-header p');
    const submitBtn = document.querySelector('.submit-btn');
    const footerText = document.querySelector('.modal-footer');

    if (headerP && submitBtn && footerText) {
        if (!isLoginMode) {
            headerP.innerText = 'Create your Swastik Tech account';
            submitBtn.innerHTML = 'Sign Up <i class="fa-solid fa-arrow-right"></i>';
            footerText.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode(event)">Log in</a>';
        } else {
            headerP.innerText = 'Log in to Swastik Tech';
            submitBtn.innerHTML = 'Log In <i class="fa-solid fa-arrow-right"></i>';
            footerText.innerHTML = 'New to Swastik Tech ? <a href="#" onclick="toggleAuthMode(event)">Create an account</a>';
        }
    }
}
