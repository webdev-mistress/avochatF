/* user */
const getUserByLogin = login => `SELECT 
    users.name,
    users.login,
    users.password,
    users.user_id as userId
FROM users WHERE login='${login}'`;

/* messages */
const sendMessage = (author, message, queue) => `
    INSERT INTO messages (author, queue, text) VALUES('${author}', '${queue}', '${message}');
`;
const getMessages = () => `SELECT * FROM messages`;

/* chat */

const getChats = (userId) => `SELECT chat.chat_id as chatId, chat.name FROM \`party\` JOIN \`chat\` 
    ON chat.chat_id = party.chat_id AND party.user_id = ${userId};`;

module.exports = {
    getUserByLogin,
    sendMessage,
    getMessages,
    getChats,
};

