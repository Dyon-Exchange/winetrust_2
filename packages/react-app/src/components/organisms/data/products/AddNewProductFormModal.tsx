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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import useThemeColors from "../../../../hooks/theme/useThemeColors";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";

interface AddNewProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewProductFormModal = ({
  isOpen,
  onClose,
}: AddNewProductFormModalProps) => {
  // get theme colors
  const colors = useThemeColors();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewProductForm>();

  // submit handler
  const onSubmit = async (data: NewProductForm) => {};

  // close modal handler
  const closeModal = () => onClose();
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
            <ModalHeader>Add New Product</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl id="productName" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Product name</FormLabel>
                <Input
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.productName !== undefined}
                />
                {errors.productName !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.productName.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="year" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Product year</FormLabel>
                <NumberInput isInvalid={errors.year !== undefined}>
                  <NumberInputField
                    {...register("year", {
                      required: "Product year is required",
                    })}
                    fontSize="sm"
                  />
                </NumberInput>
                {errors.year !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.year.message}
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
                onClick={closeModal}
                variant="outline"
              >
                Cancel
              </ModalFooterButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddNewProductFormModal;
