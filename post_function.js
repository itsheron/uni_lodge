// Initialize on page load
window.addEventListener('load', function() {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html?redirect=post.html';
        return;
    }
    
    // Set current user's name from localStorage
    const userName = localStorage.getItem('userName');
    if (userName) {
        // Update the button text with the username
        document.getElementById('userName').innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        
        // Also pre-fill the contact name in the form
        const contactNameField = document.getElementById('contactName');
        if (contactNameField) {
            contactNameField.value = userName;
        }
    }
    
    // Set today's date as minimum for availability date
    const availableFromField = document.getElementById('availableFrom');
    if (availableFromField) {
        const today = new Date().toISOString().split('T')[0];
        availableFromField.min = today;
        
        // Set default date to one month from today
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        availableFromField.value = oneMonthFromNow.toISOString().split('T')[0];
    }
    
    // Init photo upload
    initPhotoUpload();
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
    document.getElementById('logoutModal').style.display = 'block';
}

// Close logout confirmation modal
function closeLogoutModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    closeLogoutModal();
    window.location.href = 'main.html';
}

// Form submission
document.getElementById('listingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real app, you would send the form data to your server here
    // For demo purposes, we'll just show an alert
    alert('Your listing has been submitted for review!');
    window.location.href = 'dashboard.html';
});

// Save as draft functionality
function saveAsDraft() {
    alert('Listing saved as draft!');
}

// Photo upload functionality
function initPhotoUpload() {
    const photoUploadBox = document.getElementById('photoUploadBox');
    if (!photoUploadBox) return;
    
    const photoUpload = document.getElementById('photoUpload');
    const photoGrid = document.getElementById('photoGrid');
    
    photoUploadBox.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    photoUploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUploadBox.classList.add('dragover');
    });
    
    photoUploadBox.addEventListener('dragleave', function() {
        photoUploadBox.classList.remove('dragover');
    });
    
    photoUploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        photoUploadBox.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    function handleFiles(files) {
        if (!files || !files.length) return;
        
        for (let i = 0; i < files.length; i++) {
            if (photoGrid.querySelectorAll('.photo-preview').length >= 10) {
                alert('Maximum 10 photos allowed.');
                break;
            }
            
            const file = files[i];
            
            // Validate file is an image
            if (!file.type.match('image.*')) {
                continue;
            }
            
            const reader = new FileReader();
            
            reader.onload = (function(file) {
                return function(e) {
                    const photoPreview = document.createElement('div');
                    photoPreview.className = 'photo-preview';
                    photoPreview.innerHTML = `
                        <img src="${e.target.result}" alt="Property photo">
                        <button type="button" class="remove-photo" onclick="removePhoto(this)">×</button>
                        <div class="photo-caption">
                            <input type="text" placeholder="Add caption (optional)">
                        </div>
                    `;
                    
                    photoGrid.insertBefore(photoPreview, photoUploadBox);
                };
            })(file);
            
            reader.readAsDataURL(file);
        }
    }
}

// Remove photo functionality
function removePhoto(button) {
    const photoPreview = button.parentElement;
    photoPreview.remove();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const logoutModal = document.getElementById('logoutModal');
    if (event.target == logoutModal) {
        logoutModal.style.display = "none";
    }
}