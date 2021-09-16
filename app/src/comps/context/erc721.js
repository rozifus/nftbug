
import React, { useContext, useEffect, useState } from 'react';
// import { DrizzleContext } from "@drizzle/react-plugin";
import erc721json from '../../interfaces/IERC721.abi.json';

import { NamespacedDrizzleContractProvider, useNamespacedDrizzleContract } from "./namespaced-drizzle-contract";

const Erc721Namespace = "erc721"

export const useErc721 = () => useNamespacedDrizzleContract(Erc721Namespace);

export const Erc721Provider = ({ address, children }) => {

    return <NamespacedDrizzleContractProvider
                namespace={Erc721Namespace}
                address={address}
                abi={erc721json}>
                    {children}
           </NamespacedDrizzleContractProvider>
}

export default Erc721Provider