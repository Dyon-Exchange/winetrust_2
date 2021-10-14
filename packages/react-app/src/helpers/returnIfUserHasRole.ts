import { WineTrustToken } from "@winetrust/smart-contracts/typechain/WineTrustToken";

export default async (
  userAddress: string,
  WineTrustTokenInstance: WineTrustToken,
  role: string
) => {
  const memberCount = await WineTrustTokenInstance.getRoleMemberCount(role);

  // loop through the admin accounts count to get all the addresses with the admin role
  const userAddresses = await Promise.all(
    [...new Array(memberCount.toNumber())].map((_, idx) =>
      WineTrustTokenInstance.getRoleMember(role, idx)
    )
  );

  return userAddresses.some(
    (address) => address.toLocaleLowerCase() === userAddress.toLocaleLowerCase()
  );
};
