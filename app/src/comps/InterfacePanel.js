import React, { useState, useRef, useEffect } from "react";

import abiIERC165 from "../interfaces/IERC165.abi.json";
import genContractName from "../utils/genContractName";

import InterfaceCheck from "./InterfaceCheck";

import Grid from "@material-ui/core/Grid";

export default ({drizzle, drizzleState, contract}) => {
  const contractName = genContractName(contract, "InterfacePanel")

  useEffect(() => {
    if (contract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC165, contract)
      };
      
      drizzle.addContract(config);

      //const drizzleContract = drizzle.contracts[contractName];
      //const tokenSupply = drizzleContract.methods["totalSupply"].cacheCall(); 
      //setTokenSupplyDatakey(tokenSupply);

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

 // const totalSupplyState = drizzleContractState.totalSupply[tokenSupplyDatakey];
 // const totalSupply = totalSupplyState && totalSupplyState.value;
 // console.log(totalSupply)

  const interfaceChecks = ["IERC165", "IERC721", "IERC721Enumerable"].map(iface => (
    <InterfaceCheck
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      contractName={contractName}
      interfaceName={iface} />
  ))

  return (
    <Grid container>
      {interfaceChecks}
    </Grid>
  );
};