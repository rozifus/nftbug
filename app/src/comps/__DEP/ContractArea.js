import React, { useState, useRef, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
}));

export default ({drizzle, drizzleState, value, onChange, valid, connected}) => {
  const classes = useStyles();

  const connectedIcon = connected ? <LinkIcon /> : <LinkOffIcon />

  const adornment = ( 
    <InputAdornment position="start">
      <IconButton edge="start">
        {connectedIcon}
      </IconButton>
    </InputAdornment>
  )

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
            startAdornment: adornment
          }}
        />
      </FormControl>
    </div>
  );
};