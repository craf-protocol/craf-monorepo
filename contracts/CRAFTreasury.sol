// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CRAFTreasury is AccessControl {
    // Create a new role identifier for the governor timelock role
    bytes32 public constant GOV_TIMELOCK_ROLE = keccak256("GOV_TIMELOCK_ROLE");

    constructor(address govTimelockAddress) {
      // Grant the governance timelock role to a specified address
      _setupRole(GOV_TIMELOCK_ROLE, govTimelockAddress);
    }

    function fundTreasury(
      address token,
      uint256 amount
    ) public returns (bool) {
        // Transfer token to treasury
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Mint NFT to msg sender for funding
        // TODO: Mint
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
        require(hasRole(GOV_TIMELOCK_ROLE, msg.sender), "Caller is not the governance timelock");

        // Poor mans
        IERC20(token).transferFrom(address(this), receiver, amount);

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

    receive() external payable {
      // this built-in function doesn't require any calldata,
      // it will get called if the data field is empty and
      // the value field is not empty.
      // this allows the smart contract to receive ether just like a
      // regular user account controlled by a private key would.
      revert();
      // The treasury only handles ERC20/ERC721 tokens and not native ETH
    }
}