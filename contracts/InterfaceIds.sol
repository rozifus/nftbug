// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract InterfaceIds {
    mapping(string => bytes4) public interfaces;

    constructor() {
        interfaces["IERC165"] = type(IERC165).interfaceId;
        interfaces["IERC721"] = type(IERC721).interfaceId;
        interfaces["IERC721Enumerable"] = type(IERC721Enumerable).interfaceId;
    }

    function getInterfaceId(string calldata selector) external view returns (bytes4) {
        return interfaces[selector];
    }
}
