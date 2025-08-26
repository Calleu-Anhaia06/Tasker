// meta.js

// Seleciona os elementos HTML
const botao = document.getElementById('meuBotao');
const campo = document.getElementById('campo');
const scoreValueEl = document.getElementById('score-value');
const taskContainer = document.getElementById('task-container');

const progressBar = document.querySelector('.progress-bar');
const scoreEl = document.getElementById('score');
const limitEl = document.getElementById('limit');
const levelEl = document.getElementById('level');

const userDisplayLabel = document.getElementById('user-display');
const dailyScoreEl = document.getElementById('daily-score');
const headerTaskoinsValueEl = document.getElementById('daily-score');
const delCont = document.getElementById('delcont');

delCont.addEventListener('click', () => {
    // Confirmação
    if(window.location.href.includes('index.html')){
        const confirmDelete = confirm('Tem certeza de que deseja sair de sua conta?');
        if (confirmDelete) {
        // Remove os dados do localStorage
        localStorage.removeItem(`taskerState_${currentUser}`);
        localStorage.removeItem('currentUser');
        
        // Alerta e recarrega a página para o estado inicial
        alert('Sua conta foi removida com sucesso!');
        window.location.reload();
    }
}
    if(window.location.href.includes('metaB.html')){
        const confirmDelete = confirm('Tem certeza de que deseja sair de sua conta?');
        if (confirmDelete) {
        // Remove os dados do localStorage
        localStorage.removeItem(`taskerState_${currentUser}`);
        localStorage.removeItem('currentUser');
        
        // Alerta e recarrega a página para o estado inicial
        alert('Sua conta foi removida com sucesso!');
        window.location.reload();
    }
}
    if(window.location.href.includes('metain.html')){
        const confirmDelete = confirm('Are you sure you want to log out of your account?');
        if (confirmDelete) {
        // Remove os dados do localStorage
        localStorage.removeItem(`taskerState_${currentUser}`);
        localStorage.removeItem('currentUser');
        
        // Alerta e recarrega a página para o estado inicial
        alert('Your account ha been successfully removed!');
        window.location.reload();
    }
}
    if(window.location.href.includes('metainB.html')){
        const confirmDelete = confirm('Are you sure you want to log out of your account?');
        if (confirmDelete) {
        // Remove os dados do localStorage
        localStorage.removeItem(`taskerState_${currentUser}`);
        localStorage.removeItem('currentUser');
        
        // Alerta e recarrega a página para o estado inicial
        alert('Your account ha been successfully removed!');
        window.location.reload();
    }
}
});


let currentUser = localStorage.getItem('currentUser');
userDisplayLabel.textContent = `User: ${currentUser}`;

// Variáveis de estado
let score = 0;
let limit = 100;
let level = 1;
let tasks = []; // Array para armazenar as tarefas
let infiniteScore = 0;
let taskoins = 0; // Nova variável para as moedas
let lastCoinCollectionDate = null; // Para rastrear a última vez que as moedas foram coletadas

// --- Funções de Salvar e Carregar ---

// Função para salvar o estado atual no localStorage do usuário
function saveState() {
    // Adiciona uma verificação para garantir que há um usuário logado.
    // Se não houver, a função termina aqui.
    if (!currentUser || currentUser.trim() === '') {
        return; 
    }

    const userState = {
        score: score,
        limit: limit,
        level: level,
        tasks: tasks,
        infiniteScore: infiniteScore,
        taskoins: taskoins, 
        lastCoinCollectionDate: lastCoinCollectionDate ? lastCoinCollectionDate.toISOString() : null
    };
    localStorage.setItem(`taskerState_${currentUser}`, JSON.stringify(userState));
}

function updateLojaTaskoins() {
    const dailyScoreEl = document.getElementById('daily-score');
    if (dailyScoreEl) {
        dailyScoreEl.textContent = taskoins;
    }
}

