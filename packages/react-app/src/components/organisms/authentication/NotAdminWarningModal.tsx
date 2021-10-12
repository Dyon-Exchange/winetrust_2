import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { SUPPORTED_NETWORKS } from "../../../constants/network";
import { WalletContext } from "../../../contexts/WalletContext";

import WarningModal from "./WarningModal";

const NotAdminWarningModal = () => {
  const { isAdmin, networkDetails } = useContext(WalletContext);
  // const { isOpen, onClose } = useDisclosure({
  //   isOpen: !isAdmin,
  // });

  if (!networkDetails?.onSupportedNetwork) {
    const supportedNetworks = SUPPORTED_NETWORKS.map(({ name }) => name).join(
      ", "
    );

    return (
      <WarningModal
        title="Non-Supported Network Detected"
        desc={`Check the metamask extension and change your network to ${supportedNetworks}`}
      />
    );
  }

  if (!isAdmin) {
    return (
      <WarningModal
        title="Non-Admin Address Detected"
        desc="Check the metamask extension to change account."
      />
    );
  }

  return null;

  // return (
  //   <Modal
  //     closeOnEsc={false}
  //     closeOnOverlayClick={false}
  //     isCentered
  //     isOpen={isOpen}
  //     onClose={onClose}
  //     size="md"
  //   >
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Non-Admin Address Detected</ModalHeader>
  //       <ModalBody>
  //         <VStack>
  //           <Text>Check the metamask extension to change account.</Text>
  //         </VStack>
  //       </ModalBody>
  //       <ModalFooter />
  //     </ModalContent>
  //   </Modal>
  // );
};

export default NotAdminWarningModal;
