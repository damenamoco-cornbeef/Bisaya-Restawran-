// Bisaya Restawran Website - JavaScript
// IT Student Project - Simple functionality implementation

// ===== USER DATA MANAGEMENT =====
// Initialize users in localStorage if not exists
function initializeUsers() {
    if (!localStorage.getItem('bisayaUsers')) {
        const defaultUsers = [
            { username: 'customer', password: 'restawran123' },
            { username: 'admin', password: 'admin123' }
        ];
        localStorage.setItem('bisayaUsers', JSON.stringify(defaultUsers));
    }
}

// Get all users
function getAllUsers() {
    initializeUsers();
    return JSON.parse(localStorage.getItem('bisayaUsers'));
}

// Add new user
function addUser(username, password) {
    const users = getAllUsers();
    users.push({ username, password });
    localStorage.setItem('bisayaUsers', JSON.stringify(users));
}

// Check if user exists
function userExists(username) {
    return getAllUsers().find(u => u.username === username);
}

// ===== SESSION MANAGEMENT =====
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}
function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// ===== LOGIN FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }

            const users = getAllUsers();
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                setCurrentUser(username);
                updateNavigation();
                showSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                showError('Invalid username or password');
            }
        });
    }
});

// ===== REGISTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!username || !password || !confirmPassword) {
                showRegisterMessage('Please fill in all fields', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showRegisterMessage('Passwords do not match', 'error');
                return;
            }
            if (password.length < 6) {
                showRegisterMessage('Password must be at least 6 characters', 'error');
                return;
            }
            if (userExists(username)) {
                showRegisterMessage('Username already exists', 'error');
                return;
            }

            addUser(username, password);
            showRegisterMessage('Registration successful! You can now login.', 'success');
            registerForm.reset();

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});

// ===== DASHBOARD FUNCTIONALITY =====
function checkLoginStatus() {
    const currentUser = getCurrentUser();
    const welcomeUser = document.getElementById('welcomeUser');

    if (window.location.pathname.includes('index.html')) {
        if (!currentUser) {
            alert('Please login to access the dashboard');
            window.location.href = 'login.html';
        } else {
            if (welcomeUser) {
                welcomeUser.textContent = `Welcome, ${currentUser}!`;
            }
        }
    }
}

// ===== LOGOUT FUNCTIONALITY =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        updateNavigation();
        alert('You have been logged out.');
        window.location.href = 'dashboard.html';
    }
}

// ===== NAVIGATION =====
function updateNavigation() {
    const currentUser = getCurrentUser();
    const loginButton = document.querySelector('.login-btn');

    if (loginButton) {
        if (currentUser) {
            loginButton.textContent = 'Logout';
            loginButton.onclick = logout;
            loginButton.removeAttribute('href');
        } else {
            loginButton.textContent = 'Login';
            loginButton.href = 'index.html';
            loginButton.onclick = null;
        }
    }
}

// ===== MESSAGE HELPERS =====
function showError(msg) {
    const el = document.getElementById('error-message');
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
        setTimeout(() => (el.style.display = 'none'), 5000);
    }
}
function showSuccess(msg) {
    const el = document.getElementById('error-message');
    if (el) {
        el.textContent = msg;
        el.className = 'success-message';
        el.style.display = 'block';
        setTimeout(() => {
            el.style.display = 'none';
            el.className = 'error-message';
        }, 5000);
    }
}
function showRegisterMessage(msg, type) {
    const el = document.getElementById('register-message');
    if (el) {
        el.textContent = msg;
        el.className = type === 'error' ? 'error-message' : 'success-message';
        el.style.display = 'block';
        setTimeout(() => (el.style.display = 'none'), 5000);
    }
}

// ===== FORM UX =====
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#e67e22';
            this.style.boxShadow = '0 0 5px rgba(230, 126, 34, 0.3)';
        });
        input.addEventListener('blur', function () {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
});

// ===== DEMO CONSOLE INFO =====
console.log('🍽️ Bisaya Restawran Website Loaded!');
console.log('Demo Accounts:');
console.log('Username: customer | Password: restawran123');
console.log('Username: admin    | Password: admin123');
