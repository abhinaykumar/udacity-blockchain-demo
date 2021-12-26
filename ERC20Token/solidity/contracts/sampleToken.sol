pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SampleToken is ERC20 {
    uint8 public decimalnumber = 16;
    uint public INITIAL_SUPPLY = 1000 * (10 ** decimalnumber);
    constructor() ERC20("AbhiToken", "ABT") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return decimalnumber;
    }
}
