/* eslint-disable react/jsx-props-no-spreading */
import {
  FormErrorMessage,
  FormLabel,
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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import searchClients from "../../../api/data/clients/searchClients";
import searchWarehouses from "../../../api/data/warehouses/searchWarehouses";
import createPreAdvice from "../../../api/preAdvice/createPreAdvice";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import StyledChakraReactSelect from "../../atoms/inputs/StyledChakraReactSelect";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";
import AssetCard from "../../molecules/preAdvice/AssetCard";

import AddNewAssetFormModal from "./AddNewAssetFormModal";

interface SelectedClientOption {
  label: string;
  value: Client;
}

interface SelectedWarehouseOption {
  label: string;
  value: Warehouse;
}

interface AddNewPreAdviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewPreAdviceFormModal = ({
  isOpen,
  onClose,
}: AddNewPreAdviceFormModalProps) => {
  const toast = useToast();

  // state for the add new asset modal
  const {
    isOpen: isAddNewAssetOpen,
    onOpen: openAddNewAsset,
    onClose: closeAddNewAsset,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // state for the assets
  const [assets, setAssets] = useState<NewAssetForm[]>([]);

  // state for assets form error
  const [assetsError, setAssetsError] = useState("");

  // function for adding assets
  const addAsset = (asset: NewAssetForm) => {
    // reset assets error
    setAssetsError("");

    // use a dayjs timestamp as the asset form key
    const dataWithKey: NewAssetForm = { ...asset, key: dayjs().toString() };
    setAssets((oldAssets) => [...oldAssets, dataWithKey]);
  };

  // function for removing assets
  const removeAsset = (key: string) => {
    setAssets((oldAssets) =>
      oldAssets.filter((oldAsset) => oldAsset.key !== key)
    );
  };

  // states for search queries
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [arrivalWarehouseSearchQuery, setArrivalWarehouseSearchQuery] =
    useState("");
  const [
    transferringWarehouseSearchQuery,
    setTransferringWarehouseSearchQuery,
  ] = useState("");

  // data queries
  const {
    data: clientsData,
    error: clientsError,
    isError: clientsIsError,
    isFetching: clientsDataIsFetching,
  } = useQuery(["clients-search", clientSearchQuery], async () => {
    const data = await searchClients(clientSearchQuery);
    return data;
  });

  const {
    data: arrivalWarehousesData,
    error: arrivalWarehousesError,
    isError: arrivalWarehousesIsError,
    isFetching: arrivalWarehousesDataIsFetching,
  } = useQuery(
    ["arrival-warehouses-search", arrivalWarehouseSearchQuery],
    async () => {
      const data = await searchWarehouses(arrivalWarehouseSearchQuery);
      return data;
    }
  );

  const {
    data: transferringWarehousesData,
    error: transferringWarehousesError,
    isError: transferringWarehousesIsError,
    isFetching: transferringWarehousesIsFetching,
  } = useQuery(
    ["transferring-warehouses-search", transferringWarehouseSearchQuery],
    async () => {
      const data = await searchWarehouses(transferringWarehouseSearchQuery);
      return data;
    }
  );

  // pop a toast for any of the search query errors
  useEffect(() => {
    if (clientsIsError && clientsError) {
      toast({
        title: "Error searching for clients.",
        description:
          (clientsError as AxiosError).response?.data ||
          "There was an error searching for clients, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [clientsError, clientsIsError, toast]);

  useEffect(() => {
    if (
      (arrivalWarehousesIsError && arrivalWarehousesError) ||
      (transferringWarehousesIsError && transferringWarehousesError)
    ) {
      toast({
        title: "Error searching for warehouses.",
        description:
          (
            (arrivalWarehousesError as AxiosError) ||
            (transferringWarehousesError as AxiosError)
          ).response?.data ||
          "There was an error searching for warehouses, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    arrivalWarehousesError,
    arrivalWarehousesIsError,
    toast,
    transferringWarehousesError,
    transferringWarehousesIsError,
  ]);

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewPreAdviceForm>();

  // true is dirty state
  const isPreAdviceDirty = isDirty || assets.length > 0;

  // submit handler
  const onSubmit = async (data: NewPreAdviceForm) => {
    // check if assets is empty
    if (assets.length <= 0) {
      setAssetsError("Asset/s is required.");
      return;
    }

    const dataWithAssets: NewPreAdviceForm = {
      ...data,
      assets,
    };

    try {
      // await creating the pre advice
      await createPreAdvice(dataWithAssets);
      toast({
        title: "Pre advice created.",
        description: "Pre advice and assets created successfully.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating pre advice.",
        description:
          (error as AxiosError).response?.data ||
          "There was an error trying to create this pre advice, please try again later.",
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
  const closeModal = () => (isPreAdviceDirty ? openConfirmCancel() : onClose());

  return (
    <>
      <Modal
        closeOnEsc={!isPreAdviceDirty}
        closeOnOverlayClick={!isPreAdviceDirty}
        isCentered
        isOpen={isOpen}
        onClose={closeModal}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Pre-Advice</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <ModalFormControl
                isDisabled={isSubmitting}
                isInvalid={errors.owner !== undefined}
              >
                <FormLabel fontSize="sm">Owner</FormLabel>
                <Controller
                  control={control}
                  name="owner"
                  rules={{ required: "Owner is required." }}
                  render={({ field: { onChange } }) => (
                    <StyledChakraReactSelect
                      isLoading={clientsDataIsFetching}
                      placeholder="Search client"
                      onChange={(selectedClient) => {
                        const client = (selectedClient as SelectedClientOption)
                          ?.value;
                        if (client) {
                          onChange(client);
                        } else {
                          onChange(undefined);
                        }
                      }}
                      onInputChange={(search: string) =>
                        setClientSearchQuery(search)
                      }
                      options={clientsData?.map((client: Client) => ({
                        value: client,
                        label: `${client.firstName} ${client.lastName}`,
                      }))}
                    />
                  )}
                />
                {errors.owner !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {/* typescript being buggy, thinks errors.owner is a client type */}
                    {(errors.owner as any).message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                isDisabled={isSubmitting}
                isInvalid={errors.transferringWarehouse !== undefined}
              >
                <FormLabel fontSize="sm">Transferring warehouse</FormLabel>
                <Controller
                  control={control}
                  name="transferringWarehouse"
                  rules={{ required: "Transferring warehouse is required." }}
                  render={({ field: { onChange } }) => (
                    <StyledChakraReactSelect
                      isLoading={transferringWarehousesIsFetching}
                      placeholder="Search warehouse"
                      onChange={(selectedWarehouse) => {
                        const warehouse = (
                          selectedWarehouse as SelectedWarehouseOption
                        )?.value;
                        if (warehouse) {
                          onChange(warehouse);
                        } else {
                          onChange(undefined);
                        }
                      }}
                      onInputChange={(search: string) =>
                        setTransferringWarehouseSearchQuery(search)
                      }
                      options={transferringWarehousesData?.map(
                        (warehouse: Warehouse) => ({
                          value: warehouse,
                          label: warehouse.name,
                        })
                      )}
                    />
                  )}
                />
                {errors.transferringWarehouse !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {/* typescript being buggy, thinks errors.transferringWarehouse is a warehouse type */}
                    {(errors.transferringWarehouse as any).message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                isDisabled={isSubmitting}
                isInvalid={errors.arrivalWarehouse !== undefined}
              >
                <FormLabel fontSize="sm">Arrival warehouse</FormLabel>
                <Controller
                  control={control}
                  name="arrivalWarehouse"
                  rules={{ required: "Arrival warehouse is required." }}
                  render={({ field: { onChange } }) => (
                    <StyledChakraReactSelect
                      isLoading={arrivalWarehousesDataIsFetching}
                      placeholder="Search warehouse"
                      onChange={(selectedWarehouse) => {
                        const warehouse = (
                          selectedWarehouse as SelectedWarehouseOption
                        )?.value;
                        if (warehouse) {
                          onChange(warehouse);
                        } else {
                          onChange(undefined);
                        }
                      }}
                      onInputChange={(search: string) =>
                        setArrivalWarehouseSearchQuery(search)
                      }
                      options={arrivalWarehousesData?.map(
                        (warehouse: Warehouse) => ({
                          value: warehouse,
                          label: warehouse.name,
                        })
                      )}
                    />
                  )}
                />
                {errors.arrivalWarehouse !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {/* typescript being buggy, thinks errors.arrivalWarehouse is a warehouse type */}
                    {(errors.arrivalWarehouse as any).message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              <ModalFormControl
                isDisabled={isSubmitting}
                isInvalid={assetsError !== ""}
              >
                <FormLabel fontSize="sm">
                  Assets {`(${assets.length})`}
                </FormLabel>
                {assets.map((asset) => (
                  <AssetCard
                    asset={asset}
                    key={asset.key}
                    removeAsset={removeAsset}
                    removeDisabled={isSubmitting}
                  />
                ))}
                <AddNewButton
                  isDisabled={isSubmitting}
                  onClick={openAddNewAsset}
                />
                {assetsError !== "" && (
                  <FormErrorMessage fontSize="sm">
                    {assetsError}
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

      {/* Add new asset modal form, only render when show state is true to reset hook form */}
      {isAddNewAssetOpen && (
        <AddNewAssetFormModal
          isOpen={isAddNewAssetOpen}
          onClose={closeAddNewAsset}
          addAsset={addAsset}
        />
      )}
    </>
  );
};

export default AddNewPreAdviceFormModal;
