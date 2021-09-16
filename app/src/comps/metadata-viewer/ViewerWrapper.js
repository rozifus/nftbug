import React, { useState, useContext } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc721json from "../../interfaces/IERC721.abi.json"
import MetadataViewer from "./MetadataViewer";
import { NamespacedDrizzleContractProvider } from "../context/namespaced-drizzle-contract";
import { Erc721Provider } from "../context/erc721";

import { DrizzleContext } from "@drizzle/react-plugin";


const ViewerWrapper = ({contract, children}) => {

  return (
    <Erc721Provider address={contract}>
      <MetadataViewer />
    </Erc721Provider>
  )

}

export default ViewerWrapper;