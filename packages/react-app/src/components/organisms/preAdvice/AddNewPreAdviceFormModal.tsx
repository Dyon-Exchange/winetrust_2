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
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";

import getClients from "../../../api/data/clients/getClients";
import getWarehouses from "../../../api/data/warehouses/getWarehouses";
import createPreAdvice from "../../../api/preAdvice/createPreAdvice";
import useFilteredData from "../../../hooks/search/useFilteredData";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import StyledChakraReactSelect from "../../atoms/inputs/StyledChakraReactSelect";
import AssetCard from "../../molecules/assets/AssetCard";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";
import AddNewAssetFormModal from "../assets/AddNewAssetFormModal";

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
  const toast = useDefaultToast();
  const queryClient = useQueryClient();

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
  const addAsset = useCallback(
    (asset: NewAssetForm) => {
      // reset assets error
      setAssetsError("");

      // use a dayjs timestamp as the asset form key
      const dataWithKey: NewAssetForm = { ...asset, key: dayjs().toString() };
      setAssets((oldAssets) => [...oldAssets, dataWithKey]);
    },
    [setAssets, setAssetsError]
  );

  // function for removing assets
  const removeAsset = useCallback(
    (key: string) => {
      setAssets((oldAssets) =>
        oldAssets.filter((oldAsset) => oldAsset.key !== key)
      );
    },
    [setAssets]
  );

  const {
    filteredData: clientsData,
    setSearchQry: setClientSearchQuery,
    error: clientsError,
    isError: clientsIsError,
    isFetching: clientsDataIsFetching,
  } = useFilteredData<Client>({
    useQueryKey: "clients",
    getFunction: getClients,
    filterFields: ["firstName", "lastName"],
  });

  const {
    filteredData: arrivalWarehousesData,
    setSearchQry: setArrivalWarehouseSearchQuery,
    error: arrivalWarehousesError,
    isError: arrivalWarehousesIsError,
    isFetching: arrivalWarehousesDataIsFetching,
  } = useFilteredData<Warehouse>({
    useQueryKey: "warehouses",
    getFunction: getWarehouses,
    filterFields: ["name"],
  });

  const {
    filteredData: transferringWarehousesData,
    setSearchQry: setTransferringWarehouseSearchQuery,
    error: transferringWarehousesError,
    isError: transferringWarehousesIsError,
    isFetching: transferringWarehousesIsFetching,
  } = useFilteredData<Warehouse>({
    useQueryKey: "warehouses",
    getFunction: getWarehouses,
    filterFields: ["name"],
  });

  // pop a toast for any of the search query errors
  useEffect(() => {
    if (clientsIsError && clientsError) {
      toast({
        title: "Error searching for clients.",
        description:
          (clientsError as AxiosError).response?.data ||
          "There was an error searching for clients, please try again later.",
        status: "error",
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
      // await creating the pre-advice and then invalidate the pre-advices and assets query data
      await createPreAdvice(dataWithAssets);
      queryClient.invalidateQueries("pre-advices");
      queryClient.invalidateQueries("assets");
      toast({
        title: "Pre-advice created.",
        description: "Pre-advice and assets created successfully.",
        status: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error creating pre-advice.",
        description:
          (error as AxiosError).response?.data ||
          "There was an error trying to create this pre-advice, please try again later.",
        status: "error",
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
  const closeModal = useCallback(
    () => (isPreAdviceDirty ? openConfirmCancel() : onClose()),
    [isPreAdviceDirty, openConfirmCancel, onClose]
  );

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
            <ModalBody alignSelf="center" w="85%" overflow="auto">
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
                        label: !client.firstName
                          ? client.ethAddress
                          : `${client.firstName} ${client.lastName || ""} (${
                              client.ethAddress
                            })`,
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
                  Products {`(${assets.length})`}
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
