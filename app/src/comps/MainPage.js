import React, { useState, useRef, useEffect } from "react";
import abiIERC721 from "../contracts/IERC721.abi.json";
import genContractName from "../utils/genContractName";
import ContractArea from "./ContractArea";
import EnumerableCount from "./EnumerableCount";


export default ({drizzle, drizzleState}) => {
  const [contract, setContract] = useState("");
  const contractName = genContractName(contract, "ERC721");
  const validContract = drizzle.web3.utils.isAddress(contract);
  const drizzled721 = Boolean(drizzle.contracts[contractName]);

  const onChangeContractHandler = e => {
    let v = e.target.value && e.target.value.trim();

    setContract(v);
  }

  useEffect(() => {
    if (validContract) {
      const config = {
        contractName,
        web3Contract: new drizzle.web3.eth.Contract(abiIERC721, contract)
      };
      
      drizzle.addContract(config);

      return () => {
        drizzle.deleteContract(contractName);
      }
    }
  },
  [contract, setContract])

  const enumerable = validContract ? 
      <EnumerableCount drizzle={drizzle} drizzleState={drizzleState} contract={contract} />
      : null

  return (
    <div>
      <ContractArea value={contract} onChange={onChangeContractHandler} />
      <p>Contract: {contract}</p>
      <p>Valid: {validContract.toString()}</p>
      <p>Drizzled: {drizzled721.toString()}</p>
      {enumerable}
    </div>
  );
};