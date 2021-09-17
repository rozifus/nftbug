
import React, { useState, useEffect, useContext } from "react";
import { useErc721Metadata } from "./erc721Metadata";

import withProviders from "../util/providers";
import { NamespacedDrizzleContractProvider } from "./namespaced-drizzle-contract";
import {erc721MetadataJson } from "../../contracts/IERC721Metadata.json";


let Erc721MetadataContext;
let { Provider } = (Erc721MetadataContext = React.createContext())

export const useGood = () => React.useContext(Erc721MetadataContext);

const MetadataProvider = ({tokenId, children}) => {
  const { contract, state, ready: erc721MetadataReady } = useErc721Metadata();
  // console.log(shop, shopState, shopReady)

  const [uriDatakey, setUriDatakey] = useState(null);

  useEffect(() => {
      const dk = contract.methods["tokenURI"].cacheCall(tokenId);
      setUriDatakey(dk);
    },
    [index]
  );

  const uriState = shopState.tokenURI[uriDatakey];
  const uri = uriState && uriState.value;

  const ready = (tokenId != null) && (uri != null)

  return <Provider value={{ tokenId, uri, price, ready }}>{children}</Provider>
};

export default withProviders([NamespacedDrizzleContractProvider, {namespace: "Erc721Metadata", abi: erc721MetadataJson,  }])(MetadataProvider);
