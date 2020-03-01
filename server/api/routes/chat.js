
const { Router } = require('express');
const { createChat, deleteChat } = require('../db/mysql');

const router = Router();

const con = require('./');

router.post('/create', (req, res) => {
    const { name, userId } = req.body;

    con.query(createChat(name, userId), (err) => {
        if (err) {
            throw err;
        }

        res.send({ name, userId, success: true });
    });
});

router.post('/delete', (req, res) => {
    const { chatId } = req.body;

    con.query(deleteChat(chatId), (err) => {
        if (err) {
            throw err;
        }

        res.send({ chatId, success: true });
    });
});

module.exports = router;
