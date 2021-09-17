

import React, { useState, useEffect } from 'react';
import { getRawMetadata } from '../util/metadata'

let MetadataContext;
let { Provider } = (MetadataContext = React.createContext())

export const useMetadata = () => React.useContext(MetadataContext).metadata

export const FAILED = "METADATA_FAILED";

export const MetadataProvider = ({ uri, children}) => {
    const [raw, setRaw] = useState(null);

    useEffect(() => {
            const f = async () => {
                try {
                    setRaw(await getRawMetadata(uri))
                } catch {
                    setRaw(FAILED)
                }
            }
            f()
        },
        [uri]
    );

    if (!raw) {
        return null;
    }

    return <Provider value={{ metadata: { raw } }}>{children}</Provider>
}

/*
export const MetadataProviderFromErc721Token = ({ children }) => {
    const { uri, ready } = useErc721Token();

    if (!ready) {
        return null
    }

    return <MetadataProvider uri={uri}>{children}</MetadataProvider>
}
*/

export default MetadataProvider;