import Hecate from '../src/index.js';

describe('Hecate initialization', () => {
    it('should throw an error if environment variables are not set', () => {
        let key = process.env.HECATE_API_KEY;
        process.env.HECATE_API_KEY = '';

        expect(() => new Hecate()).toThrowError('HECATE_API_KEY required');
        process.env.HECATE_API_KEY = key;
    });
});

describe('Hecate getSecret', () => {
    it('should fetch secret successfully when valid secret name is provided', async () => {
        const hecate = new Hecate(process.env.HECATE_API_KEY);

        const secret = await hecate.getSecret('test-secret');

        expect(secret).toBeDefined();
        expect(secret.key).toBe('test-secret');
        expect(secret.value).toBe('supersecretvalue');

    });
});
        