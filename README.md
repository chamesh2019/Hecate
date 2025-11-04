# Hecate Keystone

A lightweight secrets manager client for JavaScript projects. Hecate Keystone provides a simple interface to securely fetch and manage secrets from your Hecate secrets management service.

## Features

- 🔐 Secure secret retrieval from Hecate API
- 🚀 Simple and intuitive API
- 🔑 Flexible authentication (environment variables or constructor)
- 📦 ES Module support
- ⚡ Built with async/await
- 🧪 Fully tested

## Installation

```bash
npm install hecate-keystone
```

## Usage

### Basic Usage

```javascript
import Hecate from 'hecate-keystone';

// Initialize with environment variable
// Set HECATE_API_KEY in your environment
const hecate = new Hecate();

// Or pass API key directly
const hecate = new Hecate('your-api-key-here');

// Fetch a secret
try {
    const secret = await hecate.getSecret('DATABASE_PASSWORD');
    console.log(secret.value);
} catch (error) {
    console.error('Failed to fetch secret:', error);
}
```

### Configuration

Hecate Keystone can be configured in two ways:

#### 1. Environment Variable (Recommended)

Set the `HECATE_API_KEY` environment variable:

```bash
export HECATE_API_KEY='your-api-key'
```

Then initialize without parameters:

```javascript
const hecate = new Hecate();
```

#### 2. Constructor Parameter

Pass the API key directly to the constructor:

```javascript
const hecate = new Hecate('your-api-key-here');
```

## API Reference

### `new Hecate(apiKey?)`

Creates a new Hecate client instance.

**Parameters:**
- `apiKey` (string, optional): Your Hecate API key. If not provided, will use `HECATE_API_KEY` environment variable.

**Throws:**
- `Error`: If no API key is provided and `HECATE_API_KEY` environment variable is not set.

### `async getSecret(secretName)`

Retrieves a secret by name from the Hecate service.

**Parameters:**
- `secretName` (string, required): The name of the secret to retrieve.

**Returns:**
- `Promise<Object>`: The secret object containing the key and value.

**Throws:**
- `Error`: If the secret is not found or if there's a network error.

**Example:**
```javascript
const secret = await hecate.getSecret('API_KEY');
console.log(secret.key);   // 'API_KEY'
console.log(secret.value); // The secret value
```

## Error Handling

```javascript
try {
    const secret = await hecate.getSecret('MY_SECRET');
    // Use the secret
} catch (error) {
    if (error.message.includes('not found')) {
        console.error('Secret does not exist');
    } else {
        console.error('Error fetching secret:', error.message);
    }
}
```

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