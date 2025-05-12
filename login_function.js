// Tab switching functionality
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    updateTabs('login');
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    updateTabs('signup');
}

function updateTabs(activeTab) {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        if ((activeTab === 'login' && tab.textContent === 'Login') ||
            (activeTab === 'signup' && tab.textContent === 'Sign Up')) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Handle login form submission
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // TODO: Implement actual authentication with your backend
    // This is a demo implementation
    if (email && password) {
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        
        alert('Login successful!');
        
        // Check if there's a redirect parameter
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        
        if (redirect === 'post-listing') {
            window.location.href = 'post-listing.html';
        } else {
            window.location.href = 'main.html';
        }
    } else {
        alert('Please enter both email and password');
    }
};

// Handle signup form submission
document.getElementById('signupForm').onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (!agreeTerms) {
        alert('You must agree to the Terms of Service');
        return;
    }
    
    // TODO: Implement actual signup with your backend
    // This is a demo implementation
    if (name && email && password) {
        // Simulate successful signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        
        alert('Account created successfully!');
        window.location.href = 'main.html';
    } else {
        alert('Please fill in all fields');
    }
};