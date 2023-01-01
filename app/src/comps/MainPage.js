import React, { useState, useEffect } from "react";

import abiIERC721 from "../interfaces/IERC721.abi.json";
import genContractName from "../utils/genContractName";

import ContractArea from "./__DEP/ContractArea";
import EnumerableCount from "./721Enumerable/EnumerableCount";
import InterfacePanel from "./interface//InterfacePanel";
import MetadataViewer from "./metadata-viewer/MetadataViewer";
import ViewerWrapper from "./metadata-viewer/ViewerWrapper";
import ContractBar from "./ContractBar";
import DebugContract from "./context/debug-contract";
import MetadataViewerDirect from "./metadata-viewer/MetadataViewerDirect";

import { CssBaseline, Toolbar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";


export default ({drizzle, drizzleState}) => {
  const [contract, setContract] = useState("0xec9c519d49856fd2f8133a0741b4dbe002ce211b")
  const contractName = genContractName(contract, "ERC721");
  const validContract = drizzle.web3.utils.isAddress(contract);
  const drizzledContract = Boolean(drizzle.contracts[contractName]);

  const onChangeContractHandler = e => {
    let v = e.target.value && e.target.value.trim();

    let addr = v.match(/(\b0x[a-f0-9]{40}\b)/g)
    if (addr && addr.length) {
      v = addr[addr.length - 1]
    }

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ContractBar contract={contract} connected={drizzledContract} onChangeContract={onChangeContractHandler} />
        <div>
          {validContract && <InterfacePanel drizzle={drizzle} drizzleState={drizzleState} contract={contract} />}
          {/*validContract && <EnumerableCount drizzle={drizzle} drizzleState={drizzleState} contract={contract} />*/}
          {validContract && <MetadataViewerDirect contract={contract} />}
          {/*validContract && <ViewerWrapper contract={contract} />*/}
        </div>
      </Container>
    </React.Fragment>
  );
};