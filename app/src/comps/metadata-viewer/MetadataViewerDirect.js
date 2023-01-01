import React, { useState, useContext, useEffect } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc721json from "../../interfaces/IERC721.abi.json"
import MetadataView from "./MetadataView";

import { DrizzleContext } from "@drizzle/react-plugin";
import Erc721Provider, { useErc721 } from "../context/erc721";
import MetadataProvider, { MetadataProviderFromErc721Token } from "../context/metadata";
import { useNamespacedDrizzleContract } from "../context/namespaced-drizzle-contract";


const MetadataViewerDirect = ({contract}) => {
  //const { address, contract, state, ready } = useNamespacedDrizzleContract("Erc721Metadata")
  const [tokenId, setTokenId] = useState("");

  const tokenIdChange = (event) => {
    const tokenId = event.target.value
    setTokenId(tokenId)
  }

  return (
    <div className="section">
      <h2>Metadata Viewer Direct</h2>
      <input type="text" value={contract} /*onChange={this.contractChange}*/ />
      <p>
        <strong>Contract </strong>
        { contract }
      </p>
      
      <input type="text" value={tokenId} onChange={tokenIdChange} />
      <MetadataView  contract={contract} tokenId={tokenId}/> 
      <hr />
   </div>
  );
};

/*
     <textarea readOnly value={tokenUri && tokenUri.value} cols="100" />
      <MetadataView tokenUri={tokenUri && tokenUri.value} />
*/

export default MetadataViewerDirect;