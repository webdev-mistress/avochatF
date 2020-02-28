const { Router } = require('express');
const { getMessages, deleteMessage, sendMessage, getUsersByChatId } = require('../db/mysql');

const router = Router();

const con = require('./');

router.post('/get', (req, res) => {
    con.query(getMessages(req.body.chatId), (err, messages) => {
        con.query(getUsersByChatId(req.body.chatId), (err, users) => {
            if (err) {
                throw err;
            }
            const fullMessages = messages.map(message => {
                const user = users.find(user => user.user_id === message.userId);

                return ({
                    messageId: message.messageId,
                    content: message.content,
                    dateCreate: message.dateCreate,
                    author: {
                        userId: message.userId,
                        name: user.name,
                        login: user.login,
                    },
                });
            });

            res.json({ messages: fullMessages });
        });
    });
});

router.post('/delete', (req, res) => {
    const { messageId } = req.body;

    con.query(deleteMessage(messageId), err => {
            if (err) {
                throw err;
            }
            con.query(getMessages(), (err, messages) => {
                if (err) {
                    throw err;
                }
                res.json({ messages });
            });
    });
});

router.post('/send', (req, res) => {
        const { userId, chatId, message } = req.body;

        con.query(sendMessage(userId, chatId, message), err => {
            if (err) {
                throw err;
            }
            con.query(getMessages(), (err, messages) => {
                if (err) {
                    throw err;
                }
                res.json({ messages });
            });
        });
});

module.exports = router;
