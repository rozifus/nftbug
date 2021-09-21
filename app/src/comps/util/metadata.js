
export const getRawMetadata = uri => {
  return fetch(uri, { headers: {
      'mode': 'no-cors',
      'Content-Type': 'application/json'
    } })
    .then(validateResponse)
    .then(res => res.json())
};

const validateResponse = res => {
  if (!res.ok) {
    console.log("oh no", res.statusText)
    throw new Error(res.statusText);
  }
  return res;
}

export const getMetadataObject = uri => {
  return getRawMetadata(uri)
}

export const getImageFromUri = uri => {
  return fetch(uri)
    .then(validateResponse)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
}

export default {
  getRawMetadata,
  getMetadataObject
}

