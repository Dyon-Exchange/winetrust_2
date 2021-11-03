import {
  Box,
  Heading,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getPreAdvices from "../../../api/preAdvice/getPreAdvices";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import PreAdvices from "../../molecules/preAdvice/preAdvices";

import AddNewPreAdviceFormModal from "./AddNewPreAdviceFormModal";

const PreAdviceSidePanel = () => {
  const colors = useThemeColors();
  const toast = useToast();

  // state for the add new pre-advice modal
  const {
    isOpen: isAddNewPreAdviceOpen,
    onOpen: openAddNewPreAdvice,
    onClose: closeAddNewPreAdvice,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // query for pre-advices data
  const {
    data: preAdvicesData,
    isLoading: preAdvicesDataIsLoading,
    error: preAdvicesDataError,
    isError: preAdvicesDataIsError,
    refetch: refetchPreAdvicesData,
  } = useQuery("pre-advices", getPreAdvices);

  // pop a toast if pre-advices data query errors
  useEffect(() => {
    if (preAdvicesDataIsError && preAdvicesDataError) {
      toast({
        title: "Error fetching pre-advices.",
        description:
          (preAdvicesDataError as AxiosError).response?.data ||
          "There was an error fetching the pre-advices data, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [preAdvicesDataError, preAdvicesDataIsError, toast]);

  return (
    <>
      <Box bg={colors.tertiary} boxShadow="sm" minW="300px" maxW="300px">
        <VStack alignItems="start" p="20px 25px">
          <Heading fontSize="xl">Pre-Advice</Heading>
          <AddNewButton onClick={openAddNewPreAdvice} />
        </VStack>
        <PreAdvices
          data={preAdvicesData}
          loading={preAdvicesDataIsLoading}
          error={preAdvicesDataIsError}
          refetch={refetchPreAdvicesData}
        />
      </Box>

      {/* Add new pre-advice modal, only render the modal when it's open state is true so that useForm hook resets */}
      {isAddNewPreAdviceOpen && (
        <AddNewPreAdviceFormModal
          isOpen={isAddNewPreAdviceOpen}
          onClose={closeAddNewPreAdvice}
        />
      )}
    </>
  );
};

export default PreAdviceSidePanel;
