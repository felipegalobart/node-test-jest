import request from 'supertest';
import app from '../app';
import { User } from '../models/User';

describe('Testing api routes', () => {
    
    let email = 'test@jest.com';
    let password = '1234';

    beforeAll(async () => {
        await User.sync({ force: true });
    });
    //teste de ping pong

    it('Should Ping Pong', (done) => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy();
                return done();
            });
    });
    // --------------------------

    // Testes de Register

    it('Should register a new user', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');

                return done();
            });
    });

    it('Should not allow to register a new user with existing email', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                
                return done();
            });
    });

    it('Should not allow to register a new user without password', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                
                return done();
            });
    });

    it('Should not allow to register a new user without email', (done) => {
        request(app)
            .post('/register')
            .send(`password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                
                return done();
            });
    });

    it('Should not allow to register a new user without any data', (done) => {
        request(app)
            .post('/register')
            .send(``)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                
                return done();
            });
    });
    //----------------------------

    // Testes de Login

    it('Should Login Succesfully', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeTruthy();
                return done();
            });
    });

    it('Should NOT Login Succesfully (with incorrect password)', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=wrong_password`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeFalsy();
                return done();
            });
    });

    it('Should NOT Login Succesfully (with incorrect email)', (done) => {
        request(app)
            .post('/login')
            .send(`email=wronge_mail&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeFalsy();
                return done();
            });
    });

    //-----------------------------

    // Testes de Listagem 

    it('Should List Users', (done) => {
        request(app)
            .get('/list')
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.list.length).toBeGreaterThanOrEqual(1);
                expect(response.body.list).toContain(email);
                return done();
            });
    });

});