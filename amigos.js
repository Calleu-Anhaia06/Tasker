// amigos.js

// Seleciona os elementos HTML da página de amizades
const friendUsernameInput = document.getElementById('friend-username');
const sendRequestBtn = document.getElementById('send-request-btn');
const messageDisplay = document.getElementById('message-display');
const friendsList = document.getElementById('friends-list');
const receivedRequestsList = document.getElementById('received-requests-list');
const sentRequestsList = document.getElementById('sent-requests-list');

const currentUser2 = localStorage.getItem('currentUser');

// --- Funções de Salvar e Carregar ---

// Função para obter o estado de todos os usuários
function getAllUsersState() {
    return JSON.parse(localStorage.getItem('taskerUsersState')) || {};
}

// Função para salvar o estado de todos os usuários
function saveAllUsersState(state) {
    localStorage.setItem('taskerUsersState', JSON.stringify(state));
}

// Função para obter o estado de amizade de um usuário específico
function getFriendState(username) {
    const allStates = getAllUsersState();
    if (!allStates[username]) {
        // Se o estado não existir, inicializa-o
        allStates[username] = {
            friends: [],
            sentRequests: [],
            receivedRequests: []
        };
        saveAllUsersState(allStates);
    }
    return allStates[username];
}

// Função para salvar o estado de amizade de um usuário
function saveFriendState(username, state) {
    const allStates = getAllUsersState();
    allStates[username] = state;
    saveAllUsersState(allStates);
}

// --- Funções de Lógica da Aplicação ---

function displayMessage(message, isError = false) {
    messageDisplay.textContent = message;
    if(window.location.href.includes('amigos.html')){
    messageDisplay.style.color = isError ? 'darkred' : 'darkgreen';
    }
    if(window.location.href.includes('amigosB.html')){
    messageDisplay.style.color = isError ? 'red' : 'green';
    }
    if(window.location.href.includes('amigosin.html')){
    messageDisplay.style.color = isError ? 'darkred' : 'darkgreen';
    }
    if(window.location.href.includes('amigosinB.html')){
    messageDisplay.style.color = isError ? 'red' : 'green';
    }
}

function renderFriends() {
    friendsList.innerHTML = '';
    const userState = getFriendState(currentUser2);

    if (userState.friends.length === 0) {
        if(window.location.href.includes('amigos.html')){
        friendsList.innerHTML = 'Nenhum amigo ainda.';
        }
        if(window.location.href.includes('amigosB.html')){
        friendsList.innerHTML = 'Nenhum amigo ainda.';
        }
        if(window.location.href.includes('amigosin.html')){
        friendsList.innerHTML = 'No friends yet.';
        }
        if(window.location.href.includes('amigosinB.html')){
        friendsList.innerHTML = 'No friends yet.';
        }
    } else {
        userState.friends.forEach(friend => {
            const label = document.createElement('div');
            label.className = 'friend-item'; // Adiciona uma classe para estilização

            const nameSpan = document.createElement('span');
            nameSpan.textContent = friend;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remover';
            deleteBtn.className = 'delete-friend-btn enviarTaskR enviarTask'; // Adiciona uma classe para estilização
            deleteBtn.onclick = () => confirmAndDeleteFriend(friend);

            label.appendChild(nameSpan);
            label.appendChild(deleteBtn);
            friendsList.appendChild(label);
        });
}
}

