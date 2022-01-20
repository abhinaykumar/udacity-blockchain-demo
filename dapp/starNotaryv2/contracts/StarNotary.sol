pragma solidity ^0.5.16;

contract StarNotary {
    string public starName;
    address public starOwner;

    event starClaimed(address owner);
    event starNameChanged(address owner);

    constructor() public {
        starName = "New Star";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function changeName(string memory name) public {
        starName = name;
        emit starNameChanged(msg.sender);
    }

}
