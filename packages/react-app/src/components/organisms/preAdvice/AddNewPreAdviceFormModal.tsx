import {
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import React from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";

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
          {/* Implement add new pre-advice form here... */}
          <ModalFormControl>
            <FormLabel fontSize="sm">Owner</FormLabel>
            <AsyncSelect
              placeholder="Search client"
              styles={{
                input: () => ({
                  fontSize: "14px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "14px",
                }),
              }}
            />
          </ModalFormControl>
          <ModalFormControl>
            <FormLabel fontSize="sm">Test</FormLabel>
            <Input fontSize="sm" placeholder="Placeholder" />
          </ModalFormControl>
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
