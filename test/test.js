const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("ethers/lib/utils");

const gasFee = ethers.utils.parseUnits("80", "gwei");
const gasLimit = 8000000;
const salesPrice = 0.01;

describe("Deploying a Contracts and test their functionalities ", function () {

  it("Should instantiate the created NFT contracts and call their functions", async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    
    // first contract deployment 
    const firstNFT = await ethers.getContractFactory("FirstNFT");
    
    const gasPrice = await firstNFT.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);

    const estimatedGas = await firstNFT.signer.estimateGas(
      firstNFT.getDeployTransaction(),
    );
    console.log(`Estimated gas: ${estimatedGas}`);

    const deploymentPrice = gasPrice.mul(estimatedGas);
    const deployerBalance = await firstNFT.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
    console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
    if (deployerBalance.lt(deploymentPrice)) {
      throw new Error(
        `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
          deploymentPrice.sub(deployerBalance),
        )}`,
      );
    }

    const firstContract = await firstNFT.deploy();

    await firstContract.deployed();

    console.log("firstNFT deployed to:", firstContract.address);

    // second contract deployment
    const secondNFT = await ethers.getContractFactory("SecondNFT");
    const secondContract = await secondNFT.deploy(firstContract.address);
    
    await secondContract.deployed();

    console.log("SecondNFT deployed to:", secondContract.address);
    
    
    
    console.log("\n")
    console.log('owner address : ', owner.address);
    console.log("\n")

    console.log("~~~~~~~~~~~~firstNFT mint~~~~~~~~~~~~~~~~~~~")

    await firstContract.connect(addr1).mintTo({
      gasPrice,
      gasLimit,
      value: ethers.utils.parseEther(
        salesPrice.toFixed(2).toString()
      )
    });
   
    await firstContract.connect(addr2).mintTo({
      gasPrice,
      gasLimit,
      value: ethers.utils.parseEther(
        salesPrice.toFixed(2).toString()
      )
    });

    
    // set mint time
    let d = new Date();
    d.toUTCString();
    let mintTime = Math.floor(d.getTime()/ 1000);
    await firstContract.connect(owner).setMintTime(mintTime - 5);

    console.log('middleowner1 :', await firstContract.connect(addr2)._middleOwners(1));
    console.log('middleowner2 :', await firstContract.connect(addr2)._middleOwners(2));
    console.log(1);
    console.log('mintTime :', mintTime);

    console.log('mintTime: ', await firstContract.connect(addr2).mintTime());
    console.log(2);
    // mint to accounts at given time
    await firstContract.connect(addr2).mintAtTime();

    console.log('The owner of firstContract : ', await firstContract.connect(addr1).owner());
    console.log("\n");

    console.log('The owner of 1 1stNFT : ', await firstContract.connect(addr1).ownerOf(1))
    console.log("\n");


    const totalSupply = await firstContract.connect(addr1).totalSupply();
    const lastTokenId = totalSupply.toNumber();
    console.log('firstContract - total supply : ', lastTokenId);
    console.log("\n");

    // escrowNFT
    await firstContract.connect(addr2).setApprovalForAll(secondContract.address, true);
    await secondContract.connect(addr2).escrowNFT(lastTokenId);    
    
    console.log('escrow owner of lastToken: ', await secondContract.connect(addr2).escrowOwners(lastTokenId)); 
    console.log("\n");

    // withdrawFirstNFT and mint secondNFT
    await secondContract.connect(addr2).withdrawFirstNFT(lastTokenId);

    // show result of escrow & withdraw
    const balanceOf1stNFT   = await firstContract.connect(addr2).balanceOf(addr2.address);
    const ownerLastIdOf1stNFT   = await firstContract.connect(addr2).ownerOf(lastTokenId);

    const totalSupplyOf2ndNFT = await secondContract.connect(addr2).totalSupply();
    const lastTokenIdOf2ndNFT = totalSupplyOf2ndNFT.toNumber();
    const balanceOf2ndNFT  = await secondContract.connect(addr2).balanceOf(addr2.address);
    const ownerLastIdOf2ndNFT   = await secondContract.connect(addr2).ownerOf(lastTokenIdOf2ndNFT);

    console.log('addr2: ', addr2.address);
    console.log("\n");

    console.log(`owner of LastId in 1stNFT: ${ownerLastIdOf1stNFT}, Balance: ${balanceOf1stNFT.toNumber()}, Token Id: ${lastTokenId}`);
    console.log("\n");

    console.log(`owner of LastId in 2ndNFT: ${ownerLastIdOf2ndNFT}, Balance: ${balanceOf2ndNFT.toNumber()}, Token id: ${lastTokenIdOf2ndNFT}`);

  })

});