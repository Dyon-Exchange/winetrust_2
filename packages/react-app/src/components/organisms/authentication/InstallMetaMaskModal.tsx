import {
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";

import MetaMaskHorizontal from "../../../assets/icons/metamask/metamask-fox-wordmark-horizontal.svg";

const InstallMetaMaskModal = () => {
  const isMetaMaskInstalled = window.ethereum?.isMetaMask;
  const { isOpen, onClose } = useDisclosure({
    isOpen: !isMetaMaskInstalled,
  });

  const installMetaMask = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  };

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please install MetaMask</ModalHeader>
        <ModalBody>
          <VStack>
            <Image
              alt="MetaMask fox wordmark horizontal"
              alignContent="center"
              src={MetaMaskHorizontal}
              w="60%"
            />
            <Text>You need an Ethereum wallet to use WineTrust.</Text>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" onClick={installMetaMask}>
            Get MetaMask
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InstallMetaMaskModal;
