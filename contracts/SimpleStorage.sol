// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
  uint256 lucknum;

  struct People {
    uint256 lucknum;
    string name;
  }

  mapping(string => uint256) public nameToFavoriteNumber;

  function setNum(uint256 _favoriteNumber) public {
    lucknum = _favoriteNumber;
  }

  function getNum() public view returns (uint256) {
    return lucknum;
  }

  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }
}