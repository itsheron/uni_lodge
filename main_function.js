 // Initialize the map
 const map = L.map('map', {
    center: [33.7756, -84.3963],
    zoom: 15,
    zoomControl: true
});

// Add OpenStreetMap tiles with a cleaner style
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Keep the map position properly set even when sidebar opens/closes
map.on('resize', function() {
    map.invalidateSize();
});

// Add campus marker
const campus = L.marker([33.7756, -84.3963]).addTo(map)
    .bindPopup('<b>Campus</b><br>Atlanta, GA')
    .openPopup();

// Sample apartment markers
const apartments = [
    { name: "Student Housing Complex", lat: 33.7756, lng: -84.3963, price: "$850", beds: "1 BR" },
    { name: "Campus View Apartments", lat: 33.7790, lng: -84.4010, price: "$1,200", beds: "2 BR" },
    { name: "University Square", lat: 33.7730, lng: -84.3950, price: "$1,450", beds: "2 BR" },
    { name: "Midtown Gardens", lat: 33.7820, lng: -84.3930, price: "$950", beds: "1 BR" }
];

// Add apartment markers to map
apartments.forEach(apt => {
    L.marker([apt.lat, apt.lng])
        .addTo(map)
        .bindPopup(`<b>${apt.name}</b><br>${apt.price} • ${apt.beds}<br><button onclick="viewDetails('${apt.name}')">View Details</button>`);
});

// Function to focus on specific map location
function focusOnMap(lat, lng) {
    map.setView([lat, lng], 16);
}

// Function to handle search
function searchListings() {
    const searchTerm = document.getElementById('searchInput').value;
    const priceRange = document.getElementById('priceRange').value;
    const bedrooms = document.getElementById('bedrooms').value;
    
    console.log('Searching for:', { searchTerm, priceRange, bedrooms });
    // Add search functionality here
}

// Function to view apartment details
function viewDetails(apartmentName) {
    alert(`Viewing details for: ${apartmentName}`);
    // This would open a modal or navigate to a details page
}

// Function to check if user is logged in before posting
function checkAuthAndPostListing() {
    // Check if user is logged in (you can implement this with your auth system)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html?redirect=post';
    } else {
        // Show the post listing modal or navigate to post listing page
        window.location.href = 'post.html';
    }
}

// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    
    // Trigger map resize after sidebar animation completes
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

// User dropdown menu toggle
function toggleUserMenu() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.matches('.auth-button') && !e.target.closest('.user-dropdown')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown.classList.contains('show')) {
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
    window.location.reload(); // Reload page to reset UI
}

// Check if user is logged in and update UI accordingly
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const authButton = document.querySelector('.auth-button');
    
    if (isLoggedIn && userName) {
        // Update button to show username with icon
        authButton.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        authButton.classList.add('logged-in');
        
        // Set onclick to toggle dropdown menu
        authButton.onclick = toggleUserMenu;
        
        // Show nav items that require authentication
        document.querySelectorAll('.main-nav li:not(:first-child)').forEach(item => {
            item.style.display = 'block';
        });
    } else {
        // Reset to login button
        authButton.innerHTML = '<i class="fas fa-user"></i> Login';
        authButton.classList.remove('logged-in');
        authButton.onclick = () => window.location.href = 'login.html';
        
        // Hide nav items that require authentication
        document.querySelectorAll('.main-nav li:not(:first-child)').forEach(item => {
            item.style.display = 'none';
        });
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const logoutModal = document.getElementById('logoutModal');
    if (event.target == logoutModal) {
        logoutModal.style.display = "none";
    }
}

// Call checkAuthStatus on page load
window.addEventListener('load', checkAuthStatus);