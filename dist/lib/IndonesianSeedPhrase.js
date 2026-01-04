"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BIP39_english_1 = __importDefault(require("../BIP39_english"));
const BIP39_indonesian_1 = __importDefault(require("../BIP39_indonesian"));
const bip39 = __importStar(require("bip39"));
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bip32 = __importStar(require("bip32"));
const ecc = __importStar(require("tiny-secp256k1"));
const qrcode = __importStar(require("qrcode"));
const bip32ecc = bip32.BIP32Factory(ecc);
class IndonesianSeedPhrase {
    constructor() {
        this.BIP39_ENGLISH = BIP39_english_1.default;
        this.BIP39_INDONESIAN = BIP39_indonesian_1.default;
    }
    generateRandomSeedPhrase(len) {
        return this.generateSeedPhrase(this.generateRandomSeedPhraseWords(len));
    }
    getKeysFromSeedPhrase(seedPhrase) {
        const seed = bip39.mnemonicToSeedSync(seedPhrase);
        const root = bip32ecc.fromSeed(seed);
        const child = root.derivePath("m/44'/0'/0'/0/0");
        const { address } = bitcoin.payments.p2pkh({
            pubkey: child.publicKey,
        });
        return {
            privateKey: Buffer.from(child.privateKey).toString("hex"),
            publicKey: Buffer.from(child.publicKey).toString("hex"),
            address,
        };
    }
    async print(privateKey, publicKey, address) {
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
    generateRandomSeedPhraseWords(len) {
        return this.generateRandomWords(len);
    }
    generateRandomWords(count) {
        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(this.BIP39_INDONESIAN[Math.floor(Math.random() * this.BIP39_INDONESIAN.length)]);
        }
        return words;
    }
    generateSeedPhrase(words) {
        return words.join(" ");
    }
}
exports.default = IndonesianSeedPhrase;
