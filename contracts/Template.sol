// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Template {
    // State variables
    uint256 public count;
    mapping(address => uint256) public balances;
    address[] public users;

    // Events
    event NewUser(address indexed user, uint256 initialBalance);

    // Constructor
    constructor() {
        count = 0;
    }

    // Modifier
    modifier onlyPositive(uint256 value) {
        require(value > 0, "Value must be positive");
        _;
    }

    // Function to add a new user with an initial balance
    function addUser(uint256 initialBalance) external onlyPositive(initialBalance) {
        require(balances[msg.sender] == 0, "User already exists");
        balances[msg.sender] = initialBalance;
        users.push(msg.sender);
        emit NewUser(msg.sender, initialBalance);
    }

    // Function to update user balance
    function updateUserBalance(address user, uint256 newBalance) external {
        require(balances[user] > 0, "User not found");
        balances[user] = newBalance;
    }

    // Function to get the list of all users
    function getAllUsers() external view returns (address[] memory) {
        return users;
    }

    // Function to get the balance of a specific user
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    // Function to increment the count
    function increment() external {
        count += 1;
    }

    // Function to decrement the count
    function decrement() external {
        require(count > 0, "Count is already 0");
        count -= 1;
    }
}
