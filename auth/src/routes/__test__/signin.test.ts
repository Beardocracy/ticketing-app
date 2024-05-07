import request from 'supertest';
import {app} from '../../app';

it('fails when an email that does not exist is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: 'test@test.com', password: 'password'})
        .expect(201);
    return request(app)
        .post('/api/users/signin')
        .send({email: 'test@test.com', password: 'differentPassword'})
        .expect(400);
})

it('works when a correct password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: 'test@test.com', password: 'password'})
        .expect(201);
    return request(app)
        .post('/api/users/signin')
        .send({email: 'test@test.com', password: 'password'})
        .expect(200);
})

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400);
})

it('returns a 400 with a missing email and password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com'
        })
        .expect(400);
    return request(app)
        .post('/api/users/signin')
        .send({
            password: 'password'
        })
        .expect(400);
})