// Função para carregar o estado salvo do localStorage do usuário
function loadState() {
    const savedState = localStorage.getItem(`taskerState_${currentUser}`);
    if (savedState) {
        const state = JSON.parse(savedState);
        score = state.score;
        limit = state.limit;
        level = state.level;
        tasks = state.tasks;
        infiniteScore = state.infiniteScore || 0;
        taskoins = state.taskoins || 0; // Carrega o valor de moedas
        updateLojaTaskoins();
        lastCoinCollectionDate = state.lastCoinCollectionDate ? new Date(state.lastCoinCollectionDate) : null;
        
        // Re-cria as tarefas na tela
        tasks.forEach(task => {
            createTaskElement(task.text, task.id, task.checked);
        });
        
        updateProgress();
    } else {
        // Se não houver estado salvo para o usuário, inicializa com valores padrão
        score = 0;
        limit = 100;
        level = 1;
        tasks = [];
        infiniteScore = 0;
        taskoins = 0;
        lastCoinCollectionDate = null;
        updateProgress();
        updateLojaTaskoins();
    }
}

// --- Funções de Lógica da Aplicação ---

const infiniteScoreValueEl = document.getElementById('infinite-score-value');

function updateProgress() {
    const progressPercentage = (score / limit) * 100;
    progressBar.style.width = Math.min(progressPercentage, 100) + '%';
    
    scoreValueEl.textContent = score;
    scoreEl.textContent = score;
    limitEl.textContent = limit;
    levelEl.textContent = level;
    infiniteScoreValueEl.textContent = infiniteScore;
    dailyScoreEl.textContent = taskoins; // Atualiza a exibição de Taskoins

    if (progressPercentage >= 100) {
        progressBar.style.backgroundColor = '#4caf50';
    } else {
        progressBar.style.backgroundColor = '#4caf50';
    }

    saveState();
}

// Função para excluir uma tarefa
function deleteTask(taskId) {
    // Remove a tarefa do array de tasks
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Remove os elementos HTML correspondentes da página
    const taskElements = document.querySelectorAll(`[data-task-id="${taskId}"]`);
    taskElements.forEach(element => element.remove());
    
    saveState(); // Salva o estado atualizado
}

// Adiciona um listener global para fechar menus
document.addEventListener('click', (event) => {
    // Fecha todos os menus abertos, a menos que o clique seja dentro de um menu
    const openMenus = document.querySelectorAll('.task-menu.open');
    openMenus.forEach(menu => {
        if (!menu.contains(event.target)) {
            menu.classList.remove('open');
        }
    });
});

function createTaskElement(text, id, isChecked = false) {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-item-wrapper';
    taskWrapper.setAttribute('data-task-id', id);

    const novoCheckbox = document.createElement('input');
    novoCheckbox.type = 'checkbox';
    novoCheckbox.id = id;
    novoCheckbox.name = 'task';
    novoCheckbox.checked = isChecked;

    novoCheckbox.addEventListener('change', () => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].checked = novoCheckbox.checked;

            if (novoCheckbox.checked) {
                score += 10;
                infiniteScore += 10;
                if (score >= limit) {
                    score = 0;
                    limit += 100;
                    level++;
                }
            } else {
                if (score > 0) {
                    score -= 10;
                    infiniteScore -= 10;
                }
            }
            updateProgress();
        }
    });

    const novoLabel = document.createElement('label');
    novoLabel.setAttribute('for', id);
    novoLabel.textContent = text;
    novoLabel.classList.add('task-label');

    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.textContent = '...';
    
    // Adiciona o menu
    const menu = document.createElement('div');
    menu.className = 'task-menu';
    menu.setAttribute('data-task-id', id);

    // Cria o botão com a imagem de lixeira
    const deleteOption = document.createElement('button');
    deleteOption.className = 'delete-option';
    
    // Cria o elemento de imagem
    const trashIcon = document.createElement('img');
    trashIcon.src = 'trash.png';
    trashIcon.alt = 'Apagar Tarefa';
    trashIcon.className = 'trash-icon'; // Adiciona uma classe para estilização

    deleteOption.appendChild(trashIcon);
    
    deleteOption.addEventListener('click', () => {
        deleteTask(id);
    });
    
    menu.appendChild(deleteOption);

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Previne que o clique feche o menu imediatamente
        // Fecha outros menus abertos antes de abrir este
        document.querySelectorAll('.task-menu.open').forEach(m => m.classList.remove('open'));
        menu.classList.toggle('open');
    });

    // Insere os novos elementos no container
    taskWrapper.appendChild(novoCheckbox);
    taskWrapper.appendChild(novoLabel);
    taskWrapper.appendChild(menuButton);
    taskWrapper.appendChild(menu);

    taskContainer.appendChild(taskWrapper);
}

// --- Lógica de Inicialização e Recompensas Diárias ---

