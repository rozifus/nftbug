
import React, { useContext, useEffect, useState } from 'react';

import { NamespacedDrizzleContractProvider, useNamespacedDrizzleContract } from "./namespaced-drizzle-contract";

export const useDebugContract = () => useNamespacedDrizzleContract("DebugContract");

export default ({ address, abi, children }) => {

    return <NamespacedDrizzleContractProvider
                namespace="debug-contract"
                address={address}
                abi={abi}>
                    {children}
           </NamespacedDrizzleContractProvider>
}