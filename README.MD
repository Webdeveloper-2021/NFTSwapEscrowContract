# setting .env
After creat .env file, please copy the content of .env.sample.
And you can set params.


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


//================ Proposal =====================

1) Create an ERC721 contract, which can allow users to mint 1 NFT at a given time, provided they pay a minimum price of 0.01 in ETH.
2) Create a second ERC721 contract, which can allow users to mint an NFT, 
provided they transfer the NFT from the first contract above to the second contract (which escrows the token).
3) At a later stage, the user can swap back the second NFT back for the first one.Assume that price is zero for the swap functionality.
4) Finally, deploy all contracts following best practices of Solidity, keeping upgradability and reusability in mind.

//================ Result ======================

https://rinkeby.etherscan.io/address/0x7dfaC16F291d37fB69b448BE0C59fa75FeAed368#code

https://rinkeby.etherscan.io/address/0xa0eF5f22404e9ac8c0d1A04D8A16fFCE311b6a4E#code

