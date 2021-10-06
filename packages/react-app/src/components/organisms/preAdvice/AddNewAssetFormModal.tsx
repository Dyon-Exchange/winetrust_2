import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

interface AddNewAssetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAssetFormModal = ({
  isOpen,
  onClose,
}: AddNewAssetFormModalProps) => {
  // close modal handler
  const closeModal = () => onClose();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Asset</ModalHeader>
        <ModalBody>Implement add new asset form here...</ModalBody>

        <ModalFooter>
          <ModalFooterButton colorScheme="blue" type="submit">
            Add
          </ModalFooterButton>
          <ModalFooterButton
            colorScheme="blue"
            onClick={closeModal}
            variant="outline"
          >
            Cancel
          </ModalFooterButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewAssetFormModal;