function calculateDailyTaskoins() {
    const completedTasksToday = tasks.filter(task => task.checked);
    const dailyReward = completedTasksToday.length; // 10 Taskoins por tarefa concluída
    
    if (dailyReward > 0) {
        taskoins += dailyReward;
    }
}

function resetCheckboxesAndCollectCoins() {
    const now = new Date();
    const today = now.toLocaleDateString();

    if (!lastCoinCollectionDate || lastCoinCollectionDate.toLocaleDateString() !== now) {
        // Se a data de hoje for diferente da última data de coleta, é um novo dia.
        calculateDailyTaskoins(); // Adiciona as moedas
        lastCoinCollectionDate = now; // Atualiza a data da última coleta

        // Reinicia os checkboxes e scores diários
        tasks.forEach(task => {
            task.checked = false;
        });


        // Re-renderiza as tarefas na tela
        taskContainer.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task.text, task.id, task.checked);
        });
        
        updateProgress();
        saveState(); // Salva o novo estado
    }
}

// --- Event Listeners ---

// Carrega o estado ao iniciar a página
    loadState();
    setInterval(resetCheckboxesAndCollectCoins, 1000);

botao.addEventListener('click', () => {
    const textoDigitado = campo.value.trim();

    if (textoDigitado !== '') {
        const newId = `opcao${Date.now()}`;
        
        const newTask = {
            id: newId,
            text: textoDigitado,
            checked: false
        };
        tasks.push(newTask);
        
        createTaskElement(newTask.text, newTask.id, newTask.checked);

        campo.value = '';
        saveState();
    } else {
        // Redireciona para o login se não houver usuário
        window.location.href = 'cadastro.html';
    }
});

botao.addEventListener('click', () => {
    // Adicione esta verificação
    if (currentUser && currentUser.trim() !== '') {
        const textoDigitado = campo.value.trim();

        if (textoDigitado !== '') {
            const newId = `opcao${Date.now()}`;
            
            const newTask = {
                id: newId,
                text: textoDigitado,
                checked: false
            };
            tasks.push(newTask);
            
            createTaskElement(newTask.text, newTask.id, newTask.checked);

            campo.value = '';
            saveState();
        }
    } else {
        if(window.location.href.includes('index.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para criar tarefas.');
        window.location.href = 'cadastro.html';
        }
        if(window.location.href.includes('metain.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to create tasks.');
        window.location.href = 'cadastroin.html';
        }
        if(window.location.href.includes('metainB.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to create tasks.');
        window.location.href = 'cadastroinB.html';
        }
        if(window.location.href.includes('metaB.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para criar tarefas.');
        window.location.href = 'cadastroB.html';
        }
    }
});

campo.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        const textoDigitado = campo.value.trim();

    if (textoDigitado !== '') {
        const newId = `opcao${Date.now()}`;
        
        const newTask = {
            id: newId,
            text: textoDigitado,
            checked: false
        };
        tasks.push(newTask);
        
        createTaskElement(newTask.text, newTask.id, newTask.checked);

        campo.value = '';
        saveState();
    }
    }
});

campo.addEventListener('keydown', function(event){
    // Adicione esta verificação
    if(event.key === 'Enter'){
    if (currentUser && currentUser.trim() !== '') {
        const textoDigitado = campo.value.trim();

        if (textoDigitado !== '') {
            const newId = `opcao${Date.now()}`;
            
            const newTask = {
                id: newId,
                text: textoDigitado,
                checked: false
            };
            tasks.push(newTask);
            
            createTaskElement(newTask.text, newTask.id, newTask.checked);

            campo.value = '';
            saveState();
        }
    } else {
        // Redireciona para o login se não houver usuário
        if(window.location.href.includes('index.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para criar tarefas.');
        window.location.href = 'cadastro.html';
        }
        if(window.location.href.includes('metain.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to create tasks.');
        window.location.href = 'cadastroin.html';
        }
        if(window.location.href.includes('metainB.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to create tasks.');
        window.location.href = 'cadastroinB.html';
        }
        if(window.location.href.includes('metaB.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para criar tarefas.');
        window.location.href = 'cadastroB.html';
        }
    }
}
});

gastarBtn.addEventListener('click', () => {
    const custo = parseInt(quantidade.textContent); // Obtém o custo da label 'pdt1'

        taskoins -= custo;
        updateLojaTaskoins();
        saveState();
});

