import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

interface PreAdviceCardProps {
  preAdvice: PreAdvice;
  selected?: boolean;
  onClick?: () => void;
}

const PreAdviceCard = ({
  preAdvice,
  onClick,
  selected,
}: PreAdviceCardProps) => {
  const colors = useThemeColors();
  const cardBgColor = selected ? colors.primary : colors.secondary;
  const textColor = selected ? "white" : undefined;

  return (
    <Stack
      bg={cardBgColor}
      p=" 10px 15px"
      m="2.5px 0px"
      cursor="pointer"
      onClick={onClick || undefined}
    >
      <HStack justifyContent="space-between">
        <Box>
          <Text color={textColor} fontSize="xs" fontWeight="thin">
            Transferrer
          </Text>
          <Text color={textColor} fontSize="sm" fontWeight="bold" noOfLines={1}>
            {`${preAdvice.owner.firstName} ${preAdvice.owner.lastName}`}
          </Text>
        </Box>
        <Box>
          <Text color={textColor} fontSize="xs" fontWeight="thin">
            Pre-Advice ID
          </Text>
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="bold"
            textAlign="right"
          >
            {preAdvice.preAdviceId}
          </Text>
        </Box>
      </HStack>
      <Box>
        <Text color={textColor} fontSize="xs" fontWeight="thin">
          Arrival Warehouse
        </Text>
        <Text color={textColor} fontSize="sm" noOfLines={1}>
          {preAdvice.arrivalWarehouse.name}
        </Text>
      </Box>
      <Box>
        <Text color={textColor} fontSize="xs" fontWeight="thin">
          Status
        </Text>
        <Text color={textColor} fontSize="sm" noOfLines={1}>
          {preAdvice.state}
        </Text>
      </Box>
    </Stack>
  );
};

export default PreAdviceCard;
