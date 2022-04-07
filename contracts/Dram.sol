// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract Dram {
    string public name;

    string public symbol;

    mapping (address => uint) public balanceOf;

    uint public totalSupply;

    uint public decimals;

    constructor(string memory _name, string memory _symbol, uint _totalSupply, uint _decimals) public {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        decimals = _decimals;
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint _value) public {
        require(balanceOf[msg.sender] >= _value, "Sender does not have enough funds");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}