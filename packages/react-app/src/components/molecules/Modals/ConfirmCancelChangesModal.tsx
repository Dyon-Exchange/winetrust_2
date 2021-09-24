import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const StyledButton = styled(Button)`
  margin: 10px 5px;
  width: 100px;
`;

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
        <StyledButton colorScheme="blue" onClick={onConfirm}>
          Confirm
        </StyledButton>
        <StyledButton colorScheme="blue" onClick={onClose} variant="outline">
          Cancel
        </StyledButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmCancelChangesModal;
