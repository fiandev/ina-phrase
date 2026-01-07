#!/usr/bin/env node

import { Command } from 'commander';
import IndonesianSeedPhrase from './lib/IndonesianSeedPhrase';

const program = new Command();

program
  .name('ina-phrase')
  .description('CLI tool for Indonesian BIP39 seed phrases')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a random Indonesian seed phrase')
  .argument('<length>', 'Length of seed phrase (12 or 24)', (value) => {
    const num = parseInt(value);
    if (num !== 12 && num !== 24) {
      throw new Error('Length must be 12 or 24');
    }
    return num;
  })
  .action(async (length: 12 | 24) => {
    const isp = new IndonesianSeedPhrase();
    const seedPhrase = isp.generateRandomSeedPhrase(length);
    console.log(seedPhrase);
  });

program
  .command('keys')
  .description('Get keys from a seed phrase')
  .argument('<seed-phrase>', 'The seed phrase')
  .action((seedPhrase: string) => {
    const isp = new IndonesianSeedPhrase();
    const keys = isp.getKeysFromSeedPhrase(seedPhrase);
    console.log(JSON.stringify(keys, null, 2));
  });

program
  .command('print')
  .description('Print QR codes for keys')
  .argument('<private-key>', 'Private key')
  .argument('<public-key>', 'Public key')
  .argument('<address>', 'Address')
  .action(async (privateKey: string, publicKey: string, address: string) => {
    const isp = new IndonesianSeedPhrase();
    await isp.print(privateKey, publicKey, address);
  });

program.parse();