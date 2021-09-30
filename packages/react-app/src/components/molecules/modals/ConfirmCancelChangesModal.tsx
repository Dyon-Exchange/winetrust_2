import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

interface ConfirmCancelChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCancelChangesModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmCancelChangesModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Are you sure?</ModalHeader>
      <ModalBody>Changes you made may not be saved.</ModalBody>
      <ModalFooter>
        <ModalFooterButton colorScheme="blue" onClick={onConfirm}>
          Confirm
        </ModalFooterButton>
        <ModalFooterButton
          colorScheme="blue"
          onClick={onClose}
          variant="outline"
        >
          Cancel
        </ModalFooterButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmCancelChangesModal;
