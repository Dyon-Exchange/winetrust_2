/* eslint-disable react/jsx-props-no-spreading */
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Stat,
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
  HStack,
  StatLabel,
  StatHelpText,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import React, { useCallback, useRef, useContext } from "react";
import { useController, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import createAssetMetadata from "../../../api/data/assets/createAssetMetadata";
import patchAsset from "../../../api/data/assets/patchAsset";
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
  <HStack>
    <StatLabel>{title}</StatLabel>
    <StatHelpText>{defaultValue}</StatHelpText>
  </HStack>
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
  const { wineTrustTokenAPI } = useContext(WalletContext);
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

  // pdf file input ref
  const pdfFileInputRef = useRef<any>(null);

  // controller hook for the pdf file input
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
        const metadataHash = await createAssetMetadata({
          ...data,
          assetId: row._id,
        });

        const txHash = await wineTrustTokenAPI?.mintNFT(
          row.preAdvice.owner.ethAddress,
          metadataHash
        );

        if (!txHash) throw new Error("No Tx Hash returned");

        await patchAsset({
          assetId: row._id,
          assetUpdates: { txHash },
        });

        await queryClient.invalidateQueries("assets");

        onClose();

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
    [
      onClose,
      queryClient,
      row._id,
      row.preAdvice.owner.ethAddress,
      toast,
      wineTrustTokenAPI,
    ]
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
              <ModalFormControl
                isInvalid={errors.externalURL !== undefined}
                isDisabled={isSubmitting}
              >
                <FormLabel fontSize="sm">External URL</FormLabel>
                <Input
                  {...register("externalURL", {
                    required: "External URL is required",
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
                id="pdf"
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
                    ref={pdfFileInputRef}
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
                    onClick={() => pdfFileInputRef.current.click()}
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
              <HStack
                alignItems="start"
                bg={colors.tertiary}
                borderWidth="1px"
                borderRadius="lg"
                p="10px 15px"
                mb="15px"
              >
                <Stat>
                  <AssetFieldDisplay
                    title="Product Name"
                    defaultValue={row.product.productName}
                  />
                  <AssetFieldDisplay
                    title="Description"
                    defaultValue={row.product.description}
                  />
                  {/* <AssetFieldDisplay
                    title="SKU Code"
                    defaultValue={row.product.skuCode}
                  /> */}
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
                </Stat>
              </HStack>
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
