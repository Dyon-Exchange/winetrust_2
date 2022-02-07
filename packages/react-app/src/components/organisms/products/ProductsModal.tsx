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
  Image,
} from "@chakra-ui/react";
import { GridRowData } from "@mui/x-data-grid";
import React from "react";

const ProductsModal = (data: GridRowData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    bottleImage,
    createdAt,
    description,
    dutyStatus,
    id,
    image,
    labelImage,
    longName,
    marketingImage1,
    marketingImage2,
    marketingImage3,
    marketingImage4,
    packSize,
    productId,
    region,
    simpleName,
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
          <ModalHeader>Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" align="start">
              <Box>Product ID : {id}</Box>
              <Box>Simple Name : {simpleName}</Box>
              <Box>Long Name : {longName}</Box>
              <Box>Description : {description}</Box>
              <Box>Year : {year}</Box>
              <Box>Duty Status : : {dutyStatus}</Box>
              <Box>Pack Size : {packSize}</Box>
              <Box>Region : {region}</Box>
              <Box>Sub Region : {subRegion}</Box>
              <Box>Sub Sub Region : {subSubRegion}</Box>
              {image && (
                <Box>
                  Image :
                  <Image src={`https://gateway.pinata.cloud/ipfs/${image}`} />
                </Box>
              )}
              {labelImage && (
                <Box>
                  Label Image :
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${labelImage}`}
                  />
                </Box>
              )}
              {bottleImage && (
                <Box>
                  Bottle Image :
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${bottleImage}`}
                  />
                </Box>
              )}
              {marketingImage1 && (
                <Box>
                  Marketing Image 1:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage1}`}
                  />
                </Box>
              )}
              {marketingImage2 && (
                <Box>
                  Marketing Image 2:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage2}`}
                  />
                </Box>
              )}
              {marketingImage3 && (
                <Box>
                  Marketing Image 3:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage3}`}
                  />
                </Box>
              )}
              {marketingImage4 && (
                <Box>
                  Marketing Image 4:
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${marketingImage4}`}
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
