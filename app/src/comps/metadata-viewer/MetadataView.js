import React, { useEffect, useState } from "react";
import { useMetadata } from "../context/metadata";
import { useNft } from "use-nft";

import Link from "@material-ui/core/Link";


export default ({contract, tokenId}) => {
  const { error, status, nft } = useNft( contract, tokenId );

  console.log(status)

  if (status != "done") {
    if (error) {
      console.log(error)
    }
    return null
  }

  console.log(nft)

  const { rawData, metadataUrl } = nft;

  console.log(rawData)
  console.log(status, metadataUrl)

  return (
    <div>
      <Link href={metadataUrl} target="_blank" rel="noreferrer">Metadata</Link>
      <textarea readOnly value={JSON.stringify(rawData, null, 2)} cols="100" rows="100" />
    </div>
  );
};

