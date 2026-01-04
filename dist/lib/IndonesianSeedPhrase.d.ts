export default class IndonesianSeedPhrase {
    private readonly BIP39_ENGLISH;
    private readonly BIP39_INDONESIAN;
    constructor();
    generateRandomSeedPhrase(len: 12 | 24): string;
    getKeysFromSeedPhrase(seedPhrase: string): {
        privateKey: string;
        publicKey: string;
        address: string | undefined;
    };
    print(privateKey: string, publicKey: string, address: string): Promise<void>;
    private generateRandomSeedPhraseWords;
    private generateRandomWords;
    private generateSeedPhrase;
}
