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
import React, { useState } from "react";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

interface LandAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (warehouseLocationNo: string) => void;
  overrideHeader?: string;
  overrideBody?: string;
  isSubmitting?: boolean;
  landingProduct?: string;
  landingWarehouse?: string;
  quantity?: string;
  warehouseLocation?: string;
}

const LandAssetModal = ({
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
}: LandAssetModalProps) => {
  const [warehouseLocationNo, setwarehouseLocationNo] = useState("");

  return (
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
          <Input
            fontSize="sm"
            type="text"
            placeholder="Warehouse Location #"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setwarehouseLocationNo(event.currentTarget.value)
            }
          />
        </ModalBody>
        <ModalFooter>
          <ModalFooterButton
            colorScheme="blue"
            onClick={() => onConfirm(warehouseLocationNo)}
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
};

export default LandAssetModal;
