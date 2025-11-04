import CryptoJS from 'crypto-js';

/**
 * Decrypts a message using AES decryption with the provided key
 * @param {string} encryptedMessage - The encrypted message
 * @param {string} encryptionKey - The decryption key (same as encryption key)
 * @returns {string} Decrypted message as a string
 */
export function decrypt(encryptedMessage, encryptionKey) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, encryptionKey);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt message");
    }
}