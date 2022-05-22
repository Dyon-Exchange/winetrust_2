import { EditIcon } from "@chakra-ui/icons";
import { Button, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

import patchAsset from "../../../api/data/assets/patchAsset";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";

const EditAssetModal = ({ asset }: { asset: Asset }) => {
  const { warehouseLocationNo: orgWarehouseLocationNo, _id: assetId } = asset;
  const [warehouseLocationNo, setWarehouseLocationNo] = useState(orgWarehouseLocationNo || "");

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isSubmitting, onToggle: toggleIsSubmitting } = useDisclosure({
    defaultIsOpen: false,
  });

  const queryClient = useQueryClient();

  const toast = useDefaultToast();

  const handleSave = async () => {
    if (warehouseLocationNo === "" || warehouseLocationNo === undefined) {
      toast({
        title: "Error updating Warehouse Location Number",
        description: "Warehouse Location Number Required ",
        status: "error",
      });
    } else {
      toggleIsSubmitting();
      try {
        await patchAsset({
          assetId,
          assetUpdates: {
            warehouseLocationNo,
          },
        });
        await queryClient.invalidateQueries("assets");

        onCloseModal();
        toast({
          title: "Asset updated",
          description: "Successfully updated Warehouse Location Number",
          status: "success",
        });
      } catch (error) {
        onCloseModal();
        toast({
          title: "Error setting landed",
          description:
            (error as AxiosError).response?.data ||
            "There was an error updating Warehouse Location Number, please try again.",
          status: "error",
        });
      } finally {
        toggleIsSubmitting();
      }
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeOnOverlayClick={!isSubmitting}
          closeOnEsc={!isSubmitting}
          isOpen={isModalOpen}
          onClose={onCloseModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Warehouse #</ModalHeader>
            <ModalBody id="warehouseLocationNo">
              <FormLabel fontSize="sm">Warehouse Location #</FormLabel>
              <Input
                fontSize="sm"
                type="text"
                placeholder="Warehouse Location #"
                value={warehouseLocationNo}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setWarehouseLocationNo(event.currentTarget.value)
                }
              />
            </ModalBody>
            <ModalFooter>
              <ModalFooterButton
                colorScheme="blue"
                onClick={handleSave}
                isLoading={isSubmitting}
              >
                Save
              </ModalFooterButton>
              <ModalFooterButton
                colorScheme="blue"
                onClick={onCloseModal}
                variant="outline"
                disabled={isSubmitting}
              >
                Cancel
              </ModalFooterButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Button
        colorScheme="blue"
        leftIcon={<EditIcon />}
        fontSize="xs"
        minW="100px"
        size="sm"
        onClick={onOpenModal}
      >
        Edit
      </Button>
    </>
  );
};

export default EditAssetModal;
