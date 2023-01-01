import React, { useState, useContext } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc721json from "../../interfaces/IERC721.abi.json"
import MetadataView from "./MetadataView";

import { DrizzleContext } from "@drizzle/react-plugin";
import Erc721Provider, { useErc721 } from "../context/erc721";
import { Erc721TokenProviderFromErc721 } from "../context/erc721Metadata3";
import MetadataProvider, { MetadataProviderFromErc721Token } from "../context/metadata";


const MetadataViewer = (props) => {
  //const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const { address, drizzleContractName, contract: contract2, state:state2, ready } = useErc721();

  /*const [state, setState] = useState({
    validContract: null,
    contract: "",
    tokenId: "",
    metadataOut: "",
    tokenUriOut: "",
    tokenUriDataKey: null,
  });
  */

  const [tokenId, setTokenId] = useState("");

    //this.contractChange = this.contractChange.bind(this);
    //this.tokenIdChange = this.tokenIdChange.bind(this);

    //const { drizzle } = this.props;
    //this.drizzle = drizzle;

  /*
  contractChange(event) {
    const val = event.target.value;

    if (this.state.validContract) {
      this.drizzle.deleteContract(this.state.validContract);
    }

    if (this.drizzle.web3.utils.isAddress(val)) {
      const config = {
        contractName: val,
        web3Contract: new this.drizzle.web3.eth.Contract(erc721json.abi, val)
      }
      this.drizzle.addContract(config)
      this.setState({validContract: val})
    } else {
      this.setState({validContract: null})
    }

    this.setState({contract: event.target.value});
  }
  */

  const tokenIdChange = (event) => {
    const tokenId = event.target.value
    setTokenId(tokenId)

/*    if (!Boolean(this.state.validContract)) {
      return
    }

    const contract = this.drizzle.contracts[this.state.validContract]
    const tokenUriDataKey = contract.methods["tokenURI"].cacheCall(tokenId);
    this.setState({tokenUriDataKey: tokenUriDataKey});*/
  }

  console.log(address)

  /*
  const contract = drizzleState.contracts[state.validContract];
  let tokenUri
  if (contract) {
    tokenUri = contract.tokenURI[state.tokenUriDataKey]
  } else {
    tokenUri = ""
  }

  console.log(tokenUri)
  */
  

  return (
    <div className="section">
      <h2>Metadata Viewer</h2>
      <input type="text" value={address} /*onChange={this.contractChange}*/ />
      <p>
        <strong>Contract </strong>
        { address }
      </p>
      
      <input type="text" value={tokenId} onChange={tokenIdChange} />
      <hr />
      {tokenId ? <Erc721TokenProviderFromErc721 tokenId={tokenId}>
        <MetadataProviderFromErc721Token>
          <MetadataView />
        </MetadataProviderFromErc721Token>
      </Erc721TokenProviderFromErc721>
      : null
      }
   </div>
  );
};

/*
     <textarea readOnly value={tokenUri && tokenUri.value} cols="100" />
      <MetadataView tokenUri={tokenUri && tokenUri.value} />
*/

export default MetadataViewer;