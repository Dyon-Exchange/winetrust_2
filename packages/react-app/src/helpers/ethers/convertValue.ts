import { utils } from "ethers";

export const convertWeiToNumber = (weiValue: string) => {
  const stringBalance = utils.formatUnits(weiValue, "ether");
  return parseFloat(stringBalance.toString());
};
export const convertNumberToWei = (numberValue: number) => {
  const weiValue = utils.parseEther(numberValue.toString());
  return weiValue.toString();
};
