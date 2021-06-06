const InterfaceIds = artifacts.require("InterfaceIds");

const logId = async (inst, selector) => {
  const res = selector + " : " + (await inst.getInterfaceId.call(selector));
  console.log(res);
}

contract("Interface Ids", async accounts => {
  it("...should list them.", async () => {
    const ii = await InterfaceIds.deployed();

    await logId(ii, "IERC165");
    await logId(ii, "IERC721");
    await logId(ii, "IERC721Enumerable");
    await logId(ii, "IERC777");
    await logId(ii, "IERC1155");
  });
});
