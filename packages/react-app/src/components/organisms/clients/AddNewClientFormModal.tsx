/* eslint-disable react/jsx-props-no-spreading */
import {
  FormErrorMessage,
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
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import CountryData from "country-data";
import { orderBy } from "lodash";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import isEthereumAddress from "validator/lib/isEthereumAddress";
import isMobilePhone from "validator/lib/isMobilePhone";

import createClient from "../../../api/data/clients/createClient";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";

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
  const toast = useDefaultToast();
  const queryClient = useQueryClient();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewClientForm>();

  // submit handler
  const onSubmit = useCallback(
    async (data: NewClientForm) => {
      try {
        // await creating the client and then invalidate the clients query data
        await createClient(data);
        queryClient.invalidateQueries("clients");
        toast({
          title: "Client created.",
          description: "Client created successfully.",
          status: "success",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error creating client.",
          description:
            (error as AxiosError).response?.data ||
            "There was an error trying to create this client, please try again later.",
          status: "error",
        });
      }
    },
    [onClose, queryClient, toast]
  );

  // state for the confirm cancel modal
  const {
    isOpen: isConfirmCancelModalOpen,
    onOpen: openConfirmCancel,
    onClose: closeConfirmCancel,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // close modal handler
  const closeModal = useCallback(
    () => (isDirty ? openConfirmCancel() : onClose()),
    [isDirty, openConfirmCancel, onClose]
  );

  const orderedCountries = useMemo(
    () =>
      orderBy(
        CountryData.callingCountries.all,
        (country) => country.alpha3 || country.alpha2
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [CountryData.callingCountries.all]
  );

  return (
    <>
      <Modal
        closeOnEsc={!isDirty}
        closeOnOverlayClick={!isDirty}
        isOpen={isOpen}
        isCentered
        onClose={closeModal}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Client</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl
                id="firstName"
                isDisabled={isSubmitting}
                isInvalid={errors.firstName !== undefined}
              >
                <FormLabel fontSize="sm">First name</FormLabel>
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="First Name"
                />
                {errors.firstName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.firstName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="lastName"
                isDisabled={isSubmitting}
                isInvalid={errors.lastName !== undefined}
              >
                <FormLabel fontSize="sm">Last name</FormLabel>
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  fontSize="sm"
                  type="text"
                />
                {errors.lastName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.lastName.message}
                  </FormErrorMessage>
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
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.ethAddress.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="phoneNumber"
                isDisabled={isSubmitting}
                isInvalid={errors.phoneNumber !== undefined}
              >
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
                      {orderedCountries.map((country) => {
                        const value = `${country.alpha3 || country.alpha2} (${
                          country.countryCallingCodes[0]
                        })`;
                        return (
                          <option
                            key={country.name}
                            value={country.countryCallingCodes[0]}
                            label={value}
                          />
                        );
                      })}
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
                  />
                </InputGroup>
                {errors.phoneNumber?.countryCode !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.phoneNumber.countryCode.message}
                  </FormErrorMessage>
                )}
                {errors.phoneNumber?.phoneNumber !== undefined &&
                  !errors.phoneNumber?.countryCode && (
                    <FormErrorMessage color={colors.error} fontSize="sm">
                      {errors.phoneNumber.phoneNumber.message}
                    </FormErrorMessage>
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
