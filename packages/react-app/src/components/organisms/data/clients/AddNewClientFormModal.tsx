import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";

interface AddNewClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewClientFormModal = ({
  isOpen,
  onClose,
}: AddNewClientFormModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add New Client</ModalHeader>
      <ModalBody>Implement add new client form here...</ModalBody>

      <ModalFooter>
        <ModalFooterButton colorScheme="blue" type="submit">
          Add
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

export default AddNewClientFormModal;
