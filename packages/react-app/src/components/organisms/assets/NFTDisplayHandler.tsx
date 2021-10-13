import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import React from "react";

import MintNFTFormModal from "./MintNFTFormModal";

const MintNFTDisplay = ({ row }: { row: Asset }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  // Product-> ProductName
  // Product -> description
  // Product -> Image?
  // Input -> Uploaded for condition report
  //   Input -> External URL
  // Product -> skuCode
  // Asset -> _id
  // Produuct -> year

  // The remaining fields in the metadata example

  // Preadvice -> arrivalWarehouse -> _id

  return (
    <>
      <MintNFTFormModal isOpen={isOpen} onClose={onClose} row={row} />
      <Button
        colorScheme="blue"
        leftIcon={<AddIcon />}
        fontSize="xs"
        minW="100px"
        size="sm"
        onClick={onOpen}
      >
        Mint NFT
      </Button>
    </>
  );
};

const NFTDisplayHandler = ({ row }: { row: Asset }) => {
  if (!row.txHash) {
    return <MintNFTDisplay row={row} />;
  }

  if (!row.tokenId) {
    // Still minting, display something
    return <>Minting...</>;
  }

  return <>{row.tokenId}</>;
};

export default NFTDisplayHandler;
