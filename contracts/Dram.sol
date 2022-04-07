// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract Dram {
    string public name;

    string public symbol;

    mapping (address => uint) public balanceOf;

    uint public totalSupply;

    uint public decimals;

    mapping (address => mapping(address => uint)) _allowance;

    constructor(string memory _name, string memory _symbol, uint _totalSupply, uint _decimals) public {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        decimals = _decimals;
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint _value) public {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint _value) public {
        require(_allowance[_from][msg.sender] >= _value, "Owner does not have enough allowance");
        _allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
    }

    function _transfer(address _from, address _to, uint _value) public {
        require(balanceOf[_from] >= _value, "Sender does not have enough funds");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
    }

    function approve(address _spender, uint _value) public {
        _approve(msg.sender, _spender, _value);
    }

    function _approve(address _owner, address _spender, uint _value) private {
        require(balanceOf[_owner] >= _value, "Owner does not have enought");
        _allowance[_owner][_spender] = _value;
    }

    function allowance(address _owner, address _spender) public view returns (uint) {
        return _allowance[_owner][_spender];
    }
}