function renderRequests() {
    receivedRequestsList.innerHTML = '';
    sentRequestsList.innerHTML = '';

    const userState = getFriendState(currentUser2);

    // Solicitações Recebidas
    if (userState.receivedRequests.length === 0) {
        if(window.location.href.includes('amigos.html')){
        receivedRequestsList.innerHTML = 'Nenhuma solicitação recebida.';
        }
        if(window.location.href.includes('amigosB.html')){
        receivedRequestsList.innerHTML = 'Nenhuma solicitação recebida.';
        }
        if(window.location.href.includes('amigosin.html')){
        receivedRequestsList.innerHTML = 'No requests received.';
        }
        if(window.location.href.includes('amigosinB.html')){
        receivedRequestsList.innerHTML = 'No requests received.';
        }
    } else {
        if(window.location.href.includes('amigos.html')){
        userState.receivedRequests.forEach(requester => {
            const div = document.createElement('div');
            div.textContent = `Pedido de: ${requester}`;
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Aceitar';
            acceptBtn.onclick = () => acceptFriendRequest(requester);
            const rejectBtn = document.createElement('button');
            rejectBtn.textContent = 'Rejeitar';
            rejectBtn.onclick = () => rejectFriendRequest(requester);
            div.appendChild(acceptBtn);
            div.appendChild(rejectBtn);
            receivedRequestsList.appendChild(div);
            acceptBtn.className = 'enviarTask enviarTaskG';
            rejectBtn.className = 'enviarTask enviarTaskR';
        });
    }
    }

    // Solicitações Enviadas
    if (userState.sentRequests.length === 0) {
        if(window.location.href.includes('amigos.html')){
        sentRequestsList.innerHTML = 'Nenhuma solicitação enviada.';
        }
        if(window.location.href.includes('amigosB.html')){
        sentRequestsList.innerHTML = 'Nenhuma solicitação enviada.';
        }
        if(window.location.href.includes('amigosin.html')){
        sentRequestsList.innerHTML = 'No request sent.';
        }
        if(window.location.href.includes('amigosinB.html')){
        sentRequestsList.innerHTML = 'No request sent.';
        }
    } else {
        userState.sentRequests.forEach(recipient => {
            const div = document.createElement('div');
            if(window.location.href.includes('amigos.html')){
            div.textContent = `Solicitação enviada para: ${recipient}`;
            }
            if(window.location.href.includes('amigosB.html')){
            div.textContent = `Solicitação enviada para: ${recipient}`;
            }
            if(window.location.href.includes('amigosin.html')){
            div.textContent = `Request sent to: ${recipient}`;
            }
            if(window.location.href.includes('amigosinB.html')){
            div.textContent = `Request sent to: ${recipient}`;
            }
            sentRequestsList.appendChild(div);
        });
    }
}

