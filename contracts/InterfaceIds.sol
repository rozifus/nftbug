// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract InterfaceIds {
    mapping(string => bytes4) public interfaces;

    constructor() {
        interfaces["IERC165"] = type(IERC165).interfaceId;
        interfaces["IERC721"] = type(IERC721).interfaceId;
        interfaces["IERC721Enumerable"] = type(IERC721Enumerable).interfaceId;
        interfaces["IERC777"] = type(IERC777).interfaceId;
        interfaces["IERC1155"] = type(IERC1155).interfaceId;
    }

    function getInterfaceId(string calldata selector) external view returns (bytes4) {
        return interfaces[selector];
    }
}
