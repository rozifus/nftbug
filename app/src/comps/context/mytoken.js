
import React, { useState, useEffect, useContext } from "react";

import { useShop } from "./shop";


let MyTokenContext;
let { Provider } = (MyTokenContext = React.createContext())

export const useMyToken = () => React.useContext(MyTokenContext);

const MyTokenProvider = ({ownerIndex, ownerAddress, children}) => {
  const { contract: shop, state: shopState, ready: shopReady } = useShop();
  // console.log(shop, shopState, shopReady)

  const [indexDatakey, setIndexDatakey] = useState(null);
  const [uriDatakey, setUriDatakey] = useState(null);

  useEffect(() => {
      if (ownerAddress != null && ownerIndex != null) {
        const dk = shop.methods["tokenOfOwnerByIndex"].cacheCall(ownerAddress, ownerIndex);
        setIndexDatakey(dk);
      }
    },
    [ownerAddress, ownerIndex]
  );

  const indexState = shopState.tokenOfOwnerByIndex[indexDatakey];
  const index = indexState && indexState.value;

  useEffect(() => {
      if (index != null) {
        const dk = shop.methods["tokenURI"].cacheCall(index);
        setUriDatakey(dk);
      }
    },
    [index]
  );

  const uriState = shopState.tokenURI[uriDatakey];
  const uri = uriState && uriState.value;

  const ready = (index != null) && (ownerAddress != null) && (index != null) && (uri != null)

  return <Provider value={{ ownerIndex, index, uri, ready }}>{children}</Provider>
};

export default MyTokenProvider;
