/* eslint-disable react/jsx-props-no-spreading */
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import React, { useRef } from "react";
import { useController, useForm } from "react-hook-form";

import createProduct from "../../../../api/data/products/createProduct";
import useThemeColors from "../../../../hooks/theme/useThemeColors";
import ProductDutyStatus from "../../../../types/data/product/ProductDutyStatus";
import ModalFooterButton from "../../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../../molecules/modals/ConfirmCancelChangesModal";

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
  const toast = useToast();

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewProductForm>();

  // image file input ref
  const imageFileInputRef = useRef<any>(null);

  // controller hook for the image file input
  const {
    field: { value: imageValue, onChange: onImageChange, ...inputProps },
  } = useController({
    name: "image",
    control,
    rules: { required: "Image is required" },
  });

  // submit handler
  const onSubmit = async (data: NewProductForm) => {
    try {
      await createProduct(data);
      toast({
        title: "Product created.",
        description: "Product created successfully.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating product.",
        description:
          (error as AxiosError).response?.data ||
          "There was an error trying to create this product, please try again later.",
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
                <NumberInput
                  isInvalid={errors.year !== undefined}
                  min={0}
                  max={new Date().getFullYear()}
                >
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

              <ModalFormControl id="region" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Region</FormLabel>
                <Input
                  {...register("region", {
                    required: "Region is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.region !== undefined}
                />
                {errors.region !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.region.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="subRegion" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Sub region</FormLabel>
                <Input
                  {...register("subRegion")}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.subRegion !== undefined}
                />
                {errors.subRegion !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.subRegion.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="subSubRegion" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Sub sub region</FormLabel>
                <Input
                  {...register("subSubRegion")}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.subRegion !== undefined}
                />
                {errors.subRegion !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.subRegion.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="packSize" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Pack size</FormLabel>
                <Input
                  {...register("packSize", {
                    required: "Pack size is required",
                  })}
                  fontSize="sm"
                  type="text"
                  isInvalid={errors.packSize !== undefined}
                />
                {errors.packSize !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.packSize.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="dutyStatus" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Duty status</FormLabel>
                <Select
                  {...register("dutyStatus", {
                    required: "Duty status is required",
                  })}
                  fontSize="sm"
                  isInvalid={errors.dutyStatus !== undefined}
                  placeholder="Select"
                >
                  <option value={ProductDutyStatus.InBond}>
                    {ProductDutyStatus.InBond}
                  </option>
                  <option value={ProductDutyStatus.DutyPaid}>
                    {ProductDutyStatus.DutyPaid}
                  </option>
                </Select>
                {errors.dutyStatus !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.dutyStatus.message}
                  </FormHelperText>
                )}
              </ModalFormControl>

              <ModalFormControl id="image" isDisabled={isSubmitting}>
                <FormLabel fontSize="sm">Image</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AttachmentIcon />
                  </InputLeftElement>
                  <input
                    {...inputProps}
                    accept=".jpg, .jpeg, .png" // allow only jpeg and png files
                    onChange={(event) => {
                      if (!event || !event.target?.files?.[0]) return;
                      onImageChange(event.target.files[0]);
                    }}
                    ref={imageFileInputRef}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Input
                    // styles to make the input consistent with the other inputs but remain read only
                    css={css`
                      border-width: ${errors.image ? "3px" : "1px"};
                      :focus {
                        border-width: 3px;
                      }
                    `}
                    cursor="pointer"
                    fontSize="sm"
                    onClick={() => imageFileInputRef.current.click()}
                    readOnly
                    type="text"
                    value={imageValue?.name || ""} // can't have value as undefined otherwise react complains (going from uncontrolled to control)
                    isInvalid={errors.image !== undefined}
                  />
                </InputGroup>
                {errors.image !== undefined && (
                  <FormHelperText color={colors.error} fontSize="sm">
                    {errors.image.message}
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

export default AddNewProductFormModal;
