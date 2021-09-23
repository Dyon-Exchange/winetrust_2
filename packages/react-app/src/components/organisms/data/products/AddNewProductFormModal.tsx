import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";

interface AddNewProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewProductFormModal = ({
  isOpen,
  onClose,
}: AddNewProductFormModalProps) => {
  // close modal handler
  const closeModal = () => onClose();
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalBody>Implement create product form here...</ModalBody>
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
    </>
  );
};

export default AddNewProductFormModal;
