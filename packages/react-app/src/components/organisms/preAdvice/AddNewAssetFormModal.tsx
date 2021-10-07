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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";

// extend dayjs with the isSameOrAfter plugin
dayjs.extend(isSameOrAfter);

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
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<NewAssetForm>();

  // submit handler
  const onSubmit = (data: NewAssetForm) => {
    console.log(data);
  };

  // close modal handler
  const closeModal = () => onClose();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalBody alignSelf="center" w="80%">
            <ModalFormControl isInvalid={errors.costPrice !== undefined}>
              <FormLabel fontSize="sm">Cost price</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register("costPrice", {
                    required: "Cost price is required",
                  })}
                  fontSize="sm"
                />
              </NumberInput>
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
              <NumberInput>
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
