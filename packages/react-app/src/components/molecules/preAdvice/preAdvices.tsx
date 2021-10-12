import { Box, Button, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { orderBy } from "lodash";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

import PreAdviceCard from "./PreAdviceCard";

interface PreAdvicesProps {
  data: PreAdvice[] | undefined;
  loading: boolean | undefined;
  error: boolean | undefined;
  refetch: () => void;
}

const PreAdvices = ({ data, loading, error, refetch }: PreAdvicesProps) => {
  const colors = useThemeColors();

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
      {orderBy(data, "createdAt", "desc")?.map((preAdvice) => (
        <PreAdviceCard key={preAdvice._id} preAdvice={preAdvice} />
      ))}
    </Box>
  );
};

export default PreAdvices;
