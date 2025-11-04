import axios from 'axios';

class Hecate {
    host = 'https://hecate.chames.dev/api/v1/secrets';

    constructor(apiKey) {
        this.apiKey = apiKey || process.env.HECATE_API_KEY;
        
        if (!this.apiKey) {
            throw new Error('HECATE_API_KEY required');
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
            return secret;
        } catch (error) {
            console.error('Error fetching secret:', error);
            throw error;
        }
    }
}

export default Hecate;
