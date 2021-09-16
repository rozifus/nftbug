
import React, { useContext, useEffect, useState } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import { v4 as uuidv4 } from 'uuid';

let DrizzleContractContext;
let { Provider } = (DrizzleContractContext = React.createContext())


//export const useShop = () => React.useContext(DrizzleContractContext).shop

export default ({ address, abi, children }) => {
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
        [drizzleContractName]
    );

    const contract = drizzle.contracts[drizzleContractName];
    const state = drizzleState.contracts[drizzleContractName];
    const ready = drizzleContractName && Boolean(contract) && Boolean(state);

    return <Provider value={{ shop: { address, drizzleContractName, contract, state, ready } }}>{children}</Provider>
}