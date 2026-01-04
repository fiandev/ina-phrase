import BIP39_indonesian from '../src/BIP39_indonesian';

describe('BIP39 Indonesian Wordlist', () => {
  it('should have 2048 words', () => {
    expect(BIP39_indonesian.length).toBe(2048);
  });

  it('should not contain duplicate words', () => {
    const wordlist = BIP39_indonesian;
    const uniqueWords = [...new Set(wordlist)];
    expect(uniqueWords.length).toBe(wordlist.length);
  });

  it('should be sorted alphabetically', () => {
    const wordlist = BIP39_indonesian;
    const sortedWordlist = [...wordlist].sort();
    expect(wordlist).toEqual(sortedWordlist);
  });

  it('should all be lowercase and have no whitespace', () => {
    const wordlist = BIP39_indonesian;
    wordlist.forEach(word => {
      expect(word).toBe(word.toLowerCase());
      expect(word).not.toContain(' ');
    });
  });
});
