import React, { useState, useRef, useEffect } from "react";
import abiIERC721Enumerable from "../contracts/IERC721Enumerable.abi.json";

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import genContractName from "../utils/genContractName";

export default ({drizzle, drizzleState, contract}) => {
  const contractName = genContractName(contract, "ERC721Enumerable")
  const [tokenSupplyDatakey, setTokenSupplyDatakey] = useState(null);

  useEffect(() => {
    if (contract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC721Enumerable, contract)
      };
      
      drizzle.addContract(config);

      const drizzleContract = drizzle.contracts[contractName];
      const tokenSupply = drizzleContract.methods["totalSupply"].cacheCall(); 
      setTokenSupplyDatakey(tokenSupply);

      return () => {
        drizzle.deleteContract(contractName);
      }
    }
  },
  [contract])

  const drizzleContractState = drizzleState.contracts[contractName];
  if (!drizzleContractState) {
    return null
  }

  const totalSupplyState = drizzleContractState.totalSupply[tokenSupplyDatakey];
  const totalSupply = totalSupplyState && totalSupplyState.value;
  console.log(totalSupply)

  return (
    <p>Enumerable Count: {totalSupply}</p>
  );
};