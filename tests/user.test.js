const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user',async ()=>{
        await request(app).post('/users').send({
            name:'Kalit',
            email:'kalit@abc.com',
            password: 'Password123'
        }).expect(201)
});
