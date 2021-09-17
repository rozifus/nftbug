
import React, { useContext, useEffect, useState } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import erc721MetadataJson from "../../contracts/IERC721Metadata.json"
import shopData from "../../data/contract.json"

import { NamespacedDrizzleContractProvider, useNamespacedDrizzleContract } from "./namespaced-drizzle-contract";

const NAMESPACE = "Erc721Metadata"

export const useErc721Metadata = () => useNamespacedDrizzleContract(NAMESPACE);

export default ({ address, children }) => {
    return <NamespacedDrizzleContractProvider
                namespace={NAMESPACE}
                address={address}
                abi={erc721MetadataJson.abi}>
                    {children}
           </NamespacedDrizzleContractProvider>
}