
import React, { useState, useEffect, useContext } from "react";

import { useShop } from "./shop";


let GoodContext;
let { Provider } = (GoodContext = React.createContext())

export const useGood = () => React.useContext(GoodContext);

const GoodProvider = ({index, children}) => {
  const { contract: shop, state: shopState, ready: shopReady } = useShop();
  // console.log(shop, shopState, shopReady)

  const [uriDatakey, setUriDatakey] = useState(null);
  const [priceDatakey, setPriceDatakey] = useState(null);

  useEffect(() => {
      const dk = shop.methods["goodURI"].cacheCall(index);
      setUriDatakey(dk);
    },
    [index]
  );

  useEffect(() => {
      const dk = shop.methods["getPrice"].cacheCall(index);
      setPriceDatakey(dk);
    },
    [index]
  );

  const uriState = shopState.goodURI[uriDatakey];
  const uri = uriState && uriState.value;

  const priceState = shopState.getPrice[priceDatakey];
  const price = priceState && priceState.value;

  const ready = (index != null) && (uri != null) && (price != null)

  return <Provider value={{ index, uri, price, ready }}>{children}</Provider>
};

export default GoodProvider;