function sendFriendRequest() {
    const friendUsername = friendUsernameInput.value.trim();
    if (!friendUsername) {
        if(window.location.href.includes('amigos.html')){
        displayMessage('Por favor, digite um nome de usuário.', true);
        return;
        }
        if(window.location.href.includes('amigosB.html')){
        displayMessage('Por favor, digite um nome de usuário.', true);
        return;
        }
        if(window.location.href.includes('amigosin.html')){
        displayMessage('Please enter a username.', true);
        return;
        }
        if(window.location.href.includes('amigosinB.html')){
        displayMessage('Please enter a username.', true);
        return;
        }
    }
    if (friendUsername === currentUser2) {
        if(window.location.href.includes('amigos.html')){
        displayMessage('Você não pode enviar uma solicitação para si mesmo.', true);
        return;
        }
        if(window.location.href.includes('amigosB.html')){
        displayMessage('Você não pode enviar uma solicitação para si mesmo.', true);
        return;
        }
        if(window.location.href.includes('amigosin.html')){
        displayMessage('You cannot send a request to yourself.', true);
        return;
        }
        if(window.location.href.includes('amigosinB.html')){
        displayMessage('Você não pode enviar uma solicitação para si mesmo.', true);
        return;
        }
    }

    const allUsers = JSON.parse(localStorage.getItem('taskerUsers')) || {};
    if (!allUsers[friendUsername]) {
        if(window.location.href.includes('amigos.html')){
        displayMessage('Usuário não encontrado.', true);
        return;
        }
        if(window.location.href.includes('amigosB.html')){
        displayMessage('Usuário não encontrado.', true);
        return;
        }
        if(window.location.href.includes('amigosin.html')){
        displayMessage('User not found.', true);
        return;
        }
        if(window.location.href.includes('amigosinB.html')){
        displayMessage('User not found.', true);
        return;
        }
    }

    const senderState = getFriendState(currentUser2);
    const recipientState = getFriendState(friendUsername);
    if(window.location.href.includes('amigos.html')){
    if (senderState.friends.includes(friendUsername)) {
        displayMessage('Você já é amigo deste usuário.', true);
        return;
    }
    if (senderState.sentRequests.includes(friendUsername)) {
        displayMessage('Você já enviou uma solicitação para este usuário.', true);
        return;
    }
    if (senderState.receivedRequests.includes(friendUsername)) {
        displayMessage('Este usuário já te enviou uma solicitação. Aceite-a!', true);
        return;
    }
    }
    if(window.location.href.includes('amigosB.html')){
    if (senderState.friends.includes(friendUsername)) {
        displayMessage('Você já é amigo deste usuário.', true);
        return;
    }
    if (senderState.sentRequests.includes(friendUsername)) {
        displayMessage('Você já enviou uma solicitação para este usuário.', true);
        return;
    }
    if (senderState.receivedRequests.includes(friendUsername)) {
        displayMessage('Este usuário já te enviou uma solicitação. Aceite-a!', true);
        return;
    }
    }
    if(window.location.href.includes('amigosin.html')){
    if (senderState.friends.includes(friendUsername)) {
        displayMessage('You are already friends with this user.', true);
        return;
    }
    if (senderState.sentRequests.includes(friendUsername)) {
        displayMessage('You have already sent a request to this user.', true);
        return;
    }
    if (senderState.receivedRequests.includes(friendUsername)) {
        displayMessage('This user has already sent you a request. Accept it!', true);
        return;
    }
    }
    if(window.location.href.includes('amigosinB.html')){
    if (senderState.friends.includes(friendUsername)) {
        displayMessage('You are already friends with this user.', true);
        return;
    }
    if (senderState.sentRequests.includes(friendUsername)) {
        displayMessage('You have already sent a request to this user.', true);
        return;
    }
    if (senderState.receivedRequests.includes(friendUsername)) {
        displayMessage('This user has already sent you a request. Accept it!', true);
        return;
    }
    }

    // Adiciona a solicitação nas listas de ambos os usuários
    senderState.sentRequests.push(friendUsername);
    recipientState.receivedRequests.push(currentUser2);

    saveFriendState(currentUser2, senderState);
    saveFriendState(friendUsername, recipientState);

    if(window.location.href.includes('amigos.html')){
    displayMessage(`Solicitação enviada para ${friendUsername}.`);
    }
    if(window.location.href.includes('amigosB.html')){
    displayMessage(`Solicitação enviada para ${friendUsername}.`);
    }
    if(window.location.href.includes('amigosin.html')){
    displayMessage(`Request sent to ${friendUsername}.`);
    }
    if(window.location.href.includes('amigosinB.html')){
    displayMessage(`Request sent to ${friendUsername}.`);
    }
    friendUsernameInput.value = '';
    renderRequests();
}

function acceptFriendRequest(requesterUsername) {
    const userState = getFriendState(currentUser2);
    const requesterState = getFriendState(requesterUsername);

    // Remove a solicitação das listas de ambos
    userState.receivedRequests = userState.receivedRequests.filter(user => user !== requesterUsername);
    requesterState.sentRequests = requesterState.sentRequests.filter(user => user !== currentUser2);

    // Adiciona os usuários como amigos um do outro
    userState.friends.push(requesterUsername);
    requesterState.friends.push(currentUser2);

    saveFriendState(currentUser2, userState);
    saveFriendState(requesterUsername, requesterState);

    if(window.location.href.includes('amigos.html')){
    displayMessage(`Você e ${requesterUsername} agora são amigos!`);
    }
    if(window.location.href.includes('amigosB.html')){
    displayMessage(`Você e ${requesterUsername} agora são amigos!`);
    }
    if(window.location.href.includes('amigosin.html')){
    displayMessage(`You and ${requesterUsername} are now friends!`);
    }
    if(window.location.href.includes('amigosinB.html')){
    displayMessage(`You and ${requesterUsername} are now friends!`);
    }
    renderFriends();
    renderRequests();
}

