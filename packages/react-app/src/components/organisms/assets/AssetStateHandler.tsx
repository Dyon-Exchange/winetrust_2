import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

import patchAsset from "../../../api/data/assets/patchAsset";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";

import LandAssetModal from "./LandAssetModal";

const AssetStateHandler = ({ asset }: { asset: Asset }) => {
  const {
    isOpen: isConfirmLandedModalOpen,
    onOpen: openConfirmLandedModal,
    onClose: closeConfirmLandedModal,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isSubmitting, onToggle: toggleIsSubmitting } = useDisclosure({
    defaultIsOpen: false,
  });

  const queryClient = useQueryClient();

  const toast = useDefaultToast();

  const setAsLandedHandler = async (warehouseLocNo: string) => {
    toggleIsSubmitting();
    try {
      await patchAsset({
        assetId: asset._id,
        assetUpdates: { state: "Landed", warehouseLocationNo: warehouseLocNo },
      });
      await queryClient.invalidateQueries("pre-advices");
      await queryClient.invalidateQueries("assets");

      closeConfirmLandedModal();
      toast({
        title: "Asset Landed",
        description: "Successfully set asset as landed",
        status: "success",
      });
    } catch (error) {
      closeConfirmLandedModal();
      toast({
        title: "Error setting landed",
        description:
          (error as AxiosError).response?.data ||
          "There was an error setting this asset as landed, please try again.",
        status: "error",
      });
    } finally {
      toggleIsSubmitting();
    }
  };

  if (asset.state === "Due In") {
    const _landingproduct = `You are Landing Product ${asset.product.longName}`;
    const _quantity = `Quantity ${asset.product.packSize}`;
    const _landingwarehouse = `Landing Warehouse ${asset.preAdvice.arrivalWarehouse.name}`;
    const _warehouselocation = `Warehouse location ${asset.preAdvice.arrivalWarehouse.address}`;
    return (
      <>
        {isConfirmLandedModalOpen && (
          <LandAssetModal
            onConfirm={setAsLandedHandler}
            isOpen={isConfirmLandedModalOpen}
            onClose={closeConfirmLandedModal}
            overrideHeader="Warning: Setting as Landed"
            landingProduct={_landingproduct}
            landingWarehouse={_landingwarehouse}
            quantity={_quantity}
            warehouseLocation={_warehouselocation}
            isSubmitting={isSubmitting}
          />
        )}

        <Button
          colorScheme="blue"
          // leftIcon={<AddIcon />}
          fontSize="xs"
          minW="100px"
          size="sm"
          onClick={openConfirmLandedModal}
        >
          Land
        </Button>
      </>
    );
  }

  return <Text>{asset.state}</Text>;
};

export default AssetStateHandler;
