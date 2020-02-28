/* user */
const getUserByLogin = login => `SELECT 
    users.name,
    users.login,
    users.password,
    users.user_id as userId
FROM users WHERE login='${login}'`;

const getUserById = userId => `SELECT 
    users.name,
    users.login,
    users.password,
    users.user_id as userId
FROM users WHERE login='${userId}'`;

/* messages */
const sendMessage = (userId, chatId, message) => `
    INSERT INTO messages(chat_id, user_id, content, date_create) 
    VALUES('${chatId}', '${userId}', '${message}', '${Date.now()}');
`;
const getMessages = (chatId) => `SELECT
    message_id AS messageId, user_id as userId, content, date_create as dateCreate    
    FROM messages WHERE  messages.chat_id = '${chatId}'`;

const deleteMessage = (messageId) => `DELETE from messages WHERE message_id = ${messageId}`;

/* chat */

const getChats = (userId) => `SELECT chat.chat_id as chatId, chat.name FROM \`party\` JOIN \`chat\` 
    ON chat.chat_id = party.chat_id AND party.user_id = ${userId};`;

/* party */

const getUsersByChatId = (chatId) => `SELECT *
from party JOIN users ON party.user_id = users.user_id AND party.chat_id = '${chatId}'`;

module.exports = {
    getUserByLogin,
    getUserById,
    sendMessage,
    deleteMessage,
    getMessages,
    getChats,
    getUsersByChatId,
};

