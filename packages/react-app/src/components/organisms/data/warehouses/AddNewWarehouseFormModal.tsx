/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import useThemeColors from "../../../../hooks/theme/useThemeColors";
import ConfirmCancelChangesModal from "../../../molecules/Modals/ConfirmCancelChangesModal";

const StyledButton = styled(Button)`
  margin: 10px 5px;
  width: 100px;
`;

const StyledFormControl = styled(FormControl)`
  margin: 15px 0px;
`;

interface AddNewWareHouseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewWarehouseFormModal = ({
  isOpen,
  onClose,
}: AddNewWareHouseFormModalProps) => {
  // get theme colors
  const colors = useThemeColors();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewWarehouseForm>();

  // submit handler
  const onSubmit = async (data: NewWarehouseForm) => {
    // TODO: implement request to create new warehouse
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
        isCentered
        isOpen={isOpen}
        onClose={closeModal}
        size="xl"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Warehouse</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <StyledFormControl id="warehouseName" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Warehouse name</FormLabel>
                <Input
                  {...register("warehouseName", {
                    required: "Warehouse name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.warehouseName !== undefined}
                />
                {errors.warehouseName !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.warehouseName.message}
                  </FormHelperText>
                )}
              </StyledFormControl>

              <StyledFormControl
                id="warehouseAddress"
                isDisabled={isSubmitting}
              >
                <FormLabel fontSize="sm">Warehouse address</FormLabel>
                <Input
                  {...register("warehouseAddress", {
                    required: "Warehouse address is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.warehouseAddress !== undefined}
                />
                {errors.warehouseAddress !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.warehouseAddress.message}
                  </FormHelperText>
                )}
              </StyledFormControl>

              <StyledFormControl id="contactName" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Contact name</FormLabel>
                <Input
                  {...register("contactName", {
                    required: "Contact name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.contactName !== undefined}
                />
                {errors.contactName !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.contactName.message}
                  </FormHelperText>
                )}
              </StyledFormControl>

              <StyledFormControl id="contactEmail" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Contact email address</FormLabel>
                <Input
                  {...register("contactEmail", {
                    required: "Contact email address is required",
                    validate: (email?: string) =>
                      isEmail(email || "")
                        ? undefined
                        : "Invalid email address",
                  })}
                  fontSize="sm"
                  type="email"
                  isInvalid={errors.contactEmail !== undefined}
                />
                {errors.contactEmail !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.contactEmail.message}
                  </FormHelperText>
                )}
              </StyledFormControl>
            </ModalBody>
            <ModalFooter>
              <StyledButton colorScheme="blue" type="submit">
                Add
              </StyledButton>
              <StyledButton
                colorScheme="blue"
                onClick={closeModal}
                variant="outline"
              >
                Cancel
              </StyledButton>
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

export default AddNewWarehouseFormModal;
