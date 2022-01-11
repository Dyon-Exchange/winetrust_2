import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { GridRowData } from "@mui/x-data-grid";
import React from "react";



const ClientsModal = (data: GridRowData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    createdAt,
    ethAddress,
    firstName,
    id,
    lastName,
    phoneNumber,
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
          <ModalHeader>Client Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <Box>ID : {id}</Box>
              <Box>First Name : {firstName} </Box>
              <Box>Last Name : {lastName}</Box>
              <Box>Ethereum Address : {ethAddress}</Box>
              <Box>Phone Number : {phoneNumber.countryCode} {phoneNumber.phoneNumber}</Box>
            </VStack>
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

export default ClientsModal;
