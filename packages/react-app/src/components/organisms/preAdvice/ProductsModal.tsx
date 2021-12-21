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
import { GridCellValue } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";


const ProductsModal = (data: GridCellValue) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getTableData = async() => {
    const tableData = await axios.get(`/pre-advice/assets/${data}`);
    console.log(JSON.stringify(tableData))
    onOpen()
  }
  return (
    <>
      {/* eslint-disable-next-line */}
      <Button
        colorScheme="blue"
        leftIcon={<ViewIcon />}
        fontSize="xs"
        minW="100px"
        size="sm"
        onClick={() => getTableData()}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{data}</ModalBody>

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

export default ProductsModal;
