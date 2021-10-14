/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import WineTrustTokenJSON from "@winetrust/smart-contracts/deployments/goerli/WineTrustToken.json";
import { WineTrustToken__factory } from "@winetrust/smart-contracts/typechain/factories/WineTrustToken__factory";
import { WineTrustToken } from "@winetrust/smart-contracts/typechain/WineTrustToken";
import { ContractTransaction, providers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_ADMIN_ROLE, MINTER_ROLE } from "../../constants/roles";
import returnIfUserHasRole from "../../helpers/returnIfUserHasRole";

interface WineTrustTokenAPI {
  mintNFT: (to: string, metadataHash: string) => Promise<string>;
  grantRole: (role: string, to: string) => Promise<ContractTransaction>;
}
export interface WineTrustTokenInstanceHook {
  userRoles: { isAdmin: boolean; isMinter: boolean } | undefined;
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

  const [userRoles, setUserRoles] =
    useState<WineTrustTokenInstanceHook["userRoles"]>();

  // destructure WineTrustTokenInstance json
  const { address } = WineTrustTokenJSON;

  // set a wine trust token contract instance
  useEffect(() => {
    if (!provider) return;
    setWineTrustTokenInstance(
      WineTrustToken__factory.connect(address, provider)
    );
  }, [address, provider]);

  // checks whether the current user's address has default admin role
  const updateUserAccessControls = useCallback(async () => {
    if (
      !WineTrustTokenInstance ||
      !userDetails ||
      !networkDetails?.onSupportedNetwork
    )
      return;

    const [hasAdminRole, hasMinterRole] = await Promise.all([
      returnIfUserHasRole(
        userDetails.address,
        WineTrustTokenInstance,
        DEFAULT_ADMIN_ROLE
      ),
      returnIfUserHasRole(
        userDetails.address,
        WineTrustTokenInstance,
        MINTER_ROLE
      ),
    ]);

    setUserRoles({ isAdmin: hasAdminRole, isMinter: hasMinterRole });
  }, [userDetails, WineTrustTokenInstance, networkDetails]);

  // run the admin check with the current user's address
  useEffect(() => {
    if (!WineTrustTokenInstance || !userDetails) return;
    updateUserAccessControls();
  }, [userDetails, WineTrustTokenInstance, updateUserAccessControls]);

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

  return { userRoles, wineTrustTokenAPI };
};

export default useWineTrustTokenInstance;
