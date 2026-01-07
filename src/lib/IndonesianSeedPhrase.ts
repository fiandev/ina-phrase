import BIP39_ENGLISH from "../BIP39_english";
import BIP39_INDONESIAN from "../BIP39_indonesian";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";
import * as qrcode from "qrcode";

const bip32ecc = bip32.BIP32Factory(ecc);

/**
 * A utility class for generating Indonesian BIP39 seed phrases and deriving Bitcoin keys.
 * This class provides functionality to create random seed phrases in Indonesian language,
 * derive cryptographic keys from seed phrases, and display QR codes for keys.
 */
export default class IndonesianSeedPhrase {
  /** English BIP39 word list for reference */
  private readonly BIP39_ENGLISH = BIP39_ENGLISH;

  /** Indonesian BIP39 word list used for generating seed phrases */
  private readonly BIP39_INDONESIAN = BIP39_INDONESIAN;

  /**
   * Creates an instance of IndonesianSeedPhrase.
   * No parameters required as it uses predefined word lists.
   */
  constructor() {}

  /**
   * Generates a random BIP39 seed phrase using Indonesian words.
   * @param len - The number of words in the seed phrase (12 or 24)
   * @returns A string containing the space-separated Indonesian words
   * @example
   * ```typescript
   * const isp = new IndonesianSeedPhrase();
   * const phrase = isp.generateRandomSeedPhrase(12);
   * console.log(phrase); // "kata satu kata dua ..."
   * ```
   */
  public generateRandomSeedPhrase(len: 12 | 24) {
    return this.generateSeedPhrase(this.generateRandomSeedPhraseWords(len));
  }

  /**
   * Derives Bitcoin keys from a BIP39 seed phrase.
   * Uses the standard BIP32 derivation path m/44'/0'/0'/0/0 for Bitcoin mainnet.
   * @param seedPhrase - The BIP39 seed phrase as a string
   * @returns An object containing private key, public key, and Bitcoin address
   * @example
   * ```typescript
   * const keys = isp.getKeysFromSeedPhrase("kata satu kata dua ...");
   * console.log(keys.privateKey); // Hex-encoded private key
   * console.log(keys.publicKey);  // Hex-encoded public key
   * console.log(keys.address);    // Bitcoin P2PKH address
   * ```
   */
  public getKeysFromSeedPhrase(seedPhrase: string) {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const root = bip32ecc.fromSeed(seed);
    const child = root.derivePath("m/44'/0'/0'/0/0");
    const { address } = bitcoin.payments.p2pkh({
      pubkey: child.publicKey,
    });
    return {
      privateKey: Buffer.from(child.privateKey as Uint8Array).toString("hex"),
      publicKey: Buffer.from(child.publicKey as Uint8Array).toString("hex"),
      address,
    };
  }

  /**
   * Prints the private key, public key, and address along with their QR codes to the console.
   * QR codes are rendered in terminal format for easy scanning.
   * @param privateKey - The private key as a hex string
   * @param publicKey - The public key as a hex string
   * @param address - The Bitcoin address as a string
   * @example
   * ```typescript
   * await isp.print(
   *   "85d6da48f237235a877f224d3b6c775d82dab8ccb117f2d35f3113ffd31348b6",
   *   "033c2103985493608123817693fe4f5c38e86ec979fe4d9b814369a6dc622d407e",
   *   "1F61pasuA5urBzp4XHN6aW3X9pAaML11ZL"
   * );
   * // Outputs formatted keys and QR codes
   * ```
   */
  public async print(privateKey: string, publicKey: string, address: string) {
    const privateKeyQR = await qrcode.toString(privateKey, {
      type: "terminal",
      small: true,
    });
    const publicKeyQR = await qrcode.toString(publicKey, {
      type: "terminal",
      small: true,
    });

    console.log("=".repeat(60));
    console.log("🚨 SECURITY WARNING: Never share your private key!");
    console.log("=".repeat(60));
    console.log();

    console.log("🔐 PRIVATE KEY");
    console.log("-".repeat(20));
    console.log(`Hex: ${privateKey}`);
    console.log("QR Code:");
    console.log(privateKeyQR);
    console.log();

    console.log("🔑 PUBLIC KEY");
    console.log("-".repeat(20));
    console.log(`Hex: ${publicKey}`);
    console.log("QR Code:");
    console.log(publicKeyQR);
    console.log();

    console.log("🏠 BITCOIN ADDRESS");
    console.log("-".repeat(20));
    console.log(`Address: ${address}`);
    console.log("=".repeat(60));
  }

  /**
   * Generates an array of random Indonesian words for the seed phrase.
   * @private
   * @param len - Number of words to generate
   * @returns Array of randomly selected Indonesian words
   */
  private generateRandomSeedPhraseWords(len: number) {
    return this.generateRandomWords(len);
  }

  /**
   * Selects random words from the Indonesian BIP39 word list.
   * @private
   * @param count - Number of words to select
   * @returns Array of randomly selected words
   */
  private generateRandomWords(count: number) {
    const words = [];

    for (let i = 0; i < count; i++) {
      words.push(
        this.BIP39_INDONESIAN[
          Math.floor(Math.random() * this.BIP39_INDONESIAN.length)
        ],
      );
    }

    return words;
  }

  /**
   * Joins an array of words into a single space-separated string.
   * @private
   * @param words - Array of words to join
   * @returns Space-separated string of words
   */
  private generateSeedPhrase(words: string[]) {
    return words.join(" ");
  }
}
