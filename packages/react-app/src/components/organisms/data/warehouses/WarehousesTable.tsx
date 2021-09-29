import {
  Button,
  Center,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GridColDef } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getWarehouses from "../../../../api/data/warehouses/getWarehouses";
import useThemeColors from "../../../../hooks/theme/useThemeColors";
import StyledDataGrid from "../../../atoms/tables/StyledDataGrid";

// column headers for the warehouses data table
const warehouseTableColumns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
  { field: "address", headerName: "Address", flex: 2, minWidth: 400 },
  {
    field: "contactName",
    headerName: "Contact Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "contactEmail",
    headerName: "Contact Email",
    flex: 1,
    minWidth: 200,
  },
];

const WarehousesTable = () => {
  const colors = useThemeColors();
  const toast = useToast();

  //  query for warehouse data
  const {
    data: warehousesData,
    isLoading: warehousesDataIsLoading,
    error: warehousesDataError,
    isError: warehousesDataIsError,
    refetch: refetchWarehousesData,
  } = useQuery("warehouses", getWarehouses);

  // pop an error toast if warehouses data query errors
  useEffect(() => {
    if (warehousesDataIsError && warehousesDataError) {
      toast({
        title: "Error fetching warehouses.",
        description:
          (warehousesDataError as AxiosError).response?.data ||
          "There was an error fetching the warehouses data, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, warehousesDataError, warehousesDataIsError]);

  if (warehousesDataIsLoading)
    return (
      <Center>
        <Spinner color={colors.primary} />
      </Center>
    );

  if (warehousesDataIsError)
    return (
      <Stack alignItems="center">
        <Text textAlign="center">
          There was an error fetching the warehouses data, try again?
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => refetchWarehousesData()}
          size="sm"
          variant="link"
          w="100px"
        >
          Refresh
        </Button>
      </Stack>
    );

  return (
    <StyledDataGrid
      autoHeight
      disableSelectionOnClick
      disableColumnSelector
      hideFooter
      columns={warehouseTableColumns}
      rows={warehousesData ?? []}
    />
  );
};

export default WarehousesTable;
