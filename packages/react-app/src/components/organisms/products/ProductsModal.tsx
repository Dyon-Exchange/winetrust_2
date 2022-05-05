import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
  Image,
} from "@chakra-ui/react";
import { GridRowData } from "@mui/x-data-grid";
import React, { useState } from "react";

import ReadMore from "../../atoms/buttons/ReadMoreButton";
import {
  StyledBox,
  StyledText,
  StyledLabel,
  StyledSeparator,
} from "../../atoms/chakraModal/StyledBox";
import StyledModalHeader from "../../atoms/chakraModal/StyledModalHeader";

const pinataGateway = process.env.REACT_APP_PINATA_GATEWAY;

const ProductsModal = (data: GridRowData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    bottleImage,
    labelImage,
    createdAt,
    description,
    dutyStatus,
    id,
    longName,
    packSize,
    productCode,
    simpleName,
    country,
    region,
    subRegion,
    subSubRegion,
    updatedAt,
    year,
    __v,
    _id,
  } = data;

  const productData: Product = data as Product;

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
          <StyledModalHeader>Product Details</StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <StyledBox>
                <StyledLabel>Product ID </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{id}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Simple Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{simpleName}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Long Name </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{longName}</StyledText>
              </StyledBox>
              {productCode && (
                <StyledBox>
                  <StyledLabel>Product Code </StyledLabel>
                  <StyledSeparator> : </StyledSeparator>
                  <StyledText>{productCode}</StyledText>
                </StyledBox>
              )}
              <StyledBox>
                <StyledLabel>Description </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>
                  <ReadMore>{description}</ReadMore>
                </StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Year </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{year}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Pack Size </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{packSize}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Country </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{country}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Region </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{region}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Sub Region </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{subRegion}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Sub Sub Region </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{subSubRegion}</StyledText>
              </StyledBox>
              {labelImage && (
                <Box>
                  Label Image :
                  <Image
                    src={`${pinataGateway}/${labelImage}`}
                    h="250px"
                  />
                </Box>
              )}
              {bottleImage && (
                <Box>
                  Bottle Image :
                  <Image
                    src={`${pinataGateway}/${bottleImage}`}
                    h="250px"
                  />
                </Box>
              )}
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

export default ProductsModal;
