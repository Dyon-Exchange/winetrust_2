import { Box, Center, Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";

import getWarehouses from "../../../../api/data/warehouses/getWarehouses";
import useThemeColors from "../../../../hooks/theme/useThemeColors";

const WarehousesTable = () => {
  const colors = useThemeColors();

  //  query for warehouse data
  const {
    data: warehousesData,
    isLoading: warehousesDataIsLoading,
    error: warehousesDataError,
    isError: warehousesDataIsError,
  } = useQuery("warehouses", getWarehouses);

  if (warehousesDataIsLoading)
    return (
      <Center>
        <Spinner color={colors.primary} />
      </Center>
    );

  return <Box>{JSON.stringify(warehousesData)}</Box>;
};

export default WarehousesTable;
