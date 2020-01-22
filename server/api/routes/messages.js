const { Router } = require('express');
const { getMessages, sendMessage } = require('../db/mysql');

const router = Router();

const con = require('./');

router.get('/', (req, res) => {
    con.query(getMessages(), (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result, 'myLog result');
        res.json({ messages: result });
    });
});

router.post('/send', (req, res) => {
    con.query(getMessages(), (err, messages) => {
        if (err) {
            throw err;
        }
        const { login, message } = req.body;

        con.query(sendMessage(login, message, messages.length), err => {
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
});

module.exports = router;
