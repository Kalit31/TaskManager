const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const userOneId = new mongoose.Types.ObjectId()
const userOne ={
    _id:userOneId,
    name:'Rahul',
    email:'rahul@xyz.com',
    password:'rahul123',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
};

beforeEach(async ()=>{
    await User.deleteMany();
    await new User(userOne).save()
});

test('Should signup a new user',async ()=>{
       const response =  await request(app).post('/users').send({
            name:'Kalit',
            email:'kalit@abc.com',
            password: 'Password123'
        }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
});

test('Should login existing user',async ()=>{
    const response =  await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
});

test('Should not login nonexistent user', async ()=>{
   await request(app).post('/users/login').send({
       email:userOne.email,
       password:'sads'
   }).expect(400)
});

test('Should get profile for user',async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get profile for user',async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('Should delete account for a user',async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
});
test('Should not delete account for a user',async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});
