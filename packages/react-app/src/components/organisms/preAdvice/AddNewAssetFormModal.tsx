import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

interface AddNewAssetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  setAssets: Dispatch<SetStateAction<NewAssetForm[]>>;
}

const AddNewAssetFormModal = ({
  isOpen,
  onClose,
  setAssets,
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
