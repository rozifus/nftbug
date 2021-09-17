
import React, { useContext, useEffect, useState } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import { v4 as uuidv4 } from 'uuid';

const DrizzleContract = ({ address, abi }) => {
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

    if (ready) {
        return {children({address, contract, state, ready})}
    }

    return null;
}

export default DrizzleContract;