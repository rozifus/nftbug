import React, { useState, useRef, useEffect } from "react";
import { newContextComponents } from "@drizzle/react-components";
import ierc721json from "../contracts/IERC721.json";

const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value
  }, [value]);

  return ref.current;
} 

export default ({drizzle, drizzleState}) => {
  const [contract, setContract] = useState("");
  const prevContract = usePrevious(contract);
  const contractDrizzled = Boolean(drizzle.contracts[contract]);

  useEffect(() => {
    if (drizzle.web3.utils.isAddress(prevContract)) {
      drizzle.deleteContract(prevContract);
    }

    if (drizzle.web3.utils.isAddress(contract)) {
      const config = {
        contractName: contract,
        web3Contract: new drizzle.web3.eth.Contract(ierc721json.abi, contract)
      };
      drizzle.addContract(config);
    }
  }, [contract])
 
  const style = {
    color: contractDrizzled ? "green" : "red"
  }

  return (
    <div className="section">
      <h2>Metadata Viewer</h2>
      <input type="text" value={contract} onChange={(e) => setContract(e.target.value)} />
      <p>
        <strong>Contract </strong>
        <span style={style}>{contract}</span>
      </p>
    </div>
  );
};