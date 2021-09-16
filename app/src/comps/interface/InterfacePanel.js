import React, { useState, useRef, useEffect } from "react";

import abiIERC165 from "../../interfaces/IERC165.abi.json";
import genContractName from "../../utils/genContractName";
import interfaceSignatures from "../../data/interfaceSignatures.json"

import InterfaceCheck from "./InterfaceCheck";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
  },
}))

export default ({drizzle, drizzleState, contract}) => {
  const classes = useStyles();

  const contractName = genContractName(contract, "InterfacePanel")

  useEffect(() => {
    if (contract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC165, contract)
      };
      
      drizzle.addContract(config);

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

  const interfaceChecks = Object.keys(interfaceSignatures).map(iface => (
    <InterfaceCheck
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      contractName={contractName}
      interfaceName={iface} />
  ))

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Supported Interfaces</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List style={{ width: "100%"}}>
          {interfaceChecks}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};