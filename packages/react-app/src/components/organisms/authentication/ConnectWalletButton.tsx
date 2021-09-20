import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";

import MetaMaskWolf from "../../../assets/icons/metamask/metamask-fox.svg";
import { WalletContext } from "../../../contexts/WalletContext";

const ConnectWalletButton = () => {
  const isMetaMaskInstalled = window.ethereum;
  const { connect, userDetails } = useContext(WalletContext);

  return (
    <VStack>
      <Heading fontSize="3xl">
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
      {userDetails && (
        <VStack>
          <Text>{`User address: ${userDetails.address}`}</Text>
          <Text>{`User balance: ${userDetails.balance}`}</Text>
        </VStack>
      )}
    </VStack>
  );
};

export default ConnectWalletButton;
