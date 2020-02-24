const { Router } = require('express');
const { getUserByLogin, getChats } = require('../db/mysql');

const con = require('./');

const router = Router();

router.post('/', (req, res) => {
    con.query(getUserByLogin(req.body.login), (err, result) => {
        if (err) {
            throw err;
        }
        const { login, password } = req.body;
        const user = result[0];

        if (!user) {
            return res.json({ isAuth: false, errorMessage: 'User not found' });
        }

        if (user.login === login && user.password === password) {
            con.query(getChats(user.userId), (err, chatResult) => {
                if (err) {
                    throw err;
                }
                delete user.password,
                res.json({
                    ...user,
                    isAuth: true,
                    chats: chatResult,
                 });
            });
        } else {
            res.json({ isAuth: false, errorMessage: 'Invalid password' });
        }
    });
});

module.exports = router;
