import React, { useEffect, useState } from "react";
import { useMetadata } from "../context/metadata";
import { useNft } from "use-nft";

import Link from "@material-ui/core/Link";


export default (props) => {
  const { status, metadataUrl, rawData } = useNft();

  console.log(metadataUrl)

  if (status != "done") {
    return null
  }

  return (
    <div>
      <Link href={metadataUrl} target="_blank" rel="noreferrer">Metadata</Link>
      <textarea readOnly value={JSON.stringify(rawData, null, 2)} cols="100" rows="100" />
    </div>
  );
};

