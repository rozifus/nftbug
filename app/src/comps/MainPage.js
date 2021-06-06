import React, { useState, useEffect } from "react";

import abiIERC721 from "../interfaces/IERC721.abi.json";
import genContractName from "../utils/genContractName";

import ContractArea from "./__DEP/ContractArea";
import EnumerableCount from "./EnumerableCount";
import InterfacePanel from "./InterfacePanel";
import ContractBar from "./ContractBar";

import { CssBaseline, Toolbar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";


export default ({drizzle, drizzleState}) => {
  const [contract, setContract] = useState("");
  const contractName = genContractName(contract, "ERC721");
  const validContract = drizzle.web3.utils.isAddress(contract);
  const drizzledContract = Boolean(drizzle.contracts[contractName]);

  const onChangeContractHandler = e => {
    let v = e.target.value && e.target.value.trim();

    setContract(v);
  }

  useEffect(() => {
    if (validContract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC721, contract)
      };
      
      drizzle.addContract(config);

      return () => {
        drizzle.deleteContract(contractName);
      }
    }
  },
  [contract, setContract])

  return (
    <React.Fragment>
      <CssBaseline />
      <ContractBar contract={contract} connected={drizzledContract} onChangeContract={onChangeContractHandler} />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item>
            {validContract && <InterfacePanel drizzle={drizzle} drizzleState={drizzleState} contract={contract} />}
          </Grid>
          <Grid item xs={12}>
            {validContract && <EnumerableCount drizzle={drizzle} drizzleState={drizzleState} contract={contract} />}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};