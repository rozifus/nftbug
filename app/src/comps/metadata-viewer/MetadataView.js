import React, { useEffect, useState } from "react";
import { useMetadata } from "../context/metadata";


export default (props) => {
  const { metadata, ready } = useMetadata();

  return (
    <div>
      <textarea readOnly value={JSON.stringify(metadata, null, 2)} cols="100" rows="100" />
    </div>
  );
};

