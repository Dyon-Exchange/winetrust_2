import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { StringIterator } from "lodash";
import React from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

interface ConfirmCancelChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  overrideHeader?: string;
  overrideBody?: string;
  isSubmitting?: boolean;
  landingProduct?: string;
  landingWarehouse?: string;
  quantity?: string;
  warehouseLocation?: string;
}

const ConfirmCancelChangesModal = ({
  isOpen,
  onClose,
  onConfirm,
  overrideHeader,
  overrideBody,
  isSubmitting,
  landingProduct,
  landingWarehouse,
  quantity,
  warehouseLocation,
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
      <ModalBody>{landingProduct}</ModalBody>
      <ModalBody>{landingWarehouse}</ModalBody>
      <ModalBody>{quantity}</ModalBody>
      <ModalBody>{warehouseLocation}</ModalBody>
      <ModalBody id="warehouseLocationNo">
        <FormLabel fontSize="sm">Warehouse Location #</FormLabel>
        <Input fontSize="sm" type="text" placeholder="Warehouse Location #" />
      </ModalBody>
      <ModalFooter>
        <ModalFooterButton
          colorScheme="blue"
          onClick={onConfirm}
          isLoading={isSubmitting}
        >
          Land Now
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
