// Seleciona os elementos específicos da loja
const gastarBtn1 = document.getElementById('gastar-btn1');
const gastarBtn2 = document.getElementById('gastar-btn2');
const quantidade = document.getElementById('pdt1');
const dailyScoreEl2 = document.getElementById('daily-score');

// Função para carregar o estado e atualizar a interface da loja
function loadAndDisplayState() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const savedState = localStorage.getItem(`taskerState_${currentUser}`);
        if (savedState) {
            const state = JSON.parse(savedState);
            let taskoins = state.taskoins || 0;
            dailyScoreEl2.textContent = taskoins;
        }
    } else {
        // Redireciona para o login se não houver usuário
        if(window.location.href.includes('loja.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para usar a loja.');
        window.location.href = 'cadastro.html';
        }
        if(window.location.href.includes('lojain.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to use the store.');
        window.location.href = 'cadastroin.html';
        }
        if(window.location.href.includes('lojainB.html')){
        // Redireciona para o login se não houver usuário
        alert('Please, log in to use the store.');
        window.location.href = 'cadastroinB.html';
        }
        if(window.location.href.includes('lojaB.html')){
        // Redireciona para o login se não houver usuário
        alert('Por favor, faça login para usar a loja.');
        window.location.href = 'cadastroB.html';
        }
    }
}

// Adiciona o evento de clique ao botão "Gastar"
function processarGasto(custo) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Nenhum usuário logado.');
        return;
    }

    const savedState = localStorage.getItem(`taskerState_${currentUser}`);
    if (savedState) {
        const state = JSON.parse(savedState);
        let taskoins = state.taskoins || 0;
        
        if (taskoins >= custo) {
            taskoins -= custo;
            state.taskoins = taskoins;
            localStorage.setItem(`taskerState_${currentUser}`, JSON.stringify(state));
            
            dailyScoreEl.textContent = taskoins;
        }
    }
}

gastarBtn1.addEventListener('click', () => processarGasto(10));
gastarBtn2.addEventListener('click', () => processarGasto(5));

// Carrega o estado ao iniciar a página da loja
document.addEventListener('DOMContentLoaded', loadAndDisplayState);