import { Button, Heading, Image, Spinner, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";

import MetaMaskWolf from "../../../assets/icons/metamask/metamask-fox.svg";
import { WalletContext } from "../../../contexts/WalletContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";

const ConnectWalletButton = () => {
  const isMetaMaskInstalled = window.ethereum;
  const { connect, initialising } = useContext(WalletContext);
  const colors = useThemeColors();

  if (initialising) return <Spinner color={colors.primary} />;

  return (
    <VStack>
      <Heading fontSize="3xl" px="15px" textAlign="center">
        Connect your Ethereum wallet to start using WineTrust
      </Heading>
      <Image alt="MetaMask wolf" src={MetaMaskWolf} w="25%" />
      <Button
        colorScheme="blue"
        disabled={!isMetaMaskInstalled}
        onClick={connect}
      >
        Connect
      </Button>
    </VStack>
  );
};

export default ConnectWalletButton;
