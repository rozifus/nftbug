import React, { useState, useRef, useEffect } from "react";

import interfaceSignatures from "../data/interfaceSignatures.json"

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemSecondaryAction, Switch } from "@material-ui/core";


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

  const supportIcon = support ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />

  return (
    <ListItem>
      <ListItemAvatar>
        <ListItemAvatar>
          {supportIcon}
        </ListItemAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={interfaceName}
        secondary="TODO"
      />
      <ListItemSecondaryAction>
        <Switch
          edge="end"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};