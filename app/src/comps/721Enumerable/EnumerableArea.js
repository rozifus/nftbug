import React, { useState, useRef, useEffect } from "react";
import abiIERC721Enumerable from "../../contracts/IERC721Enumerable.abi.json";

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import genContractName from "../../utils/genContractName";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
}));

export default ({drizzle, drizzleState, contract}) => {
  const classes = useStyles();
  const contractName = genContractName(contract, "ERC721Enumerable")

  useEffect(() => {
    if (contract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC721Enumerable, contract)
      };
      
      drizzle.addContract(config);

      return () => {
        drizzle.deleteContract(contractName);
      }
    }
  },
  [contract, setContract])

  return (
    <div className={classes.root}>
      <FormControl fullWidth className={classes.margin}>
        <TextField
          fullWidth
          label="contract"
          variant="outlined"
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: icon
          }}
        />
      </FormControl>
    </div>
  );
};