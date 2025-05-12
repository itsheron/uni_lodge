 // Initialize page
 document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html?redirect=dashboard.html';
        return;
    }
    
    // Get user info from localStorage
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) {
        // Update username in welcome message
        const userNameBtn = document.getElementById('userName');
        if (userNameBtn) {
            userNameBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        }
        
        // Update settings form
        const settingsNameField = document.getElementById('settingsName');
        const settingsEmailField = document.getElementById('settingsEmail');
        
        if (settingsNameField) {
            settingsNameField.value = userName;
        }
        
        if (settingsEmailField && userEmail) {
            settingsEmailField.value = userEmail;
        }
    }
});

// User dropdown menu toggle
function toggleUserMenu() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    // If the click is outside the user menu and user button
    if (!e.target.closest('#userDropdown') && !e.target.closest('#userName')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});

// Show logout confirmation modal
function confirmLogout() {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
        logoutModal.style.display = 'block';
    }
}

// Close logout confirmation modal
function closeLogoutModal() {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
        logoutModal.style.display = 'none';
    }
}

// Handle logout with confirmation modal
function handleLogout() {
    // Clear all authentication data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Redirect to main page
    window.location.href = 'main.html';
    
    // Close the modal if it's open
    closeLogoutModal();
    
    // Prevent the default behavior of the button
    return false;
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate corresponding button
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const logoutModal = document.getElementById('logoutModal');
    if (event.target == logoutModal) {
        logoutModal.style.display = "none";
    }
};