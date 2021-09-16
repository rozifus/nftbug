
import React, { useState, useEffect, useContext } from "react";

import MetadataProvider from "../metadata";
import { useGood } from "../good";

const GoodToMetadata = ({children}) => {
  const { uri, ready } = useGood();

  if (!ready) {
    return null;
  }

  return (
    <MetadataProvider uri={uri}>
      {children}
    </MetadataProvider>
  );
};

export default GoodToMetadata;
