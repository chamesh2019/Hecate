# Hecate Keystone

A lightweight secrets manager client for JavaScript projects. Hecate Keystone provides a simple interface to securely fetch and manage secrets from your Hecate secrets management service with AES encryption.
Companion project of https://github.com/chamesh2019/hecate-server
## Features

- 🔐 Secure secret retrieval from Hecate API with AES decryption
- 🚀 Simple and intuitive API
- 🔑 Flexible authentication (environment variables or constructor)
- 🔒 End-to-end encryption with user-provided keys

## Installation

```bash
npm install hecate-keystone
```

## Usage

### Basic Usage

```javascript
import Hecate from 'hecate-keystone';

// Initialize with environment variables
// Set HECATE_API_KEY and HECATE_USER_KEY in your environment
const hecate = new Hecate();

// Or pass keys directly to constructor
const hecate = new Hecate('your-api-key-here', 'your-user-key-here');

// Fetch a secret
try {
    const secret = await hecate.getSecret('DATABASE_PASSWORD');
    console.log('Secret value:', secret.value);
    console.log('Secret key:', secret.key);
} catch (error) {
    console.error('Failed to fetch secret:', error);
}
```

### Configuration

Hecate Keystone requires two keys for authentication and decryption:

#### 1. Environment Variables (Recommended)

Set both environment variables:

```bash
export HECATE_API_KEY='your-api-key'
export HECATE_USER_KEY='your-user-key'
```

Then initialize without parameters:

```javascript
const hecate = new Hecate();
```

#### 2. Constructor Parameters

Pass both the API key and user key directly to the constructor:

```javascript
const hecate = new Hecate('your-api-key-here', 'your-user-key-here');
```

## API Reference

### `new Hecate(apiKey?, userKey?)`

Creates a new Hecate client instance.

**Parameters:**
- `apiKey` (string, optional): Your Hecate API key. If not provided, will use `HECATE_API_KEY` environment variable.
- `userKey` (string, optional): Your AES decryption key. If not provided, will use `HECATE_USER_KEY` environment variable.

**Throws:**
- `Error`: If either the API key or user key is not provided and the corresponding environment variable is not set.

### `async getSecret(secretName)`

Retrieves and decrypts a secret by name from the Hecate service.

**Parameters:**
- `secretName` (string, required): The name of the secret to retrieve.

**Returns:**
- `Promise<Object>`: The secret object containing the key and decrypted value.

**Throws:**
- `Error`: If the secret is not found, decryption fails, or if there's a network error.

**Example:**
```javascript
const secret = await hecate.getSecret('API_KEY');
console.log(secret.key);   // 'API_KEY'
console.log(secret.value); // The decrypted secret value
```

## Examples

Check out the [examples](./examples/) directory for working code samples:

```javascript
// See examples/index.js for a complete working example
import Hecate from 'hecate-keystone';

const hecate = new Hecate('your-api-key', 'your-user-key');
const secret = await hecate.getSecret('my-secret');
console.log('Decrypted Secret:', secret);
```

## Error Handling

```javascript
try {
    const secret = await hecate.getSecret('MY_SECRET');
    // Use the secret
    console.log('Secret retrieved successfully:', secret.value);
} catch (error) {
    if (error.message.includes('not found')) {
        console.error('Secret does not exist');
    } else if (error.message.includes('HECATE_API_KEY')) {
        console.error('API key not configured');
    } else if (error.message.includes('HECATE_USER_KEY')) {
        console.error('User key not configured');
    } else {
        console.error('Error fetching secret:', error.message);
    }
}
```

## Security

- Secrets are encrypted at rest and decrypted client-side using AES encryption
- Your user key never leaves your application
- API communication is secured via HTTPS
- No sensitive data is logged or stored locally

## Requirements

- Node.js 14.x or higher
- ES Module support

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Running Examples

```bash
node examples/index.js
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Run tests to ensure everything works (`npm test`)
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/YourFeature`)
7. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chames Dinuka

## Keywords

- secrets-manager
- secrets
- configuration
- environment-variables
- security
- api-keys
- encryption
- aes
- cryptography
