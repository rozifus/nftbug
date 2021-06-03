import Web3 from "web3";

const options = {
  web3: {
    block: false,
    //customProvider: new Web3("ws://localhost:8545"),
  },
  //contracts: [SimpleStorage, ComplexStorage, TutorialToken],
  events: {
    //SimpleStorage: ["StorageSet"],
  },
};

export default options;
