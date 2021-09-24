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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import useThemeColors from "../../../../hooks/theme/useThemeColors";
import createWarehouse from "../../../../requests/data/warehouses/createWarehouse";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../../molecules/Modals/ConfirmCancelChangesModal";

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
  const toast = useToast();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewWarehouseForm>();

  // submit handler
  const onSubmit = async (data: NewWarehouseForm) => {
    try {
      await createWarehouse(data);
      toast({
        title: "Warehouse created.",
        description: "Warehouse created successfully.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating warehouse.",
        description:
          (error as AxiosError).response?.data ||
          "There was an error trying to create this warehouse, please try again later.",
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
              <ModalFormControl id="warehouseName" isDisabled={isSubmitting}>
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
              </ModalFormControl>

              <ModalFormControl id="warehouseAddress" isDisabled={isSubmitting}>
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
              </ModalFormControl>

              <ModalFormControl id="contactName" isDisabled={isSubmitting}>
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
              </ModalFormControl>

              <ModalFormControl id="contactEmail" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Contact email address</FormLabel>
                <Input
                  {...register("contactEmail", {
                    required: "Contact email address is required",
                    validate: (email: string) =>
                      isEmail(email) ? undefined : "Invalid email address",
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

export default AddNewWarehouseFormModal;
