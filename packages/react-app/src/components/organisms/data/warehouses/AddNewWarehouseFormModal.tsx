/* eslint-disable react/jsx-props-no-spreading */
import {
  FormErrorMessage,
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
import { AxiosError } from "axios";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import isEmail from "validator/lib/isEmail";

import createWarehouse from "../../../../api/data/warehouses/createWarehouse";
import useThemeColors from "../../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../../hooks/toast/useDefaultToast";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../../molecules/modals/ConfirmCancelChangesModal";

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
  const toast = useDefaultToast();
  const queryClient = useQueryClient();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewWarehouseForm>();

  // submit handler
  const onSubmit = useCallback(
    async (data: NewWarehouseForm) => {
      try {
        // await creating the warehouse and then invalidate the warehouses query data
        await createWarehouse(data);
        queryClient.invalidateQueries("warehouses");
        toast({
          title: "Warehouse created.",
          description: "Warehouse created successfully.",
          status: "success",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error creating warehouse.",
          description:
            (error as AxiosError).response?.data ||
            "There was an error trying to create this warehouse, please try again later.",
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

  return (
    <>
      <Modal
        closeOnEsc={!isDirty}
        closeOnOverlayClick={!isDirty}
        isCentered
        isOpen={isOpen}
        onClose={closeModal}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Warehouse</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl
                id="warehouseName"
                isDisabled={isSubmitting}
                isInvalid={errors.warehouseName !== undefined}
              >
                <FormLabel fontSize="sm">Warehouse name</FormLabel>
                <Input
                  {...register("warehouseName", {
                    required: "Warehouse name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Warehouse name"
                />
                {errors.warehouseName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.warehouseName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="warehouseAddress"
                isDisabled={isSubmitting}
                isInvalid={errors.warehouseAddress !== undefined}
              >
                <FormLabel fontSize="sm">Warehouse address</FormLabel>
                <Input
                  {...register("warehouseAddress", {
                    required: "Warehouse address is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Warehouse address"
                />
                {errors.warehouseAddress !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.warehouseAddress.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="contactName"
                isDisabled={isSubmitting}
                isInvalid={errors.contactName !== undefined}
              >
                <FormLabel fontSize="sm">Contact name</FormLabel>
                <Input
                  {...register("contactName", {
                    required: "Contact name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Contact name"
                />
                {errors.contactName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.contactName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="contactEmail"
                isDisabled={isSubmitting}
                isInvalid={errors.contactEmail !== undefined}
              >
                <FormLabel fontSize="sm">Contact email address</FormLabel>
                <Input
                  {...register("contactEmail", {
                    required: "Contact email address is required",
                    validate: (email: string) =>
                      isEmail(email) ? undefined : "Invalid email address",
                  })}
                  fontSize="sm"
                  type="email"
                  placeholder="Contact email address"
                />
                {errors.contactEmail !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.contactEmail.message}
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

export default AddNewWarehouseFormModal;
