/* user */
const getUserByLogin = login => `SELECT * FROM users WHERE login='${login}'`;

/* messages */
const sendMessage = (author, message, queue) => `
    INSERT INTO messages (author, queue, text) VALUES('${author}', '${queue}', '${message}');
`;
const getMessages = () => `SELECT * FROM messages`;

module.exports = {
    getUserByLogin,
    sendMessage,
    getMessages,
};
