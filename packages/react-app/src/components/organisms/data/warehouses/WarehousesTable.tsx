import { Center, Spinner } from "@chakra-ui/react";
import { styled } from "@material-ui/core/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";

import getWarehouses from "../../../../api/data/warehouses/getWarehouses";
import useThemeColors from "../../../../hooks/theme/useThemeColors";

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

const StyledDataGrid = styled(DataGrid)({
  border: "none",
});

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