function rejectFriendRequest(requesterUsername) {
    const userState = getFriendState(currentUser2);
    const requesterState = getFriendState(requesterUsername);

    // Remove a solicitação das listas de ambos
    userState.receivedRequests = userState.receivedRequests.filter(user => user !== requesterUsername);
    requesterState.sentRequests = requesterState.sentRequests.filter(user => user !== currentUser2);

    saveFriendState(currentUser2, userState);
    saveFriendState(requesterUsername, requesterState);
    if(window.location.href.includes('amigos.html')){
    displayMessage(`Você rejeitou a solicitação de ${requesterUsername}.`);
    }
    if(window.location.href.includes('amigosB.html')){
    displayMessage(`Você rejeitou a solicitação de ${requesterUsername}.`);
    }
    if(window.location.href.includes('amigosin.html')){
    displayMessage(`You rejected the request for ${requesterUsername}.`);
    }
    if(window.location.href.includes('amigosinB.html')){
    displayMessage(`You rejected the request for ${requesterUsername}.`);
    }
    renderRequests();
}

// Nova função para confirmar e deletar amigo
function confirmAndDeleteFriend(friendUsername) {
    if(window.location.href.includes('amigos.html')){
    const confirmation = confirm(`Tem certeza de que deseja remover ${friendUsername} de seus amigos?`);
    if (confirmation) {
        deleteFriend(friendUsername);
    }
}
    if(window.location.href.includes('amigosB.html')){
    const confirmation = confirm(`Tem certeza de que deseja remover ${friendUsername} de seus amigos?`);
    if (confirmation) {
        deleteFriend(friendUsername);
    }
}
    if(window.location.href.includes('amigosin.html')){
    const confirmation = confirm(`Are you sure you want to remove ${friendUsername} from your friends?`);
    if (confirmation) {
        deleteFriend(friendUsername);
    }
}
    if(window.location.href.includes('amigosinB.html')){
    const confirmation = confirm(`Are you sure you want to remove ${friendUsername} from your friends?`);
    if (confirmation) {
        deleteFriend(friendUsername);
    }
}
}

// Nova função para deletar amigo
function deleteFriend(friendUsername) {
    // 1. Obtém o estado de amizade de ambos os usuários
    const userState = getFriendState(currentUser2);
    const friendState = getFriendState(friendUsername);

    // 2. Remove o amigo da lista do usuário atual
    userState.friends = userState.friends.filter(friend => friend !== friendUsername);
    
    // 3. Remove o usuário atual da lista de amigos do outro usuário
    friendState.friends = friendState.friends.filter(friend => friend !== currentUser2);

    // 4. Salva os estados atualizados no localStorage
    saveFriendState(currentUser2, userState);
    saveFriendState(friendUsername, friendState);

    // 5. Exibe uma mensagem de sucesso e atualiza a interface
    if(window.location.href.includes('amigos.html')){
    displayMessage(`${friendUsername} foi removido da sua lista de amigos.`, false);
    renderFriends(); // Atualiza a lista de amigos na tela
    }
    if(window.location.href.includes('amigosB.html')){
    displayMessage(`${friendUsername} foi removido da sua lista de amigos.`, false);
    renderFriends(); // Atualiza a lista de amigos na tela
    }
    if(window.location.href.includes('amigosin.html')){
    displayMessage(`${friendUsername} has been removed from your friends list.`, false);
    renderFriends(); // Atualiza a lista de amigos na tela
    }
    if(window.location.href.includes('amigosinB.html')){
    displayMessage(`${friendUsername} has been removed from your friends list.`, false);
    renderFriends(); // Atualiza a lista de amigos na tela
    }
    return 0;
}

// --- Event Listeners ---
sendRequestBtn.addEventListener('click', sendFriendRequest);

// Carrega o estado de amizade ao carregar a página
if (currentUser2) {
    renderFriends();
    renderRequests();
} else {
    if(window.location.href.includes('amigos.html')){
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'cadastro.html';
    }
    if(window.location.href.includes('amigosB.html')){
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'cadastroB.html';
    }
    if(window.location.href.includes('amigosin.html')){
    alert('You need to be logged in to access this page.');
    window.location.href = 'cadastroin.html';
    }
    if(window.location.href.includes('amigosinB.html')){
    alert('You need to be logged in to access this page.');
    window.location.href = 'cadastroinB.html';
    }
}