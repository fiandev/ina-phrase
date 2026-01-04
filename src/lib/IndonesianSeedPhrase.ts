import BIP39_ENGLISH from "../BIP39_english";
import BIP39_INDONESIAN from "../BIP39_indonesian";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";
import * as qrcode from "qrcode";

const bip32ecc = bip32.BIP32Factory(ecc);

export default class IndonesianSeedPhrase {
  private readonly BIP39_ENGLISH = BIP39_ENGLISH;
  private readonly BIP39_INDONESIAN = BIP39_INDONESIAN;

  constructor() {}

  public generateRandomSeedPhrase(len: 12 | 24) {
    return this.generateSeedPhrase(this.generateRandomSeedPhraseWords(len));
  }

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

  public async print(privateKey: string, publicKey: string, address: string) {
    const privateKeyQR = await qrcode.toString(privateKey, { type: "terminal" });
    const publicKeyQR = await qrcode.toString(publicKey, { type: "terminal" });

    console.log("Private Key:", privateKey);
    console.log("Private Key QR Code:");
    console.log(privateKeyQR);
    console.log("Public Key:", publicKey);
    console.log("Public Key QR Code:");
    console.log(publicKeyQR);
    console.log("Address:", address);
  }

  private generateRandomSeedPhraseWords(len: number) {
    return this.generateRandomWords(len);
  }

  private generateRandomWords(count: number) {
    const words = [];

    for (let i = 0; i < count; i++) {
      words.push(
        this.BIP39_INDONESIAN[
          Math.floor(Math.random() * this.BIP39_INDONESIAN.length)
        ]
      );
    }

    return words;
  }

  private generateSeedPhrase(words: string[]) {
    return words.join(" ");
  }
}