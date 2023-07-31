import { hashPassword } from "../../services/passwordTools";
import bcrypt from 'bcrypt';

const plainTxtPass = 'test';

describe("Test passwordTools.ts", () => {

    test("Should hash a plaintext password", async () => {
        const hash = await hashPassword(plainTxtPass);
        expect(typeof(hash)).toEqual('string');
    });

    test("Should hash password correctly", async () => {
        const hash = await hashPassword(plainTxtPass);
        expect(bcrypt.compare(plainTxtPass, hash)).toBeTruthy;
        expect(bcrypt.compare('otherPassword', hash)).toBeFalsy;
    });

});
