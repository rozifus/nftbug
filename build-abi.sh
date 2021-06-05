#!/bin/bash

solcjs --abi \
	./node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol \
	./node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol \
	./node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol

mkdir -p ./app/src/interfaces

mv __node_modules_@openzeppelin_contracts_utils_introspection_IERC165_sol_IERC165.abi ./app/src/interfaces/IERC165.abi.json
mv __node_modules_@openzeppelin_contracts_token_ERC721_IERC721_sol_IERC721.abi ./app/src/interfaces/IERC721.abi.json
mv __node_modules_@openzeppelin_contracts_token_ERC721_extensions_IERC721Enumerable_sol_IERC721Enumerable.abi ./app/src/interfaces/IERC721Enumerable.abi.json
