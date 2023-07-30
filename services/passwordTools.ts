import bcrypt from 'bcrypt';

export const hashPassword = async (plaintext: string): Promise<string> => {
    const hash:string = await bcrypt.hash(plaintext, 10);
    return hash;
};