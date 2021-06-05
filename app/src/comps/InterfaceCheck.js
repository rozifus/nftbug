import React, { useState, useRef, useEffect } from "react";

import interfaceSignatures from "../data/interfaceSignatures.json"

import Grid from "@material-ui/core/Grid";


export default ({drizzle, drizzleState, contract, contractName, interfaceName}) => {
  const [datakey, setDatakey] = useState(null);
  const signature = interfaceSignatures[interfaceName];

  useEffect(() => {
    const drizzleContract = drizzle.contracts[contractName];
    const dk = drizzleContract.methods["supportsInterface"].cacheCall(signature); 
    setDatakey(dk);
  },
  [contract])

  const drizzleContractState = drizzleState.contracts[contractName];
  if (!drizzleContractState) {
    return null
  }

  const supportRes = drizzleContractState.supportsInterface[datakey];
  const support = (supportRes && supportRes.value) || false;
  return (
    <Grid item xs={12}>
      <p>Interface {interfaceName}: {support.toString()}</p>
    </Grid>
  );
};