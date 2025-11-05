import { privateDecrypt } from 'crypto';

/**
 * Decrypts a message using RSA decryption with the provided private key
 * @param encryptedMessage - The encrypted message as a base64 string
 * @param privateKey - The RSA private key in PEM format
 * @returns Decrypted message as a string
 */
export function decrypt(encryptedMessage, privateKey) {
    try {
        const buffer = Buffer.from(encryptedMessage, 'base64');
        const decrypted = privateDecrypt(privateKey, buffer);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt message");
    }
}