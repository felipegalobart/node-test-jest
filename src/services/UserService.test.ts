import * as UserService from './UserService';
import { User, UserInstance } from '../models/User';

describe('Testing user service', () => {
    let email = 'test@jest.com';
    let password = '1234';

    beforeAll(async () => {
        await User.sync({ force: true })
    });

    it('should create a new user', async () => {
        const newUser = await UserService.createUser(email, password) as UserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(email);
    });
});