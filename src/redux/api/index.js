const createHeader = (body) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const devMode = process.env.devMode === 'production' || false;
const baseUrl = devMode ? 'http://localhost:4170' : 'http://80.87.201.216:4000';

const getResourse = async (url, body) => {
    const response = await fetch(`${baseUrl}${url}`, body && createHeader(body));

    if (!response.ok) {
        throw response.status;
    }

    return response.json();
};

/* user */
export const getUser = user => getResourse('/user/get', user);

export const createUser = (name, login, password1, password2) =>
    getResourse('/user/create', { name, login, password1, password2 });

/* messages */
export const getMessages = (chatId) => getResourse('/messages/get', { chatId });

export const sendMessage = (login, chatId, message) => getResourse('/messages/send', ({ login, chatId, message }));

export const deleteMessage = messageId => getResourse('/messages/delete',{ messageId });

export const editMessage = (messageId, message) => getResourse('/messages/edit', { messageId, message });

/* chat */

export const createChat = (chatName, login) => getResourse('/chat/createChat', { chatName, login });

export const deleteChat = (chatId) => getResourse('/chat/deleteChat', { chatId });

export const addUserToChat = (login, chatId) => getResourse('/chat/addUser', { login, chatId });

export const deleteUserFromChat = (login, chatId) => getResourse('/chat/deleteUser', { login, chatId });

window.createChat = createChat;
window.addUserToChat = addUserToChat;
window.deleteUserFromChat = deleteUserFromChat;
window.createUser = createUser;
window.deleteChat = deleteChat;
window.editMessage = editMessage;
