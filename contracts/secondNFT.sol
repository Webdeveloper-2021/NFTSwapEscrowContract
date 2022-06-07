// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @title SecondNFT
 * SecondNFT - a contract for my non-fungible token.
 */
contract SecondNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
  
    Counters.Counter public _nextTokenId;
    
    address public firstContractAddress;

    // Mapping from first token ID to owner address
    mapping(uint256 => address) public escrowOwners;
    
    constructor(address _firstContractAddress) ERC721("Second NFT", "2ndNFT")
    {
        firstContractAddress = _firstContractAddress;
        _nextTokenId.increment();  
    }

    function mintTo() public {
        uint256 currentTokenId = _nextTokenId.current();
        
        _safeMint(msg.sender, currentTokenId);
        _nextTokenId.increment(); 
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }

    function escrowNFT(uint256 _tokenId) public {
        require(IERC721(firstContractAddress).ownerOf(_tokenId) == msg.sender, "You haven't this first NFT yet");
        require(IERC721(firstContractAddress).isApprovedForAll(msg.sender, address(this)), "Not approved");
        IERC721(firstContractAddress).transferFrom(msg.sender, address(this), _tokenId);
        escrowOwners[_tokenId] = msg.sender;
    }

    function withdrawFirstNFT(uint256 _tokenId) public {
        require(escrowOwners[_tokenId] == msg.sender, "Not escrow first NFT yet");
        IERC721(firstContractAddress).transferFrom(address(this), msg.sender, _tokenId);
        mintTo();
        escrowOwners[_tokenId] = 0x0000000000000000000000000000000000000000;
    }
}


