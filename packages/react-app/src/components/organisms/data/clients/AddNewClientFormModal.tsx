/* eslint-disable react/jsx-props-no-spreading */
import {
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import isEthereumAddress from "validator/lib/isEthereumAddress";

import useThemeColors from "../../../../hooks/theme/useThemeColors";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";

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

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewClientForm>();

  // submit handler
  const onSubmit = async (data: NewClientForm) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} size="xl">
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
          </ModalBody>
          <ModalFooter>
            <ModalFooterButton colorScheme="blue" type="submit">
              Add
            </ModalFooterButton>
            <ModalFooterButton
              colorScheme="blue"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </ModalFooterButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddNewClientFormModal;
