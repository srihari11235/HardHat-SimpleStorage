// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//contracts are similar to classes
contract SimpleStorage {
  //Data types
  // address -> Addess of an account.
  //uint => we can specify the byte size also. e.g: uint8, uint16 etc. By default uint256
  //bytes32 => bytes are used to store string but can be automatically converted to bytes.

  // uint8 = 1;
  // bytes32 myByte = "cat"

  //public variables acts as a view function (getter property)
  uint256 public favoriteNumber;
  //struct example =>
  People public person = People({favoriteNumber: 2, name: "Srihari"});

  //array
  People[] public people;

  //variables in a struct will get automatically indexed.
  struct People {
    uint256 favoriteNumber;
    string name;
  }

  //Mapping - similar to dictionary
  mapping(string => uint256) public nameToFavoriteNumber;

  function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
    retrieve();
  }

  //view and pure tells soliditiy that when called they dont need to spend gas
  //view - means we just want to retrieve data from the contract and not modify
  //View disallows  modifcation in the function
  //pure also disallows reading.
  //view and pure doesnt cost gas unless called from a non-view or a non-pure function
  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  //Data Locations
  //calldata - are temperary variables that cannot be modified
  //memory - means the variable exists only temperorily and can be modified
  //storage - exists even outside of function execution. class Properties are explicitly storage .

  //Data location is only needed for Array(strings), structs and mapping

  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    //constructor parameter is in same order it is defined in struct
    People memory newPerson = People(_favoriteNumber, _name);
    people.push(newPerson);
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }
}
