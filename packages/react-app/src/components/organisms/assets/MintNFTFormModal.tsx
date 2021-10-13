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
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import React, { useCallback, useRef, useContext } from "react";
import { useController, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import createAssetMetadata from "../../../api/data/assets/createAssetMetadata";
import patchAssetWithTxHash from "../../../api/data/assets/patchAssetWithTxHash";
import { MINTER_ROLE } from "../../../constants/roles";
import { WalletContext } from "../../../contexts/WalletContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ModalFooterButton from "../../atoms/buttons/ModalFooterButton";
import ModalFormControl from "../../atoms/forms/ModalFormControl";
import ConfirmCancelChangesModal from "../../molecules/modals/ConfirmCancelChangesModal";

const AssetFieldDisplay = ({
  title,
  defaultValue,
}: {
  title: string;
  defaultValue: number | string | undefined;
}) => (
  <ModalFormControl>
    <FormLabel fontSize="sm">{title}</FormLabel>
    <Input
      fontSize="sm"
      type="text"
      placeholder="Product name"
      disabled
      defaultValue={defaultValue}
    />
  </ModalFormControl>
);

interface MintNFTFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  row: Asset;
}

export interface MintNFTForm {
  externalURL: string;
  initialConditionReport: File;
}

const MintNFTFormModal = ({ isOpen, onClose, row }: MintNFTFormModalProps) => {
  const { wineTrustTokenAPI, userDetails } = useContext(WalletContext);
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
  } = useForm<MintNFTForm>();

  // image file input ref
  const imageFileInputRef = useRef<any>(null);

  // controller hook for the image file input
  const {
    field: {
      value: conditionReportValue,
      onChange: onConditionReportChange,
      ...inputProps
    },
  } = useController({
    name: "initialConditionReport",
    control,
    rules: { required: "Initial Condition Report is required" },
  });

  // submit handler
  const onSubmit = useCallback(
    async (data: MintNFTForm) => {
      try {
        // await creating the product and then invalidate the products query data
        // const metadataHash = await createAssetMetadata({
        //   ...data,
        //   assetId: row._id,
        // });

        // const txHash = await wineTrustTokenAPI?.mintNFT(
        //   row.preAdvice.owner.ethAddress,
        //   metadataHash
        // );

        const txHash =
          "0x4118bff291b318ba572c70398f40592bfc601c3c30112c346bbb74961b19a945";

        await patchAssetWithTxHash({ assetId: row._id, txHash });

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
    [onClose, row._id, toast]
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
            <ModalHeader>Mint NFT</ModalHeader>
            <ModalBody alignSelf="center" w="80%">
              <AssetFieldDisplay
                title="Product Name"
                defaultValue={row.product.productName}
              />
              <AssetFieldDisplay
                title="Description"
                defaultValue={row.product.description}
              />
              <ModalFormControl isInvalid={errors.externalURL !== undefined}>
                <FormLabel fontSize="sm">External URL</FormLabel>

                <Input
                  {...register("externalURL", {
                    required: "External URL is required",
                    // TODO validate URL
                  })}
                  fontSize="sm"
                  type="text"
                  placeholder="External URL"
                />
                {errors.externalURL !== undefined && (
                  <FormErrorMessage fontSize="sm">
                    {errors.externalURL.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>
              <ModalFormControl
                id="image"
                isDisabled={isSubmitting}
                isInvalid={errors.initialConditionReport !== undefined}
              >
                <FormLabel fontSize="sm">Condition Report</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AttachmentIcon />
                  </InputLeftElement>
                  <input
                    {...inputProps}
                    accept=".pdf" // allow only jpeg and png files
                    onChange={(event) => {
                      if (!event || !event.target?.files?.[0]) return;
                      onConditionReportChange(event.target.files[0]);
                    }}
                    ref={imageFileInputRef}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Input
                    // styles to make the input consistent with the other inputs but remain read only
                    css={css`
                      border-width: ${errors.initialConditionReport
                        ? "3px"
                        : "1px"};
                      :focus {
                        border-width: 3px;
                      }
                    `}
                    cursor="pointer"
                    fontSize="sm"
                    onClick={() => imageFileInputRef.current.click()}
                    readOnly
                    type="text"
                    value={conditionReportValue?.name || ""} // can't have value as undefined otherwise react complains (going from uncontrolled to control)
                    placeholder="Initial Condition Report PDF"
                  />
                </InputGroup>
                {errors.initialConditionReport !== undefined && (
                  <FormErrorMessage color={colors.error} fontSize="sm">
                    {errors.initialConditionReport.message}
                  </FormErrorMessage>
                )}
              </ModalFormControl>

              {/* Image?? */}
              <AssetFieldDisplay
                title="SKU Code"
                defaultValue={row.product.skuCode}
              />
              <AssetFieldDisplay title="Asset ID" defaultValue={row._id} />
              <AssetFieldDisplay
                title="Product Year"
                defaultValue={row.product.year}
              />
              <AssetFieldDisplay
                title="Region"
                defaultValue={row.product.region}
              />
              <AssetFieldDisplay
                title="Sub-Region"
                defaultValue={row.product.subRegion}
              />
              <AssetFieldDisplay
                title="Sub-Sub-Region"
                defaultValue={row.product.subSubRegion}
              />
              <AssetFieldDisplay
                title="Pack Size"
                defaultValue={row.product.packSize}
              />
              <AssetFieldDisplay
                title="Duty Status"
                defaultValue={row.product.dutyStatus}
              />
              <AssetFieldDisplay
                title="Warehouse ID"
                defaultValue={row.preAdvice.arrivalWarehouse._id}
              />
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
        onConfirm={() => {
          onClose();
          closeConfirmCancel();
        }}
      />
    </>
  );
};

export default MintNFTFormModal;
