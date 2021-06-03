import React, { useState, useRef, useEffect } from "react";
import ierc721json from "../contracts/IERC721.json";

import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Done from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
}));

const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value
  }, [value]);

  return ref.current;
} 

export default ({drizzle, drizzleState}) => {
  const classes = useStyles();

  const [contract, setContract] = useState("");
  const validContract = drizzle.web3.utils.isAddress(contract);
  const prevContract = usePrevious(contract);
  const contractDrizzled = Boolean(drizzle.contracts[contract]);

  useEffect(() => {
    if (drizzle.web3.utils.isAddress(prevContract)) {
      drizzle.deleteContract(prevContract);
    }

    if (validContract) {
      const config = {
        contractName: contract,
        web3Contract: new drizzle.web3.eth.Contract(ierc721json.abi, contract)
      };
      drizzle.addContract(config);
    }
  }, [contract])
 
  const contractStyle = {
    color: contractDrizzled ? "green" : "red"
  }

  const validIcon = validContract ? (
    <InputAdornment position="start">
      <IconButton edge="start">
        <Done />
      </IconButton>
    </InputAdornment>
  ) : null

  return (
    <div className={classes.root}>
      <FormControl fullWidth className={classes.margin}>
        <TextField
          label="contract"
          variant="outlined"
          value={contract}
          onChange={(e) => setContract(e.target.value && e.target.value.trim())}
          InputProps={{
            startAdornment: validIcon
          }}
        />
      </FormControl>
    </div>
  );
};