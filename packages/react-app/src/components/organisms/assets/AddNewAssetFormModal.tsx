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
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import getProducts from "../../../api/data/products/getProducts";
import supportedCurrencies from "../../../constants/supportedCurrencies";
import useFilteredData from "../../../hooks/search/useFilteredData";
import useFuseSearch from "../../../hooks/search/useFuseSearch";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import StyledChakraReactSelect from "../../atoms/inputs/StyledChakraReactSelect";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";

// extend dayjs with the isSameOrAfter plugin
dayjs.extend(isSameOrAfter);

interface SelectedProductOption {
  label: string;
  value: Product;
}

interface AddNewAssetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  addAsset: (asset: NewAssetForm) => void;
}

const AddNewAssetFormModal = ({
  isOpen,
  onClose,
  addAsset,
}: AddNewAssetFormModalProps) => {
  const toast = useDefaultToast();

  const {
    filteredData: filteredProductsData,
    setSearchQry: setProductSearchQuery,
    error: productsError,
    isError: productsIsError,
    isFetching: productsDataIsFetching,
  } = useFilteredData<Product>({
    useQueryKey: "products",
    getFunction: getProducts,
    filterFields: ["productName"],
  });

  // pop a toast for any of the search query errors
  useEffect(() => {
    if (productsIsError && productsError) {
      toast({
        title: "Error searching for products.",
        description:
          (productsError as AxiosError).response?.data ||
          "There was an error searching for products, please try again later.",
        status: "error",
      });
    }
  }, [productsError, productsIsError, toast]);

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<NewAssetForm>();

  // submit handler
  const onSubmit = useCallback(
    (data: NewAssetForm) => {
      addAsset(data);
      onClose();
    },
    [addAsset, onClose]
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
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Product</ModalHeader>
            <ModalBody alignSelf="center" w="80%" overflow="inherit">
              <ModalFormControl isInvalid={errors.product !== undefined}>
                <FormLabel fontSize="sm">Product</FormLabel>
                {/* @ts-ignore */}
                <Controller
                  control={control}
                  name="product"
                  rules={{ required: "Product is required." }}
                  render={({ field: { onChange } }) => (
                    <StyledChakraReactSelect
                      isLoading={productsDataIsFetching}
                      placeholder="Search product"
                      onChange={(selectedClient) => {
                        const product = (
                          selectedClient as SelectedProductOption
                        )?.value;
                        if (product) {
                          onChange(product);
                        } else {
                          onChange(undefined);
                        }
                      }}
                      onInputChange={(search: string) =>
                        setProductSearchQuery(search)
                      }
                      options={filteredProductsData?.map(
                        (product: Product) => ({
                          value: product,
                          label: product.productName,
                        })
                      )}
                    />
                  )}
                />
                {errors.product !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {/* typescript being buggy, thinks errors.product is a product type */}
                    {(errors.product as any).message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl isInvalid={errors.costPrice !== undefined}>
                <FormLabel fontSize="sm">Cost price</FormLabel>
                <InputGroup>
                  <InputLeftAddon>
                    <Select
                      {...register("costPrice.currency", {
                        required: "Currency is required",
                      })}
                      fontSize="sm"
                      placeholder="Select"
                      variant="flushed"
                      isInvalid={errors.costPrice?.currency !== undefined}
                    >
                      {supportedCurrencies.map((country) => (
                        <option
                          key={country.name}
                          value={country.code}
                          label={`${country.code} (${country.symbol})`}
                        />
                      ))}
                    </Select>
                  </InputLeftAddon>
                  <NumberInput min={0} w="100%">
                    <NumberInputField
                      {...register("costPrice.amount", {
                        required: "Cost price is required",
                      })}
                      fontSize="sm"
                    />
                  </NumberInput>
                </InputGroup>
                {errors.costPrice?.currency !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {errors.costPrice.currency.message}
                  </FormErrorMessage>
                )}
                {errors.costPrice?.amount !== undefined &&
                  !errors.costPrice?.currency && (
                    <FormErrorMessage fontSize="sm">
                      {errors.costPrice.amount.message}
                    </FormErrorMessage>
                  )}
              </ModalFormControl>

              <ModalFormControl
                isInvalid={errors.expectedArrivalDate !== undefined}
              >
                <FormLabel fontSize="sm">Expected arrival date</FormLabel>
                <Input
                  {...register("expectedArrivalDate", {
                    required: "Arrival date is required",
                    validate: (date: string) =>
                      dayjs(date).isSameOrAfter(dayjs().startOf("day"))
                        ? undefined
                        : "Arrival date cannot be in the past",
                  })}
                  fontSize="sm"
                  min={dayjs(new Date()).format("YYYY-MM-DD")} // make min today
                  type="date"
                />
                {errors.expectedArrivalDate !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {errors.expectedArrivalDate.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl isInvalid={errors.quantity !== undefined}>
                <FormLabel fontSize="sm">Quantity</FormLabel>
                <NumberInput defaultValue={1} min={1} precision={0} max={99}>
                  <NumberInputField
                    {...register("quantity", {
                      required: "Quantity is required",
                    })}
                    fontSize="sm"
                  />
                </NumberInput>
                {errors.quantity !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {errors.quantity.message}
                  </FormErrorMessage>
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
      <ConfirmCancelChangesModal
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancel}
        onConfirm={onClose}
      />
    </>
  );
};

export default AddNewAssetFormModal;
