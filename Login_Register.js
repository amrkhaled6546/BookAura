const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const loading = document.getElementById('loading');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

const registerForm = document.querySelector('.form-box.register form');
const loginForm = document.querySelector('.form-box.login form');

function showLoadingAndRedirect() {
    loading.style.display = 'flex';
    setTimeout(() => {
        window.location.href = "home.html";
    }, 2000);
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[placeholder="Username"]').value;
    const email = registerForm.querySelector('input[placeholder="Email"]').value;
    const password = registerForm.querySelector('input[placeholder="Password"]').value;

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert("✅ Registration successful! Please log in.");

    container.classList.remove('active');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[placeholder="Email"]').value;
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        const username = localStorage.getItem('username');
        localStorage.setItem('isLoggedIn', 'true');

        showLoadingAndRedirect();
    } else {
        alert("❌ Incorrect email or password. Please try again.");
    }
}); 