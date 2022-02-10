import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { GridRowData } from "@mui/x-data-grid";
import React from "react";

import { StyledBox, StyledText, StyledLabel, StyledSeparator } from "../../atoms/chakraModal/StyledBox"
import StyledModalHeader from "../../atoms/chakraModal/StyledModalHeader"

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
          <StyledModalHeader>Warehouse Details</StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <StyledBox>
                <StyledLabel>ID</StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{id}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{name}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Address </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{address}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Contact Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{contactName}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Contact Email</StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{contactEmail}</StyledText>
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

export default WarehousesModal;
