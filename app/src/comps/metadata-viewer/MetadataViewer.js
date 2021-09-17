import React, { useState, useContext, useEffect } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc721json from "../../interfaces/IERC721.abi.json"
import MetadataView from "./MetadataView";

import { DrizzleContext } from "@drizzle/react-plugin";
import Erc721Provider, { useErc721 } from "../context/erc721";
import MetadataProvider, { MetadataProviderFromErc721Token } from "../context/metadata";
import { useNamespacedDrizzleContract } from "../context/namespaced-drizzle-contract";


const MetadataViewer = () => {
  const { address, contract, state, ready } = useNamespacedDrizzleContract("Erc721Metadata")
  const [tokenId, setTokenId] = useState("");

  const [uriDatakey, setUriDatakey] = useState(null)

  const tokenIdChange = (event) => {
    const tokenId = event.target.value
    setTokenId(tokenId)
  }

  useEffect(() => {
    if (tokenId != "") {
      const dk = contract.methods["tokenURI"].cacheCall(tokenId);
      setUriDatakey(dk);
    }
  },
  [tokenId])

  const uriState = state.tokenURI[uriDatakey];
  const uri = uriState && uriState.value;


  return (
    <div className="section">
      <h2>Metadata Viewer</h2>
      <input type="text" value={address} /*onChange={this.contractChange}*/ />
      <p>
        <strong>Contract </strong>
        { address }
      </p>
      
      <input type="text" value={tokenId} onChange={tokenIdChange} />
      <hr />
      {uri ? (
        <MetadataProvider uri={uri}>
          <MetadataView /> 
        </MetadataProvider>
      ) : null }
   </div>
  );
};

/*
     <textarea readOnly value={tokenUri && tokenUri.value} cols="100" />
      <MetadataView tokenUri={tokenUri && tokenUri.value} />
*/

export default MetadataViewer;