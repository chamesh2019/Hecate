import { jest } from '@jest/globals';
import Hecate from '../src/index.js';
import axios from 'axios';
import { decrypt } from '../src/crypto.js';

jest.mock('../src/crypto.js', () => ({
    decrypt: jest.fn((value) => value)
}));

describe('Hecate initialization', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should throw an error if API key or user key is not set', () => {
        delete process.env.HECATE_API_KEY;
        delete process.env.HECATE_USER_KEY;

        expect(() => new Hecate()).toThrow('HECATE_API_KEY and HECATE_USER_KEY are required');
    });

    it('should initialize successfully with environment variables', () => {
        process.env.HECATE_API_KEY = 'test-key';
        process.env.HECATE_USER_KEY = 'test-user-key';

        expect(() => new Hecate()).not.toThrow();
    });

    it('should initialize successfully with constructor parameters', () => {
        expect(() => new Hecate('test-api-key', 'test-user-key')).not.toThrow();
    });
});

describe('Hecate getSecret', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.HECATE_API_KEY = 'test-api-key';
        process.env.HECATE_USER_KEY = 'test-user-key';
    });

    it('should initialize Hecate for getSecret testing', () => {
        const hecate = new Hecate();
        expect(hecate).toBeDefined();
        expect(hecate.apiKey).toBe('test-api-key');
        expect(hecate.userKey).toBe('test-user-key');
    });
});
        