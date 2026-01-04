import IndonesianSeedPhrase from '../src/lib/IndonesianSeedPhrase';

describe('IndonesianSeedPhrase', () => {
  it('should generate a valid key pair and address from a seed phrase', async () => {
    const seedPhrase = 'padi gabah nasi beras jagung bubur ketan roti gandum sorgum';
    const indonesianSeedPhrase = new IndonesianSeedPhrase();
    const keys = indonesianSeedPhrase.getKeysFromSeedPhrase(seedPhrase);
    
    await indonesianSeedPhrase.print(keys.privateKey as string, keys.publicKey, keys.address as string);

    expect(keys).toHaveProperty('privateKey');
    expect(keys).toHaveProperty('publicKey');
    expect(keys).toHaveProperty('address');
  });
});
