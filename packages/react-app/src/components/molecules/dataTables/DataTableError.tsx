import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface DataTableErrorProps {
  message: string;
  refetch: () => void;
}

const DataTableError = ({ message, refetch }: DataTableErrorProps) => (
  <Stack alignItems="center">
    <Text textAlign="center">{message}</Text>
    <Button
      colorScheme="blue"
      onClick={refetch}
      size="sm"
      variant="link"
      w="100px"
    >
      Refresh
    </Button>
  </Stack>
);

export default DataTableError;
