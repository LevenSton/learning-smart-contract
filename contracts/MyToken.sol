// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

    uint256 _feeRatio;
    uint256 _burnRatio;

    constructor(string memory name, string memory symbol, uint256 feeRatio, uint256 burnRatio) ERC20(name, symbol){
        _feeRatio = feeRatio;
        _burnRatio = burnRatio;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    function transferSupportChargeFee(address recipient, uint256 amount) public virtual returns (bool) {
        uint256 fee = amount * _feeRatio / 100;
        _transfer(_msgSender(), recipient, amount - fee);
        _transfer(_msgSender(), owner(), fee);
        return true;
    }

    function transferSupportBurnFee(address recipient, uint256 amount) public virtual returns (bool) {
        uint256 fee = amount * _burnRatio / 100;
        _transfer(_msgSender(), recipient, amount - fee);
        _burn(_msgSender(), fee);
        return true;
    }
}