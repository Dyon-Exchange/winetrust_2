/* eslint-disable react/jsx-props-no-spreading */
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  FormErrorMessage,
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
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import React, { useCallback, useRef } from "react";
import { useController, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import createProduct from "../../../api/data/products/createProduct";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ProductDutyStatus from "../../../types/data/product/ProductDutyStatus";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";

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
  const toast = useDefaultToast();
  const queryClient = useQueryClient();

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewProductForm>();

  // image file input ref
  const labelImageFileInputRef = useRef<any>(null);
  const bottleImageFileInputRef = useRef<any>(null);

  // controller hook for the image file input
  const {
    field: {
      value: labelImageValue,
      onChange: onLabelImageChange,
      ...labelImageProps
    },
  } = useController({
    name: "labelImage",
    control,
    rules: { required: "Label Image is required" },
  });

  const {
    field: {
      value: bottleImageValue,
      onChange: onBottleImageChange,
      ...bottleImageProps
    },
  } = useController({
    name: "bottleImage",
    control,
    rules: { required: "Bottle Image is required" },
  });

  // submit handler
  const onSubmit = useCallback(
    async (data: NewProductForm) => {
      try {
        // await creating the product and then invalidate the products query data
        await createProduct(data);
        queryClient.invalidateQueries("products");
        toast({
          title: "Product created.",
          description: "Product created successfully.",
          status: "success",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error creating product.",
          description:
            (error as AxiosError).response?.data ||
            "There was an error trying to create this product, please try again later.",
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
            <ModalHeader>Add New Product</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl
                id="simpleName"
                isDisabled={isSubmitting}
                isInvalid={errors.simpleName !== undefined}
              >
                <FormLabel fontSize="sm">Simple name</FormLabel>
                <Input
                  {...register("simpleName", {
                    required: "Simple name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Simple name"
                />
                {errors.simpleName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.simpleName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="producerName"
                isDisabled={isSubmitting}
                isInvalid={errors.producerName !== undefined}
              >
                <FormLabel fontSize="sm">Producer name</FormLabel>
                <Input
                  {...register("producerName", {
                    required: "Product name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Producer name"
                />
                {errors.producerName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.producerName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="longName"
                isDisabled={isSubmitting}
                isInvalid={errors.longName !== undefined}
              >
                <FormLabel fontSize="sm">Long name</FormLabel>
                <Input
                  {...register("longName", {
                    required: "Long name is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Long name"
                />
                {errors.longName !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.longName.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="productCode"
                isDisabled={isSubmitting}
                isInvalid={errors.productCode !== undefined}
              >
                <FormLabel fontSize="sm">Product Code</FormLabel>
                <Input
                  {...register("productCode", {
                    required: "Product code is required",
                    maxLength: "18",
                    minLength: "18",
                  })}
                  fontSize="sm"
                  type="number"
                  maxLength={18}
                  placeholder="Product code"
                />
                {errors.productCode !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.productCode &&
                      errors.productCode.type === "required" && (
                        <span>{errors.productCode.message}</span>
                      )}
                    {errors.productCode &&
                      errors.productCode.type === "maxLength" && (
                        <span>Product Code should be 18 digit long</span>
                      )}
                    {errors.productCode &&
                      errors.productCode.type === "minLength" && (
                        <span>Product Code should be 18 digit long</span>
                      )}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="description"
                isDisabled={isSubmitting}
                isInvalid={errors.description !== undefined}
              >
                <FormLabel fontSize="sm">Description</FormLabel>
                <Input
                  {...register("description", {
                    required: "Description is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Description"
                />
                {errors.description !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="year"
                isDisabled={isSubmitting}
                isInvalid={errors.year !== undefined}
              >
                <FormLabel fontSize="sm">Product year</FormLabel>
                <NumberInput min={0} max={new Date().getFullYear()}>
                  <NumberInputField
                    {...register("year", {
                      required: "Product year is required",
                    })}
                    fontSize="sm"
                    placeholder="Product year"
                  />
                </NumberInput>
                {errors.year !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.year.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="country"
                isDisabled={isSubmitting}
                isInvalid={errors.country !== undefined}
              >
                <FormLabel fontSize="sm">Country</FormLabel>
                <Input
                  {...register("country", {
                    required: "Country is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Country"
                />
                {errors.country !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.country.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="region"
                isDisabled={isSubmitting}
                isInvalid={errors.region !== undefined}
              >
                <FormLabel fontSize="sm">Region</FormLabel>
                <Input
                  {...register("region", {
                    required: "Region is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Region"
                />
                {errors.region !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.region.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="subRegion"
                isDisabled={isSubmitting}
                isInvalid={errors.subRegion !== undefined}
              >
                <FormLabel fontSize="sm">Sub region</FormLabel>
                <Input
                  {...register("subRegion", {
                    // required: "Sub Region is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Sub region"
                />
                {errors.subRegion !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.subRegion.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="subSubRegion"
                isDisabled={isSubmitting}
                isInvalid={errors.subSubRegion !== undefined}
              >
                <FormLabel fontSize="sm">Sub sub region</FormLabel>
                <Input
                  {...register("subSubRegion", {
                    // required: "Sub Sub Region is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Sub sub region"
                />
                {errors.subSubRegion !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.subSubRegion.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="packSize"
                isDisabled={isSubmitting}
                isInvalid={errors.packSize !== undefined}
              >
                <FormLabel fontSize="sm">Pack size</FormLabel>
                <Input
                  {...register("packSize", {
                    required: "Pack size is required",
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="Pack size"
                />
                {errors.packSize !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.packSize.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="labelimage"
                isDisabled={isSubmitting}
                isInvalid={errors.labelImage !== undefined}
              >
                <FormLabel fontSize="sm">Label Image</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AttachmentIcon />
                  </InputLeftElement>
                  <input
                    {...labelImageProps}
                    accept=".jpg, .jpeg, .png" // allow only jpeg and png files
                    onChange={(event) => {
                      if (!event || !event.target?.files?.[0]) return;
                      onLabelImageChange(event.target.files[0]);
                    }}
                    ref={labelImageFileInputRef}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Input
                    // styles to make the input consistent with the other inputs but remain read only
                    css={css`
                      border-width: ${errors.labelImage ? "3px" : "1px"};
                      :focus {
                        border-width: 3px;
                      }
                    `}
                    cursor="pointer"
                    fontSize="sm"
                    onClick={() => labelImageFileInputRef.current.click()}
                    readOnly
                    type="text"
                    value={labelImageValue?.name || ""} // can't have value as undefined otherwise react complains (going from uncontrolled to control)
                    placeholder="Label image"
                  />
                </InputGroup>
                {errors.labelImage !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.labelImage.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                id="bottleimage"
                isDisabled={isSubmitting}
                isInvalid={errors.bottleImage !== undefined}
              >
                <FormLabel fontSize="sm">Bottle Image</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AttachmentIcon />
                  </InputLeftElement>
                  <input
                    {...bottleImageProps}
                    accept=".jpg, .jpeg, .png" // allow only jpeg and png files
                    onChange={(event) => {
                      if (!event || !event.target?.files?.[0]) return;
                      onBottleImageChange(event.target.files[0]);
                    }}
                    ref={bottleImageFileInputRef}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Input
                    // styles to make the input consistent with the other inputs but remain read only
                    css={css`
                      border-width: ${errors.bottleImage ? "3px" : "1px"};
                      :focus {
                        border-width: 3px;
                      }
                    `}
                    cursor="pointer"
                    fontSize="sm"
                    onClick={() => bottleImageFileInputRef.current.click()}
                    readOnly
                    type="text"
                    value={bottleImageValue?.name || ""} // can't have value as undefined otherwise react complains (going from uncontrolled to control)
                    placeholder="Bottle image"
                  />
                </InputGroup>
                {errors.bottleImage !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.bottleImage.message}
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

export default AddNewProductFormModal;
