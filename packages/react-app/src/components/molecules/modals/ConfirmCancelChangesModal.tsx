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
  overrideHeader?: string;
  overrideBody?: string;
  isSubmitting?: boolean;
}

const ConfirmCancelChangesModal = ({
  isOpen,
  onClose,
  onConfirm,
  overrideHeader,
  overrideBody,
  isSubmitting,
}: ConfirmCancelChangesModalProps) => (
  <Modal
    closeOnOverlayClick={!isSubmitting}
    closeOnEsc={!isSubmitting}
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{overrideHeader ?? "Are you sure?"}</ModalHeader>
      <ModalBody>
        {overrideBody ?? "Changes you made may not be saved."}
      </ModalBody>
      <ModalFooter>
        <ModalFooterButton
          colorScheme="blue"
          onClick={onConfirm}
          isLoading={isSubmitting}
        >
          Confirm
        </ModalFooterButton>
        <ModalFooterButton
          colorScheme="blue"
          onClick={onClose}
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </ModalFooterButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmCancelChangesModal;
