/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import LocalWineTrustTokenJson from "@winetrust/smart-contracts/deployments/localhost/WineTrustToken.json";
import { WineTrustToken__factory } from "@winetrust/smart-contracts/typechain/factories/WineTrustToken__factory";
import { WineTrustToken } from "@winetrust/smart-contracts/typechain/WineTrustToken";
import { ContractTransaction, providers } from "ethers";
import { hexZeroPad } from "ethers/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_ADMIN_ROLE } from "../../constants/roles";

export interface WineTrustTokenAPI {
  mintNFT: (to: string, metadataHash: string) => Promise<string>;
  grantRole: (role: string, to: string) => Promise<ContractTransaction>;
}
interface WineTrustTokenInstanceHook {
  isAdmin: boolean;
  wineTrustTokenAPI: WineTrustTokenAPI | undefined;
}

const useWineTrustTokenInstance = ({
  provider,
  userDetails,
  networkDetails,
}: {
  provider: providers.JsonRpcSigner | undefined;
  userDetails: UserDetails | undefined;
  networkDetails: NetworkDetails | undefined;
}): WineTrustTokenInstanceHook => {
  // state for the wine trust token contract instance
  const [WineTrustTokenInstance, setWineTrustTokenInstance] = useState<
    WineTrustToken | undefined
  >();

  // state whether the current user's address has default admin role
  const [isAdmin, setIsAdmin] = useState(true); // initialise to true so that the warning modal doesn't show initially

  // destructure WineTrustTokenInstance json
  const { address } = LocalWineTrustTokenJson;

  // set a wine trust token contract instance
  useEffect(() => {
    if (!provider) return;
    setWineTrustTokenInstance(
      WineTrustToken__factory.connect(address, provider)
    );
  }, [address, provider]);

  // checks whether the current user's address has default admin role
  const checkIfUserIsAdmin = useCallback(async () => {
    if (
      !WineTrustTokenInstance ||
      !userDetails ||
      !networkDetails?.onSupportedNetwork
    )
      return false;

    // default admin role in the contract

    const adminAccountsCount = await WineTrustTokenInstance.getRoleMemberCount(
      DEFAULT_ADMIN_ROLE
    );

    // loop through the admin accounts count to get all the addresses with the admin role
    const adminAddresses = await Promise.all(
      [...new Array(adminAccountsCount.toNumber())].map((_, idx) =>
        WineTrustTokenInstance.getRoleMember(DEFAULT_ADMIN_ROLE, idx)
      )
    );

    // return whether the current user's address has default admin role
    return adminAddresses.some(
      (adminAddress) =>
        adminAddress.toLocaleLowerCase() ===
        userDetails.address.toLocaleLowerCase()
    );
  }, [userDetails, WineTrustTokenInstance, networkDetails]);

  // run the admin check with the current user's address
  useEffect(() => {
    if (!WineTrustTokenInstance || !userDetails) return;
    (async () => setIsAdmin(await checkIfUserIsAdmin()))();
  }, [checkIfUserIsAdmin, userDetails, WineTrustTokenInstance]);

  const wineTrustTokenAPI = useMemo(() => {
    if (!WineTrustTokenInstance) return undefined;

    return {
      mintNFT: async (to: string, metadataHash: string) => {
        const data = await WineTrustTokenInstance.mintNFT(to, metadataHash);
        return data.hash;
      },
      grantRole: async (role: string, to: string) =>
        WineTrustTokenInstance.grantRole(role, to),
    };
  }, [WineTrustTokenInstance]);

  return { isAdmin, wineTrustTokenAPI };
};

export default useWineTrustTokenInstance;
