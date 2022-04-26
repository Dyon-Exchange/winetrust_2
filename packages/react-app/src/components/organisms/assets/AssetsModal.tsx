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

const AssetsModal = (data: GridRowData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const assetData: Asset = data as Asset;

  const {
    bottleImage,
    bottleImage2,
    description,
    image,
    labelImage,
    labelImage2,
    longName,
    marketingImage1,
    marketingImage2,
    marketingImage3,
    marketingImage4,
    packSize,
    productCode,
    simpleName,
    country,
    region,
    subRegion,
    subSubRegion,
    year,
  } = assetData.product;

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
          <StyledModalHeader>Asset Details</StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <StyledBox>
                <StyledLabel>Asset ID </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{assetData.assetId}</StyledText>
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
              <StyledBox>
                <StyledLabel>Date Landed </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{assetData.landedAt}</StyledText>
              </StyledBox>
              <StyledBox>
                <StyledLabel>Date Tokenised </StyledLabel>
                <StyledSeparator> : </StyledSeparator>
                <StyledText>{assetData.tokenisedAt}</StyledText>
              </StyledBox>
              {image && (
                <Box>
                  Image :
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${image}`}
                    h="250px"
                  />
                </Box>
              )}
              {labelImage && (
                <Box>
                  Label Image :
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${labelImage}`}
                    h="250px"
                  />
                </Box>
              )}
              {labelImage2 && (
                <Box>
                  Label Image 2:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${labelImage2}`}
                    h="250px"
                  />
                </Box>
              )}
              {bottleImage && (
                <Box>
                  Bottle Image :
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${bottleImage}`}
                    h="250px"
                  />
                </Box>
              )}
              {bottleImage2 && (
                <Box>
                  Bottle Image 2:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${bottleImage2}`}
                    h="250px"
                  />
                </Box>
              )}
              {marketingImage1 && (
                <Box>
                  Marketing Image 1:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage1}`}
                    h="250px"
                  />
                </Box>
              )}
              {marketingImage2 && (
                <Box>
                  Marketing Image 2:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage2}`}
                    h="250px"
                  />
                </Box>
              )}
              {marketingImage3 && (
                <Box>
                  Marketing Image 3:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage3}`}
                    h="250px"
                  />
                </Box>
              )}
              {marketingImage4 && (
                <Box>
                  Marketing Image 4:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage4}`}
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

export default AssetsModal;
