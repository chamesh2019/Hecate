import axios from 'axios';
import { decrypt } from './crypto.js';

class Hecate {
    host = 'https://hecate.chames.dev/api/v1/secrets';

    constructor(apiKey, userKey) {
        this.apiKey = apiKey || process.env.HECATE_API_KEY;
        this.userKey = userKey || process.env.HECATE_USER_KEY;

        if (!this.apiKey || !this.userKey) {
            throw new Error('HECATE_API_KEY and HECATE_USER_KEY are required');
        }
    }

    async getSecret(secretName) {
        try {
            const response = await axios.get(`${this.host}?name=${secretName}`, {
                headers: {
                    'x-api-key': this.apiKey
                }
            });
            const secret = (response.data?.secrets || []).find(s => s.key === secretName);
            if (!secret) {
                throw new Error(`Secret "${secretName}" not found`);
            }

            // Decrypt the secret value using the user key
            const decryptedValue = decrypt(secret.value, this.userKey);
            secret.value = decryptedValue;

            return secret;
        } catch (error) {
            console.error('Error fetching secret:', error);
            throw error;
        }
    }
}

export default Hecate;
