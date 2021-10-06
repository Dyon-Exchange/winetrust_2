import {
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import searchClients from "../../../api/data/clients/searchClients";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import StyledChakraReactSelect from "../../atoms/inputs/StyledChakraReactSelect";

interface AddNewPreAdviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewPreAdviceFormModal = ({
  isOpen,
  onClose,
}: AddNewPreAdviceFormModalProps) => {
  const toast = useToast();

  // states for search queries
  const [clientSearchQuery, setClientSearchQuery] = useState("");

  // data queries
  const {
    data: clientsData,
    error: clientsError,
    isError: clientsIsError,
    isFetching: clientsDataIsFetching,
  } = useQuery(["clients-search", clientSearchQuery], async () => {
    const data = await searchClients(clientSearchQuery);
    return data;
  });

  // pop a toast for any of the search queries errors
  useEffect(() => {
    if (clientsIsError && clientsError) {
      toast({
        title: "Error searching for clients.",
        description:
          (clientsError as AxiosError).response?.data ||
          "There was an error searching for clients, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [clientsError, clientsIsError, toast]);

  // close modal handler
  const closeModal = () => onClose();

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Pre-Advice</ModalHeader>
        <ModalBody alignSelf="center" w="80%">
          {/* Implement add new pre-advice form here... */}
          <ModalFormControl>
            <FormLabel fontSize="sm">Owner</FormLabel>
            <StyledChakraReactSelect
              isLoading={clientsDataIsFetching}
              placeholder="Search client"
              onInputChange={(search: string) => setClientSearchQuery(search)}
              options={clientsData?.map((client: Client) => ({
                value: client,
                label: `${client.firstName} ${client.lastName}`,
              }))}
            />
          </ModalFormControl>
          <ModalFormControl>
            <FormLabel fontSize="sm">Test</FormLabel>
            <Input fontSize="sm" placeholder="Placeholder" />
          </ModalFormControl>
        </ModalBody>
        <ModalFooter>
          <ModalFooterButton colorScheme="blue" type="submit">
            Add
          </ModalFooterButton>
          <ModalFooterButton
            colorScheme="blue"
            onClick={closeModal}
            variant="outline"
          >
            Cancel
          </ModalFooterButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewPreAdviceFormModal;
