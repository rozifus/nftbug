
import React, { useContext, useEffect, useState } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import { v4 as uuidv4 } from 'uuid';

let contexts = {};

export const NamespacedDrizzleContractProvider = ({ namespace, address, abi, children }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
            if (contexts[namespace]) {
                throw Error(`drizzle contract provider namespace "${namespace}" already in use`)
            }

            contexts[namespace] = React.createContext();
            setInit(true);
            return () => {
                delete contexts[namespace];
            }
        },
        [namespace, address, abi]
    );

    if (!contexts[namespace]) {
        return null;
    }

    const provider = contexts[namespace].Provider;
    return <DrizzleContractProvider provider={provider} address={address} abi={abi}>{children}</DrizzleContractProvider>
}

export const useNamespacedDrizzleContract = (namespace) => React.useContext(contexts[namespace])

const DrizzleContractProvider = ({ provider, address, abi, children }) => {
    const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
    const [drizzleContractName, setDrizzleContractName] = useState(null);

    useEffect(() => {
        setDrizzleContractName(address + "--" + uuidv4());
    }, [])

    useEffect(
        (() => {
            const config = {
                contractName: drizzleContractName,
                web3Contract: new drizzle.web3.eth.Contract(abi, address)
            };
        
            drizzle.addContract(config);
  
            return () => {
                drizzle.deleteContract(drizzleContractName);
        }}),
        [drizzleContractName, address, abi]
    );

    const contract = drizzle.contracts[drizzleContractName];
    const state = drizzleState.contracts[drizzleContractName];
    const ready = drizzleContractName && Boolean(contract) && Boolean(state);

    const Provider = provider;

    if (ready) {
        return <Provider value={{ address, drizzleContractName, contract, state, ready }}>{children}</Provider>
    }

    return null
}

/*
const ExportNamespacedDrizzleContract = (namespace) => {
    const ndc = useNamespacedDrizzleContract(namespace)

    return {children(ndc)}
}

const explodeContext = (useFunction, ...params) => ({children}) => {
    const ctx = useFunction(...params)
    return {children(ctx)}
}*/

export default DrizzleContractProvider;