import React, { useEffect, useState } from "react";
import ImageView from "./ImageView";


export default (props) => {
  const [tokenMetadata, setTokenMetadata] = useState("");

  useEffect(() => {
    fetch(props.tokenUri, { headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(response => {
        setTokenMetadata(response)
      })
      .catch(error => console.log(error))
  }, [props.tokenUri])

  let img;
  if (tokenMetadata && tokenMetadata.image) {
    img = <ImageView uri={tokenMetadata.image} />
  }

  return (
    <div>
      {img}
      <textarea readOnly value={JSON.stringify(tokenMetadata, null, 2)} cols="100" rows="100" />
    </div>
  );
};

