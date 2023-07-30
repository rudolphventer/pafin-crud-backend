import bcrypt from 'bcrypt';

/**
 * Method to hash plaintext passwords
 * @param plaintext 
 */
export const hashPassword = async (plaintext: string): Promise<string> => {
    const hash:string = await bcrypt.hash(plaintext, 10);
    return hash;
};