import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

interface PreAdviceCardProps {
  preAdvice: PreAdvice;
}

const PreAdviceCard = ({ preAdvice }: PreAdviceCardProps) => {
  const colors = useThemeColors();

  return (
    <Stack
      bg={colors.secondary}
      p=" 10px 15px"
      m="2.5px 0px"
      cursor="pointer"
      onClick={() => {}}
    >
      <HStack justifyContent="space-between">
        <Box>
          <Text fontSize="xs" fontWeight="thin">
            Transferrer
          </Text>
          <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
            {`${preAdvice.owner.firstName} ${preAdvice.owner.lastName}`}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="thin">
            Pre-Advice ID
          </Text>
          <Text fontSize="sm" fontWeight="bold" textAlign="right">
            {preAdvice.preAdviceId}
          </Text>
        </Box>
      </HStack>
      <Box>
        <Text fontSize="xs" fontWeight="thin">
          Arrival Warehouse
        </Text>
        <Text fontSize="sm" noOfLines={1}>
          {preAdvice.arrivalWarehouse.name}
        </Text>
      </Box>
      <Box>
        <Text fontSize="xs" fontWeight="thin">
          Status
        </Text>
        <Text fontSize="sm" noOfLines={1}>
          {preAdvice.state}
        </Text>
      </Box>
    </Stack>
  );
};

export default PreAdviceCard;
