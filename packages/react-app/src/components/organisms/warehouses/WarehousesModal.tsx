import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GridRowData } from "@mui/x-data-grid";
import React from "react";



const WarehousesModal = (data: GridRowData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    address,
    contactEmail,
    contactName,
    createdAt,
    id,
    name,
    updatedAt,
    __v,
    _id,
  } = data

    return (
    <>
      {/* eslint-disable-next-line */}
      <Button
        colorScheme="blue"
        leftIcon={<ViewIcon />}
        fontSize="xs"
        minW="100px"
        size="sm"
        onClick={() => onOpen()}
      >
        See Details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warehouse Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ID: {_id}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WarehousesModal;
