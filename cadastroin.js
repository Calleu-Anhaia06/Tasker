// Seleciona os elementos HTML
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
    alert(`Welcome back, ${currentUser}! Redirecting to the main page.`);
    window.location.href = 'metain.html';
}

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const formTitle = document.getElementById('form-title');

// Estado do formulário
let isLoginFormActive = true;

// Adiciona listener para alternar entre login e cadastro
toggleFormBtn.addEventListener('click', () => {
    if (isLoginFormActive) {
        loginForm.classList.remove('form-active');
        loginForm.classList.add('form-hidden');
        registerForm.classList.remove('form-hidden');
        registerForm.classList.add('form-active');
        formTitle.textContent = 'User registration';
        toggleFormBtn.textContent = 'Already have an account? Login';
    } else {
        loginForm.classList.remove('form-hidden');
        loginForm.classList.add('form-active');
        registerForm.classList.remove('form-active');
        registerForm.classList.add('form-hidden');
        formTitle.textContent = 'User login';
        toggleFormBtn.textContent = 'Dont have an account? Sign up';
    }
    isLoginFormActive = !isLoginFormActive;
});

// Lógica para o Cadastro de Usuário
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Obtém os usuários existentes ou inicializa um objeto vazio
    const users = JSON.parse(localStorage.getItem('taskerUsers')) || {};

    // Validação
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    if (users[username]) {
        alert('This username alredy exists!');
        return;
    }

    // Cria o novo usuário
    users[username] = { password: password };
    localStorage.setItem('taskerUsers', JSON.stringify(users));

    alert('Registration successful! Login.');

    // Alterna para a tela de login
    loginForm.classList.remove('form-hidden');
    loginForm.classList.add('form-active');
    registerForm.classList.remove('form-active');
    registerForm.classList.add('form-hidden');
    formTitle.textContent = 'User Login';
    toggleFormBtn.textContent = 'Dont have an account? Sign up';
    isLoginFormActive = true;
});

// Lógica para o Login de Usuário
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('taskerUsers')) || {};
    const user = users[username];

    if (user && user.password === password) {
        // Salva o usuário logado no localStorage
        localStorage.setItem('currentUser', username);
        alert('Successful login!');
        // Redireciona para a página principal (meta.html)
        window.location.href = 'metain.html';
    } else {
        alert('Invalid username or password.');
    }
});