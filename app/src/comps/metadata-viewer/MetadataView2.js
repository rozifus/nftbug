import React, { useEffect, useState } from "react";
import { useMetadata } from "../context/metadata";

import Link from "@material-ui/core/Link";


export default (props) => {
  const { metadata, uri, ready } = useMetadata();

  console.log(uri)
  return (
    <div>
      <Link href={uri} target="_blank" rel="noreferrer">Metadata</Link>
      <textarea readOnly value={JSON.stringify(metadata, null, 2)} cols="100" rows="100" />
    </div>
  );
};

