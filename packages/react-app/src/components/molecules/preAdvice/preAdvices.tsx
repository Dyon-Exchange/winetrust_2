import { Box, Button, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { orderBy } from "lodash";
import React, { useCallback, useMemo } from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import usePreAdviceFilter from "../../../zustand/usePreAdviceFilter";

import PreAdviceCard from "./PreAdviceCard";

interface PreAdvicesProps {
  data: PreAdvice[] | undefined;
  loading: boolean | undefined;
  error: boolean | undefined;
  refetch: () => void;
}

const PreAdvices = ({ data, loading, error, refetch }: PreAdvicesProps) => {
  const colors = useThemeColors();

  // get everything needed from the pre-advice filter zustand
  const { selectedPreAdviceId, setSelectedPreAdvice, clearSelectedPreAdvice } =
    usePreAdviceFilter();

  // handler function for when a pre-advice card is clicked
  const handlePreAdviceClicked = useCallback(
    (preAdviceId: string) => {
      if (preAdviceId === selectedPreAdviceId) {
        clearSelectedPreAdvice();
        return;
      }
      setSelectedPreAdvice(preAdviceId);
    },
    [clearSelectedPreAdvice, selectedPreAdviceId, setSelectedPreAdvice]
  );

  const orderedPreAdvice = useMemo(
    () => orderBy(data ?? [], "createdAt", "desc"),
    [data]
  );

  if (loading)
    return (
      <Center>
        <Spinner justifySelf="center" color={colors.primary} />
      </Center>
    );

  if (error)
    return (
      <VStack>
        <Text textAlign="center">
          There was an error fetching the pre-advices data, try again?
        </Text>
        <Button
          colorScheme="blue"
          onClick={refetch}
          size="sm"
          variant="link"
          w="100px"
        >
          Refresh
        </Button>
      </VStack>
    );

  if (data?.length === 0) return <Text textAlign="center">No data</Text>;

  return (
    // min height and max height takes into account the top bar and the add new pre-advice section
    <Box minH="300px" maxH="calc(100vh - 175px)" overflow="auto">
      {orderedPreAdvice.map((preAdvice) => (
        <PreAdviceCard
          key={preAdvice._id}
          preAdvice={preAdvice}
          selected={preAdvice._id === selectedPreAdviceId}
          onClick={() => handlePreAdviceClicked(preAdvice._id)}
        />
      ))}
    </Box>
  );
};

export default PreAdvices;
