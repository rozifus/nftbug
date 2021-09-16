
import React, { useContext, useEffect, useState } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import NFTShop from '../../contracts/NFTShop.json';
import shopData from "../../data/contract.json"

import { NamespacedDrizzleContractProvider, useNamespacedDrizzleContract } from "./namespaced-drizzle-contract";

export const useDebugAddress = () => useNamespacedDrizzleContract("DebugAddress");

export default ({ children }) => {
    const { address } = shopData;
    const { abi } = NFTShop;

    return <NamespacedDrizzleContractProvider
                namespace="shop"
                address={address}
                abi={abi}>
                    {children}
           </NamespacedDrizzleContractProvider>
}