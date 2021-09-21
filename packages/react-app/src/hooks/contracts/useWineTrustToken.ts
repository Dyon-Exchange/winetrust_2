/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import LocalWineTrustTokenJson from "@winetrust/smart-contracts/deployments/localhost/WineTrustToken.json";
import { WineTrustToken__factory } from "@winetrust/smart-contracts/typechain/factories/WineTrustToken__factory";
import { WineTrustToken } from "@winetrust/smart-contracts/typechain/WineTrustToken";
import { providers } from "ethers";
import { hexZeroPad } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface WineTrustTokenContractHook {
  isAdmin: boolean;
}

const useWineTrustToken = ({
  provider,
  userDetails,
}: {
  provider: providers.Web3Provider | undefined;
  userDetails: UserDetails | undefined;
}): WineTrustTokenContractHook => {
  // state for the wine trust token contract instance
  const [wineTrustTokenContract, setWineTrustTokenContract] = useState<
    WineTrustToken | undefined
  >();

  // state whether the current user's address has default admin role
  const [isAdmin, setIsAdmin] = useState(true); // initialise to true so that the warning modal doesn't show initially

  // destructure WineTrustToken json
  const { address } = LocalWineTrustTokenJson;

  // set a wine trust token contract instance
  useEffect(() => {
    if (!provider) return;
    setWineTrustTokenContract(
      WineTrustToken__factory.connect(address, provider)
    );
  }, [address, provider]);

  // checks whether the current user's address has default admin role
  const checkIfUserIsAdmin = useCallback(async () => {
    if (!wineTrustTokenContract || !userDetails) return false;

    // default admin role in the contract
    const defaultAdminRole = hexZeroPad("0x0", 32);
    const adminAccountsCount = await wineTrustTokenContract.getRoleMemberCount(
      defaultAdminRole
    );

    // loop through the admin accounts count to get all the addresses with the admin role
    const adminAddresses: string[] = [];
    for (let i = 0; i < adminAccountsCount.toNumber(); i++) {
      adminAddresses.push(
        await wineTrustTokenContract.getRoleMember(defaultAdminRole, i)
      );
    }

    // return whether the current user's address has default admin role
    return adminAddresses.some(
      (adminAddress) =>
        adminAddress.toLocaleLowerCase() ===
        userDetails.address.toLocaleLowerCase()
    );
  }, [userDetails, wineTrustTokenContract]);

  // run the admin check with the current user's address
  useEffect(() => {
    if (!wineTrustTokenContract || !userDetails) return;
    (async () => setIsAdmin(await checkIfUserIsAdmin()))();
  }, [checkIfUserIsAdmin, userDetails, wineTrustTokenContract]);

  return { isAdmin };
};

export default useWineTrustToken;
