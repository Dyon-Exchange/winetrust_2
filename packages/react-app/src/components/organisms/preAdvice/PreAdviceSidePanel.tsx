import { Box, Heading, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

import AddNewPreAdviceFormModal from "./AddNewPreAdviceFormModal";

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

  return (
    <>
      <Box bg={colors.tertiary} minW="225px">
        <VStack alignItems="start" p="20px 25px">
          <Heading fontSize="xl">Pre-Advice</Heading>
          <AddNewButton onClick={openAddNewPreAdvice} />
        </VStack>
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
