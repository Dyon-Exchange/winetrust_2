import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";

const InstallMetaMaskModal = () => {
  const isMetaMaskInstalled = window.ethereum;
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
        <ModalBody>You need an Ethereum wallet to use WineTrust.</ModalBody>
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
