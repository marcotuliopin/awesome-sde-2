const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const usersPath = './data/users.json';
const SECRET = 'your_jwt_secret';
const REFRESH_SECRET = 'your_refresh_secret';

const getUsers = () => JSON.parse(fs.readFileSync(usersPath));

const authenticateToken = require('../middleware/auth');

// Registro
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    users.push({ username, password: hashedPassword });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username }, SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
    refreshTokens.push(refreshToken);
});

let refreshTokens = [];

router.post('/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.status(204).send();
});

// Deletar usuário
router.delete('/delete_user', authenticateToken, (req, res) => {
    const username = req.user.username;
    let users = getUsers();

    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.json({ message: 'User deleted successfully' });
});


module.exports = router;
