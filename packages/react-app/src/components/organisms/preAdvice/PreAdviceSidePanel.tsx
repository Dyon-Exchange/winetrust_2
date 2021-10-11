import {
  Box,
  Center,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";

import getPreAdvices from "../../../api/preAdvice/getPreAdvices";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import PreAdviceCard from "../../molecules/preAdvice/PreAdviceCard";

import AddNewPreAdviceFormModal from "./AddNewPreAdviceFormModal";

interface PreAdvicesProps {
  data: PreAdvice[] | undefined;
  loading: boolean | undefined;
}

const PreAdvices = ({ data, loading }: PreAdvicesProps) => {
  const colors = useThemeColors();
  if (loading || !data)
    return (
      <Center>
        <Spinner justifySelf="center" color={colors.primary} />
      </Center>
    );

  return (
    <Box overflow="auto">
      {data.map((preAdvice) => (
        <PreAdviceCard key={preAdvice._id} preAdvice={preAdvice} />
      ))}
    </Box>
  );
};

const PreAdviceSidePanel = () => {
  const colors = useThemeColors();

  // state for the add new pre advice modal
  const {
    isOpen: isAddNewPreAdviceOpen,
    onOpen: openAddNewPreAdvice,
    onClose: closeAddNewPreAdvice,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // query for pre advices data
  const {
    data: preAdvicesData,
    isLoading: preAdvicesDataIsLoading,
    error: preAdvicesDataError,
    isError: preAdvicesDataIsError,
    refetch: refetchPreAdvicesData,
  } = useQuery("pre-advices", getPreAdvices);

  return (
    <>
      <Box bg={colors.tertiary} minW="300px" maxW="300px">
        <VStack alignItems="start" p="20px 25px">
          <Heading fontSize="xl">Pre-Advice</Heading>
          <AddNewButton onClick={openAddNewPreAdvice} />
        </VStack>
        <PreAdvices data={preAdvicesData} loading={preAdvicesDataIsLoading} />
      </Box>

      {/* Add new pre advice modal, only render the modal when it's open state is true so that useForm hook resets */}
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
