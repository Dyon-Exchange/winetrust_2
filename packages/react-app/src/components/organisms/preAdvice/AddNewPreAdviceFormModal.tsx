import {
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useState } from "react";
import { useQuery } from "react-query";

import searchClients from "../../../api/data/clients/searchClients";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";

interface AddNewPreAdviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewPreAdviceFormModal = ({
  isOpen,
  onClose,
}: AddNewPreAdviceFormModalProps) => {
  // states for search queries
  const [clientSearchQuery, setClientSearchQuery] = useState("");

  // data queries
  const { data: clientsData, isFetching: clientsDataIsFetching } = useQuery(
    ["clients-search", clientSearchQuery],
    async () => {
      const data = await searchClients(clientSearchQuery);
      return data;
    }
  );

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
            <Select
              backspaceRemovesValue
              isClearable
              openMenuOnClick={false}
              openMenuOnFocus={false}
              isLoading={clientsDataIsFetching}
              placeholder="Search client"
              onInputChange={(search: string) => setClientSearchQuery(search)}
              options={clientsData?.map((client: Client) => ({
                value: client,
                label: `${client.firstName} ${client.lastName}`,
              }))}
              styles={{
                input: () => ({
                  fontSize: "14px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "14px",
                }),
                singleValue: () => ({
                  fontSize: "14px",
                }),
              }}
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
