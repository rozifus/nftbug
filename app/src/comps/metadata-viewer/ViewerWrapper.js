import React, { useState, useContext } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc721json from "../../interfaces/IERC721.abi.json"
import MetadataViewer from "./MetadataViewer";
import { NamespacedDrizzleContractProvider } from "../context/namespaced-drizzle-contract";
import { Erc721Provider } from "../context/erc721";

import { DrizzleContext } from "@drizzle/react-plugin";
import Erc721MetadataJson from "../../contracts/IERC721Metadata.json";


const ViewerWrapper = ({contract, children}) => {
  return (
    <NamespacedDrizzleContractProvider namespace="Erc721Metadata" address={contract} abi={Erc721MetadataJson.abi}>
      <MetadataViewer />
    </NamespacedDrizzleContractProvider>
  )

}

export default ViewerWrapper;