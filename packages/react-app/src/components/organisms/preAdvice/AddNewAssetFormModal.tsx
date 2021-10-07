/* eslint-disable react/jsx-props-no-spreading */
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
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

import searchProducts from "../../../api/data/products/searchProducts";
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
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<NewAssetForm>();

  // submit handler
  const onSubmit = (data: NewAssetForm) => {};

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
            <ModalFormControl>
              <FormLabel fontSize="sm">Product</FormLabel>
              <StyledChakraReactSelect
                isLoading={productsDataIsFetching}
                placeholder="Search product"
                onChange={(selectedClient) => {
                  const product = (selectedClient as SelectedProductOption)
                    ?.value;
                  // if (product) {
                  //   onChange(product);
                  // } else {
                  //   onChange(undefined);
                  // }
                }}
                onInputChange={(search: string) =>
                  setProductSearchQuery(search)
                }
                options={productsData?.map((product: Product) => ({
                  value: product,
                  label: product.productName,
                }))}
              />
            </ModalFormControl>

            <ModalFormControl isInvalid={errors.costPrice !== undefined}>
              <FormLabel fontSize="sm">Cost price</FormLabel>
              <InputGroup>
                <InputLeftElement color="gray.300">$</InputLeftElement>
                <NumberInput min={0} w="100%">
                  <NumberInputField
                    {...register("costPrice", {
                      required: "Cost price is required",
                    })}
                    pl="30px"
                    fontSize="sm"
                  />
                </NumberInput>
              </InputGroup>
              {errors.costPrice !== undefined && (
                <FormErrorMessage fontSize="sm">
                  {errors.costPrice.message}
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
