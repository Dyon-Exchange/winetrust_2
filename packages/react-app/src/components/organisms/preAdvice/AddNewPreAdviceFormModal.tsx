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

interface AddNewPreAdviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewPreAdviceFormModal = ({
  isOpen,
  onClose,
}: AddNewPreAdviceFormModalProps) => {
  // close modal handler
  const closeModal = () => onClose();

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Pre-Advice</ModalHeader>
        <ModalBody alignSelf="center" w="80%">
          Implement add new pre-advice form here...
        </ModalBody>
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

export default AddNewPreAdviceFormModal;
