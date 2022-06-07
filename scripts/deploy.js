const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const firstNFT = await hre.ethers.getContractFactory("FirstNFT");
  const firstContract = await firstNFT.deploy();

  await firstContract.deployed();

  console.log("firstNFT deployed to:", firstContract.address);

  
  const secondNFT = await hre.ethers.getContractFactory("SecondNFT");
  const secondContract = await secondNFT.deploy(firstContract.address);
  
  await secondContract.deployed();

  console.log("SecondNFT deployed to:", secondContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
