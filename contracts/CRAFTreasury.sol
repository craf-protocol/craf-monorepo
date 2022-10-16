// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CRAFTreasury is ERC721, Ownable {
    uint256 private currentId;

    /** Events **/
    event FundTreasury(address indexed token, address indexed from, uint256 amount, uint256 balance);

    constructor(address governanceAddress, string memory name, string memory symbol) ERC721(name, symbol) {
        // Grant the governance timelock address as contract owner
        currentId = 0;
        Ownable(governanceAddress);
    }

    /// @dev Checks balance of token in treasury
    function treasuryBalanceOf(address token) public view returns (uint256) {
      return IERC20(token).balanceOf(address(this));
    }

    /// @dev Funds treasury and returns if it was a success
    /// @param token Token that should be transferred
    /// @param amount The amount of tokens that should be transferred
    function fundTreasury(
      address token,
      uint256 amount
    ) public returns (bool) {
        // Transfer tokens from fn caller to treasury & get new token balance
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        // uint256 balance = IERC20(token).balanceOf(address(this));

        // emit FundTreasury(token, msg.sender, amount, balance);

        // Mint NFT to msg sender for funding
        super._safeMint(msg.sender, currentId);
        currentId += 1;
        return true;
    }

    /// @dev Transfers a token and returns if it was a success
    /// @param token Token that should be transferred
    /// @param receiver Receiver to whom the token should be transferred
    /// @param amount The amount of tokens that should be transferred
    function transferToken(
        address token,
        address receiver,
        uint256 amount
    ) public returns (bool transferred) {
        // TODO: Add onlyOwner

        // Poor mans
        // IERC20(token).transferFrom(address(this), receiver, amount);

        // t11s
        // 0xa9059cbb - keccack("transfer(address,uint256)")
        bytes memory data = abi.encodeWithSelector(0xa9059cbb, receiver, amount);
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // We write the return value to scratch space.
            // See https://docs.soliditylang.org/en/v0.7.6/internals/layout_in_memory.html#layout-in-memory
            let success := call(sub(gas(), 10000), token, 0, add(data, 0x20), mload(data), 0, 0x20)
            switch returndatasize()
                case 0 {
                    transferred := success
                }
                case 0x20 {
                    transferred := iszero(or(iszero(success), iszero(mload(0))))
                }
                default {
                    transferred := 0
                }
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://lamora-landing.s3.us-west-1.amazonaws.com/nfts/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(string.concat(baseURI, tokenId.toString()), ".json") : "";
    }

    /// @dev Smart contract can receive ether like a regular user account controlled by a PK would.
    /// @notice Built-in function doesn't require any calldata, it will get called if the data field is empty and the value field is not empty.
    receive() external payable {
        // The treasury only handles ERC20/ERC721 tokens and not native ETH
        revert();
    }
}