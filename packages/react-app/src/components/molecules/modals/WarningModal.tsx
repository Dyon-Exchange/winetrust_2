import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  desc: string;
}

const WarningModal = ({ title, desc }: Props) => (
  <Modal
    closeOnEsc={false}
    closeOnOverlayClick={false}
    isCentered
    isOpen
    // Override the onClose as the modal is blocking and cannot be closed
    onClose={() => {}}
    size="md"
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <VStack>
          <Text>{desc}</Text>
        </VStack>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default WarningModal;
