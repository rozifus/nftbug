import React, { useState, useRef, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
}));

/*
const validIcon = ( 
  <InputAdornment position="start">
    <IconButton edge="start">
      <Done />
    </IconButton>
  </InputAdornment>
)
*/

export default ({drizzle, drizzleState, value, onChange}) => {
  const classes = useStyles();

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
            //startAdornment: icon
          }}
        />
      </FormControl>
    </div>
  );
};