const { Router } = require('express');
const { getUserByLogin, getChats, createUser } = require('../db/mysql');

const con = require('./');

const router = Router();

router.post('/create', (req, res) => {
    const { name, login, password1, password2 } = req.body;

    if(password1 !== password2) {
        return res.send({ isAuth: false, errorMessage: 'Different password' });
    }

    con.query(createUser(name, login, password1), (err) => {
        if (err) {
            throw err;
        }
        con.query(getUserByLogin(req.body.login), (err, result) => {
            if (err) {
                throw err;
            }
            const { login, password } = req.body;
            const user = result[0];

            if (!user) {
                return res.json({ isAuth: false, errorMessage: 'Invalid login or password!' });
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
                res.json({ isAuth: false, errorMessage: 'Invalid login or password' });
            }
        });
    });
});

router.post('/', (req, res) => {
    con.query(getUserByLogin(req.body.login), (err, result) => {
        if (err) {
            throw err;
        }
        const { login, password } = req.body;
        const user = result[0];

        if (!user) {
            return res.json({ isAuth: false, errorMessage: 'Invalid login or password!' });
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
            res.json({ isAuth: false, errorMessage: 'Invalid login or password' });
        }
    });
});

module.exports = router;
