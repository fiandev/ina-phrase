# Indonesian Seed Phrase

A TypeScript library and CLI tool for generating Indonesian BIP39 seed phrases and deriving Bitcoin keys.

## Features

- Generate random BIP39 seed phrases using Indonesian words
- Derive Bitcoin keys from seed phrases
- Display QR codes for keys in terminal
- CLI tool for easy command-line usage
- TypeScript support with full type definitions

## Installation

### As a library

```bash
npm install indonesian-seed-phrase
```

### As a CLI tool (global install)

```bash
npm install -g indonesian-seed-phrase
```

## Usage

### CLI Commands

#### Generate a random seed phrase

```bash
indonesian-seed-phrase generate <length>
```

Where `<length>` is either 12 or 24.

**Example:**
```bash
indonesian-seed-phrase generate 12
# Output: masa gila kabel brutal watu halim desi sakral curah opor ebong bunda
```

#### Get keys from a seed phrase

```bash
indonesian-seed-phrase keys "<seed-phrase>"
```

**Example:**
```bash
indonesian-seed-phrase keys "masa gila kabel brutal watu halim desi sakral curah opor ebong bunda"
# Output:
# {
#   "privateKey": "85d6da48f237235a877f224d3b6c775d82dab8ccb117f2d35f3113ffd31348b6",
#   "publicKey": "033c2103985493608123817693fe4f5c38e86ec979fe4d9b814369a6dc622d407e",
#   "address": "1F61pasuA5urBzp4XHN6aW3X9pAaML11ZL"
# }
```

#### Print QR codes for keys

```bash
indonesian-seed-phrase print <private-key> <public-key> <address>
```

**Example:**
```bash
indonesian-seed-phrase print \
  "85d6da48f237235a877f224d3b6c775d82dab8ccb117f2d35f3113ffd31348b6" \
  "033c2103985493608123817693fe4f5c38e86ec979fe4d9b814369a6dc622d407e" \
  "1F61pasuA5urBzp4XHN6aW3X9pAaML11ZL"
# Outputs QR codes in terminal
```

### Library Usage

```typescript
import IndonesianSeedPhrase from 'indonesian-seed-phrase';

const isp = new IndonesianSeedPhrase();

// Generate a random seed phrase
const seedPhrase = isp.generateRandomSeedPhrase(12);
console.log(seedPhrase); // "masa gila kabel brutal watu halim desi sakral curah opor ebong bunda"

// Get keys from seed phrase
const keys = isp.getKeysFromSeedPhrase(seedPhrase);
console.log(keys);
// {
//   privateKey: "85d6da48f237235a877f224d3b6c775d82dab8ccb117f2d35f3113ffd31348b6",
//   publicKey: "033c2103985493608123817693fe4f5c38e86ec979fe4d9b814369a6dc622d407e",
//   address: "1F61pasuA5urBzp4XHN6aW3X9pAaML11ZL"
// }

// Print QR codes (async)
await isp.print(keys.privateKey, keys.publicKey, keys.address);
```

## API Reference

### IndonesianSeedPhrase

#### Methods

- `generateRandomSeedPhrase(len: 12 | 24): string` - Generates a random seed phrase
- `getKeysFromSeedPhrase(seedPhrase: string): { privateKey: string, publicKey: string, address: string }` - Derives Bitcoin keys from seed phrase
- `print(privateKey: string, publicKey: string, address: string): Promise<void>` - Prints keys and QR codes to console

## Development

```bash
# Install dependencies
yarn install

# Build the project
yarn build

# Run tests
yarn test
```

## License

MIT - see [LICENSE](LICENSE) file for details.