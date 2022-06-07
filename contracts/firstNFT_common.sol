// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @title FirstNFT
 * FirstNFT - a contract for my non-fungible token.
 */
contract FirstNFTCommon is ERC721, Ownable {
    using Counters for Counters.Counter;
  
    Counters.Counter public _nextTokenId;
  
    uint public price = 0.01 ether;

    uint public qtyPerWallet = 1;
   
    constructor() ERC721("First NFT", "1stNFT")
    {  
        _nextTokenId.increment();  
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     */

    function mintTo() external payable {
        uint256 currentTokenId = _nextTokenId.current();
        
        require(balanceOf(msg.sender) < qtyPerWallet, "Purchase would exceed the quantity per wallet");
       
        require(msg.value >= price, "Balance is under price");
        
        _safeMint(msg.sender, currentTokenId);
        
        _nextTokenId.increment();  
    }
   
    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }

    function withdraw() external onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}


