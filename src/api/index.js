const createHeader = (body) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const devMode = process.env.devMode === 'production' || true;
const baseUrl = devMode ? 'http://localhost:4170' : 'http://80.87.201.216:4170';

const getResourse = async (url, body) => {
    const response = await fetch(`${baseUrl}${url}`, body && createHeader(body));

    if (!response.ok) {
        throw response.status;
    }

    return response.json();
};

/* user */
export const getUser = user => getResourse('/user', user);

export const createUser = (name, login, password1, password2) =>
    getResourse('/user/create', { name, login, password1, password2 });

/* messages */
export const getMessages = (chatId) => getResourse('/messages/get', { chatId });

export const sendMessage = async (userId, chatId, message) => {
    const messages = await getResourse('/messages/send', ({ userId, chatId, message }));

    return messages;
};

export const deleteMessage = messageId => getResourse('/messages/delete',{ messageId });

export const editMessage = (messageId, content) => getResourse('/messages/edit', { messageId, content });

/* chat */

export const createChat = (name, login) => getResourse('/chat/create', { name, login });

export const deleteChat = (chatId) => getResourse('/chat/delete', { chatId });

export const addUserToChat = (login, chatId) => getResourse('/chat/user/add', { login, chatId });

export const deleteUserFromChat = (login, chatId) => getResourse('/chat/user/delete', { login, chatId });

window.createChat = createChat;
window.addUserToChat = addUserToChat;
window.deleteUserFromChat = deleteUserFromChat;
window.createUser = createUser;
window.deleteChat = deleteChat;
window.editMessage = editMessage;
