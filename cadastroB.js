// Seleciona os elementos HTML
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
    alert(`Bem-vindo de volta, ${currentUser}! Redirecionando para a página principal.`);
    window.location.href = 'metaB.html';
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
        formTitle.textContent = 'Cadastro de Usuário';
        toggleFormBtn.textContent = 'Já tem conta? Faça login';
    } else {
        loginForm.classList.remove('form-hidden');
        loginForm.classList.add('form-active');
        registerForm.classList.remove('form-active');
        registerForm.classList.add('form-hidden');
        formTitle.textContent = 'Login de Usuário';
        toggleFormBtn.textContent = 'Não tem conta? Cadastre-se';
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
        alert('As senhas não coincidem!');
        return;
    }
    if (users[username]) {
        alert('Este nome de usuário já existe!');
        return;
    }

    // Cria o novo usuário
    users[username] = { password: password };
    localStorage.setItem('taskerUsers', JSON.stringify(users));

    alert('Cadastro realizado com sucesso! Faça seu login.');

    // Alterna para a tela de login
    loginForm.classList.remove('form-hidden');
    loginForm.classList.add('form-active');
    registerForm.classList.remove('form-active');
    registerForm.classList.add('form-hidden');
    formTitle.textContent = 'Login de Usuário';
    toggleFormBtn.textContent = 'Não tem conta? Cadastre-se';
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
        alert('Login bem-sucedido!');
        // Redireciona para a página principal (meta.html)
        window.location.href = 'metaB.html';
    } else {
        alert('Usuário ou senha inválidos.');
    }
});