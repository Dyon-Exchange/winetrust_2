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
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import searchProducts from "../../../api/data/products/searchProducts";
import supportedCurrencies from "../../../constants/supportedCurrencies";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import StyledChakraReactSelect from "../../atoms/inputs/StyledChakraReactSelect";

// extend dayjs with the isSameOrAfter plugin
dayjs.extend(isSameOrAfter);

interface SelectedProductOption {
  label: string;
  value: Product;
}

interface AddNewAssetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  setAssets: Dispatch<SetStateAction<NewAssetForm[]>>;
}

const AddNewAssetFormModal = ({
  isOpen,
  onClose,
  setAssets,
}: AddNewAssetFormModalProps) => {
  const toast = useToast();

  // state for the product search query
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // products data query
  const {
    data: productsData,
    error: productsError,
    isError: productsIsError,
    isFetching: productsDataIsFetching,
  } = useQuery(["products-search", productSearchQuery], async () => {
    const data = await searchProducts(productSearchQuery);
    return data;
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
        position: "top-right",
        duration: 5000,
        isClosable: true,
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
  const onSubmit = (data: NewAssetForm) => {
    // use a dayjs timestamp as the asset form key
    const dataWithKey: NewAssetForm = { ...data, key: dayjs().toString() };

    setAssets((oldAssets) => [...oldAssets, dataWithKey]);
    onClose();
  };

  // close modal handler
  const closeModal = () => onClose();

  return (
    <Modal
      closeOnEsc={!isDirty}
      closeOnOverlayClick={!isDirty}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalBody alignSelf="center" w="80%">
            <ModalFormControl isInvalid={errors.product !== undefined}>
              <FormLabel fontSize="sm">Product</FormLabel>
              <Controller
                control={control}
                name="product"
                rules={{ required: "Product is required." }}
                render={({ field: { onChange } }) => (
                  <StyledChakraReactSelect
                    isLoading={productsDataIsFetching}
                    placeholder="Search product"
                    onChange={(selectedClient) => {
                      const product = (selectedClient as SelectedProductOption)
                        ?.value;
                      if (product) {
                        onChange(product);
                      } else {
                        onChange(undefined);
                      }
                    }}
                    onInputChange={(search: string) =>
                      setProductSearchQuery(search)
                    }
                    options={productsData?.map((product: Product) => ({
                      value: product,
                      label: product.productName,
                    }))}
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
              <NumberInput min={1} defaultValue={1}>
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
  );
};

export default AddNewAssetFormModal;
