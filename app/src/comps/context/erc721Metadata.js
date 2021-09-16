
import React, { useState, useEffect, useContext } from "react";

import { useShop } from "./shop";


let TokenContext;
let { Provider } = (TokenContext = React.createContext())

export const useToken = () => React.useContext(TokenContext);

const TokenProvider = ({index, children}) => {
  const { contract: shop, state: shopState, ready: shopReady } = useShop();
  // console.log(shop, shopState, shopReady)

  const [uriDatakey, setUriDatakey] = useState(null);

  useEffect(() => {
      const dk = shop.methods["tokenURI"].cacheCall(index);
      setUriDatakey(dk);
    },
    [index]
  );

  const uriState = shopState.goodURI[uriDatakey];
  const uri = uriState && uriState.value;

  const ready = (index != null) && (uri != null)

  return <Provider value={{ index, uri, ready }}>{children}</Provider>
};

export default TokenProvider;
