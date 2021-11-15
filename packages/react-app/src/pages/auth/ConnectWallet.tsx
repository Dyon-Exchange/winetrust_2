import { Center } from "@chakra-ui/react";
import React from "react";

import ConnectWalletButton from "../../components/organisms/authentication/ConnectWalletButton";
import InstallMetaMaskModal from "../../components/organisms/authentication/InstallMetaMaskModal";

const ConnectWallet = () => (
  <Center my="100px">
    <ConnectWalletButton />
    <InstallMetaMaskModal />
  </Center>
);

export default ConnectWallet;
