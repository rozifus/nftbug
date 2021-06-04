#!/bin/bash

solcjs --abi \
	./node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol \
	./node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol \
	./node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol

mv __node_modules_@openzeppelin_contracts_utils_introspection_IERC165_sol_IERC165.abi ./app/src/contracts/IERC165.abi.json
mv __node_modules_@openzeppelin_contracts_token_ERC721_IERC721_sol_IERC721.abi ./app/src/contracts/IERC721.abi.json
mv __node_modules_@openzeppelin_contracts_token_ERC721_extensions_IERC721Enumerable_sol_IERC721Enumerable.abi ./app/src/contracts/IERC721Enumerable.abi.json
