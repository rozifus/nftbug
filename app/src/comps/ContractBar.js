import React, { useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import { fade, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

// material-ui.com/components/app-bar
const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0,2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1,1,1,0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch'
    }
  }
}));

export default ({contract, connected, onChangeContract}) => {
  const classes= useStyles();

  const linkIcon = connected ? <LinkIcon/> : <LinkOffIcon color="disabled" />

  return (
    <AppBar position="relative">
      <Toolbar width="100%">
        <Typography variant="h6" color="inherit" noWrap>
          NFTBug
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {linkIcon}
          </div>
          <InputBase
            placeholder={contract}
            onChange={onChangeContract}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            value={contract}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};