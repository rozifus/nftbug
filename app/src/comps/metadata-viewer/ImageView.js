import React, { useEffect, useState } from "react";

export default (props) => {
  const [imgData, setImgData] = useState("");

  useEffect(() => {
    fetch(props.uri)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(oUrl => {
        setImgData(oUrl)
      })
      .catch(error => console.log(error))
  }, [props.uri])

  return (
    <img src={imgData} />
  );
};

