# deploy
 npx hardhat run  --network rinkeby scripts/deploy.js

# verify
- first contract
 npx hardhat verify --network rinkeby 0x6----first contract address----5

 https://rinkeby.etherscan.io/address/0x7dfaC16F291d37fB69b448BE0C59fa75FeAed368#code

- second contract
npx hardhat verify --network rinkeby --constructor-args args/secondNFTArgs.js 0x8----second contract address----e

https://rinkeby.etherscan.io/address/0xa0eF5f22404e9ac8c0d1A04D8A16fFCE311b6a4E#code

# test
npx hardhat test