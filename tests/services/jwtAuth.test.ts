import { generateJWT } from '../../services/jwtAuth';

const testUsername = 'a123';
const testPassword = 'p123';
process.env.ADMIN_USERNAME = testUsername;
process.env.ADMIN_PASSWORD = testPassword;

describe('Test jwtAuth.ts', () => {
    test('Should generate JWT with correct credentials', async () => {
        const JWT = generateJWT(testUsername, testPassword);
        expect(JWT).toBeTruthy;
        expect(JWT?.length).toBeGreaterThan(1);
    });

    test('Should not generate a JWT with incorrect credentials', async () => {
        const JWT = generateJWT('notCorrect', 'notCorrect');
        expect(JWT).toBeFalsy;
    });

    test('Should not generate a JWT with invalid credentials', async () => {
        const JWT = generateJWT();
        expect(JWT).toBeFalsy;
    });
});
