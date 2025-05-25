const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
    let refreshToken = '';

    it('should register a user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: '123456' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: '123456' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');

        refreshToken = res.body.refreshToken;
    });

    it('should refresh token', async () => {
        const res = await request(app)
            .post('/auth/token')
            .send({ token: refreshToken });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
    });

    it('should logout', async () => {
        const res = await request(app)
            .post('/auth/logout')
            .send({ token: refreshToken });

        expect(res.statusCode).toEqual(204);
    });
    
    it('should delete the user', async () => {
        const loginRes = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: '123456' });

        const accessToken = loginRes.body.accessToken;

        const res = await request(app)
            .delete('/auth/delete_user')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });

});
