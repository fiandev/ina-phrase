import IndonesianSeedPhrase from "../src/lib/IndonesianSeedPhrase";

(() => {
  const seedPhrase = new IndonesianSeedPhrase();
  console.log(seedPhrase.generateRandomSeedPhrase(12));
})();
