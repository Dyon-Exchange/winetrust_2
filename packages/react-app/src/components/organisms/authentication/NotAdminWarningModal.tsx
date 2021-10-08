import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { WalletContext } from "../../../contexts/WalletContext";

const NotAdminWarningModal = () => {
  const { isAdmin } = useContext(WalletContext);
  const { isOpen, onClose } = useDisclosure({
    isOpen: !isAdmin,
  });

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Non-Admin Address Detected</ModalHeader>
        <ModalBody>
          <VStack>
            <Text>Check the metamask extension to change account.</Text>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default NotAdminWarningModal;
