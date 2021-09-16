
import React, { useState, useEffect, useContext } from "react";

import { useErc721 } from "./erc721";

let TokenContext;
let { Provider } = (TokenContext = React.createContext())

export const useErc721Token = () => React.useContext(TokenContext);

const Erc721TokenProviderBase = ({contractAndState, tokenId, children}) => {
  console.log("cas")
  console.log(contractAndState)
  const { contract: erc721contract, state, ready } = contractAndState;

  const [uriDatakey, setUriDatakey] = useState(null);

  useEffect(() => {
      if (!ready) {
        return
      }
      const dk = erc721contract.methods["tokenURI"].cacheCall(tokenId);
      setUriDatakey(dk);
    },
    [erc721contract, tokenId]
  );

  if (!ready) {
    return null
  }

  const uriState = state.tokenURI && state.tokenURI[uriDatakey];
  const uri = uriState && uriState.value;

  const uriReady = (tokenId != null) && (uri != null)

  return <Provider value={{ tokenId, uri, ready: uriReady }}>{children}</Provider>
};

export const Erc721TokenProviderFromErc721 = ({tokenId, children}) => {
  const contractAndState = useErc721();

  if (!contractAndState.ready) {
    return null
  }

  return <Erc721TokenProviderBase contractAndState={contractAndState} tokenId={tokenId}>{children}</Erc721TokenProviderBase>
}

// export default Erc721TokenProvider;
