/* eslint-disable react/jsx-props-no-spreading */
import {
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import CountryData from "country-data";
import React from "react";
import { useForm } from "react-hook-form";
import isEthereumAddress from "validator/lib/isEthereumAddress";
import isMobilePhone from "validator/lib/isMobilePhone";

import createClient from "../../../../api/data/clients/createClient";
import useThemeColors from "../../../../hooks/theme/useThemeColors";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../../molecules/modals/ConfirmCancelChangesModal";

interface AddNewClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewClientFormModal = ({
  isOpen,
  onClose,
}: AddNewClientFormModalProps) => {
  // get theme colors
  const colors = useThemeColors();
  const toast = useToast();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewClientForm>();

  // submit handler
  const onSubmit = async (data: NewClientForm) => {
    try {
      await createClient(data);
      toast({
        title: "Client created.",
        description: "Client created successfully.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating client.",
        description:
          (error as AxiosError).response?.data ||
          "There was an error trying to create this client, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // state for the confirm cancel modal
  const {
    isOpen: isConfirmCancelModalOpen,
    onOpen: openConfirmCancel,
    onClose: closeConfirmCancel,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // close modal handler
  const closeModal = () => (isDirty ? openConfirmCancel() : onClose());

  return (
    <>
      <Modal
        closeOnEsc={!isDirty}
        closeOnOverlayClick={!isDirty}
        isOpen={isOpen}
        isCentered
        onClose={closeModal}
        size="xl"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Client</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl id="firstName" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">First name</FormLabel>
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.firstName !== undefined}
                />
                {errors.firstName !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="lastName" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Last name</FormLabel>
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.lastName !== undefined}
                />
                {errors.lastName !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="ethAddress" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Ethereum address</FormLabel>
                <Input
                  {...register("ethAddress", {
                    required: "Ethereum address is required",
                    validate: (ethAddress: string) =>
                      isEthereumAddress(ethAddress)
                        ? undefined
                        : "Invalid ethereum address",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.ethAddress !== undefined}
                />
                {errors.ethAddress !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.ethAddress.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="phoneNumber" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Phone number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>
                    <Select
                      {...register("phoneNumber.countryCode", {
                        required: "Country code is required",
                      })}
                      fontSize="sm"
                      placeholder="Select"
                      variant="flushed"
                      isInvalid={errors.phoneNumber?.countryCode !== undefined}
                    >
                      {CountryData.callingCountries.all.map((country) => (
                        <option
                          key={country.name}
                          value={country.countryCallingCodes[0]}
                          label={country.countryCallingCodes[0]}
                        />
                      ))}
                    </Select>
                  </InputLeftAddon>
                  <Input
                    {...register("phoneNumber.phoneNumber", {
                      required: "Phone number is required",
                      validate: (phoneNumber: string) =>
                        isMobilePhone(phoneNumber)
                          ? undefined
                          : "Invalid phone number",
                    })}
                    fontSize="sm"
                    type="text"
                    isInvalid={errors.phoneNumber !== undefined}
                  />
                </InputGroup>
                {errors.phoneNumber?.countryCode !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.phoneNumber.countryCode.message}
                  </FormHelperText>
                )}
                {errors.phoneNumber?.phoneNumber !== undefined &&
                  !errors.phoneNumber?.countryCode && (
                    <FormHelperText color={colors.error} fontSize="sm">
                      {errors.phoneNumber.phoneNumber.message}
                    </FormHelperText>
                  )}
              </ModalFormControl>
            </ModalBody>
            <ModalFooter>
              <ModalFooterButton
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Add
              </ModalFooterButton>
              <ModalFooterButton
                colorScheme="blue"
                disabled={isSubmitting}
                onClick={closeModal}
                variant="outline"
              >
                Cancel
              </ModalFooterButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <ConfirmCancelChangesModal
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancel}
        onConfirm={onClose}
      />
    </>
  );
};

export default AddNewClientFormModal;
