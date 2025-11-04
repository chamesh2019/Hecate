import Hecate from '../src/index.js';

describe('Hecate initialization', () => {
    it('should throw an error if environment variables are not set', () => {
        process.env.HECATE_API_KEY = '';

        expect(() => new Hecate()).toThrowError('HECATE_API_KEY required');
    });
});

describe('Hecate getSecret', () => {
    it('should fetch secret successfully when valid secret name is provided', async () => {
        const hecate = new Hecate('hk_fdb846d720ce9ec2133e091fa1c72754d01595d8201efd97a555c7ff9744bcba');

        const secret = await hecate.getSecret('test-secret');

        expect(secret).toBeDefined();
        expect(secret.key).toBe('test-secret');
        expect(secret.value).toBe('supersecretvalue');

    });
});
        