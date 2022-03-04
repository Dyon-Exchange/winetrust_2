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
  VStack,Text, chakra, flexbox
} from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import { GridRowData } from "@mui/x-data-grid";
import React from "react";

import { StyledBox, StyledText, StyledLabel, StyledSeparator } from "../../atoms/chakraModal/StyledBox"
import StyledModalHeader from "../../atoms/chakraModal/StyledModalHeader"


const ClientsModal = (data: GridRowData) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    createdAt,
    ethAddress,
    email,
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
          <StyledModalHeader>Client Details</StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <StyledBox>
                <StyledLabel>ID </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{id}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Ethereum Address </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{ethAddress}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>First Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{firstName}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Last Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{lastName}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Email </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{email}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Phone Number  </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{phoneNumber?.countryCode} {phoneNumber?.phoneNumber}</StyledText>
              </StyledBox>
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
