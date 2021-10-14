import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, Link, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";

import { WalletContext } from "../../../contexts/WalletContext";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";

import MintNFTFormModal from "./MintNFTFormModal";

const MintNFTDisplay = ({ row }: { row: Asset }) => {
  const { userRoles } = useContext(WalletContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useDefaultToast();

  const handleOpen = () => {
    if (!userRoles?.isMinter) {
      toast({
        title: "Error cannot mint",
        description: "You must have the minter role to be able to mint",
        status: "error",
      });
    } else {
      onOpen();
    }
  };

  return (
    <>
      {isOpen && (
        <MintNFTFormModal isOpen={isOpen} onClose={onClose} row={row} />
      )}
      <Button
        colorScheme="blue"
        leftIcon={<AddIcon />}
        fontSize="xs"
        minW="100px"
        size="sm"
        onClick={handleOpen}
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

  return (
    <Link href={`https://goerli.etherscan.io/tx/${row.txHash}`} isExternal>
      View on Etherscan <ExternalLinkIcon mx="2px" />
    </Link>
  );
};

export default NFTDisplayHandler;
