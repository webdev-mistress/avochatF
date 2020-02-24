const createHeader = (body) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const devMode = true;
const baseUrl = devMode ? 'http://localhost:4170' : 'http://80.87.201.216:4170';

const getResourse = async (url, body) => {
    const response = await fetch(`${baseUrl}${url}`, body && createHeader(body));

    if (!response.ok) {
        throw response.status;
    }

    return response.json();
};

export const getUser = user => getResourse('/user', user);

export const getMessages = () => getResourse('/messages');

export const sendMessage = async (login, message) => {
    const messages = await getResourse('/messages/send', ({ login, message }));

    return messages;
};
