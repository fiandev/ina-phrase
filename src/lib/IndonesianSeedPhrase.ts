import BIP39_ENGLISH from "../BIP39_english";
import BIP39_INDONESIAN from "../BIP39_indonesian";

export default class IndonesianSeedPhrase {
  private readonly BIP39_ENGLISH = BIP39_ENGLISH;
  private readonly BIP39_INDONESIAN = BIP39_INDONESIAN;

  constructor() {}

  public generateRandomSeedPhrase(len: 12 | 24) {
    return this.generateSeedPhrase(this.generateRandomSeedPhraseWords(len));
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
