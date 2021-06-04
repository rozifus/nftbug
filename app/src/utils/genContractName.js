import web3 from "web3";

export default (address, interfaceName) => {
  if (!web3.utils.isAddress(address)) {
    return null
  }

  if (!interfaceName) {
    throw new Error(`invalid interface name: "${interfaceName}"`);
  }

  return `${address}-${interfaceName}`;
}
