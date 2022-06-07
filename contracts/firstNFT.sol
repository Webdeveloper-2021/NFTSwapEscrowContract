// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @title FirstNFT
 * FirstNFT - a contract for my non-fungible token.
 */
contract FirstNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
  
    Counters.Counter public _nextTokenId;
  
    uint public price = 0.01 ether;

    uint public qtyPerWallet = 1;
    
    uint public mintTime = 1657202400;  // 07 June 2022 22:00:00 
    
    mapping(uint256 => address) public _middleOwners;
    
    constructor() ERC721("First NFT", "1stNFT")
    {
        _nextTokenId.increment();   
    }

    function setMintTime(uint256 _mintTime) public onlyOwner{
        mintTime = _mintTime;
    }

    function mintTo() external payable{
        uint256 currentTokenId = _nextTokenId.current();
        require(balanceOf(msg.sender) < qtyPerWallet, "Purchase would exceed the quantity per wallet");       
        require(msg.value >= price, "ether send is under price");        
        _nextTokenId.increment();

        if(block.timestamp > mintTime) {
            _safeMint(msg.sender, currentTokenId);
        } else {
            _middleOwners[currentTokenId] = msg.sender;
        }
    }

    function mintAtTime() external {
        require(block.timestamp >= mintTime, "You can get 1 NFT at given time!");
        for (uint256 i = 1; i <= totalSupply(); i++) {
            address nullAddr = 0x0000000000000000000000000000000000000000;
            if(_middleOwners[i] != nullAddr){
                _safeMint(_middleOwners[i], i);
                _middleOwners[i] = nullAddr;
            }
        }
    }
   
    function totalSupply() public view returns (uint256) {
         return _nextTokenId.current() - 1;
    }

    function withdraw() external onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}


