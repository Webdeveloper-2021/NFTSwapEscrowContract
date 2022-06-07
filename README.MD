# deploy
 npx hardhat run  --network rinkeby scripts/deploy.js

#verify
- first contract
 npx hardhat verify --network rinkeby 0x6----first contract address----5

 https://rinkeby.etherscan.io/address/0x64E667e12bdd91F694958dEb297b69E4eBB59C05#code

- second contract
npx hardhat verify --network rinkeby --constructor-args args/secondNFTArgs.js 0x8----second contract address----e

https://rinkeby.etherscan.io/address/0x8C7Dc694a47124fAb497cFbDC5a7FAc2fa1Cb06e/#code