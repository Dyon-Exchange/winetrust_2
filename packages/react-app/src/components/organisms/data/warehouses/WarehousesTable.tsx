import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getWarehouses from "../../../../api/data/warehouses/getWarehouses";
import useDefaultToast from "../../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../../atoms/tables/StyledDataGrid";
import DataTableError from "../../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../../molecules/dataTables/DataTableSpinner";

// column headers for the warehouses data table
const warehousesTableColumns: GridColDef[] = [
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

interface Props {
  setDeleteList?: React.Dispatch<React.SetStateAction<string[]>>;
  assets: Asset[];
}

const WarehousesTable: React.FC<Props> = ({ setDeleteList, assets }) => {
  const toast = useDefaultToast();

  //  query for warehouses data
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
      });
    }
  }, [toast, warehousesDataError, warehousesDataIsError]);

  if (warehousesDataIsLoading) return <DataTableSpinner />;

  if (warehousesDataIsError)
    return (
      <DataTableError
        message='There was an error fetching the warehouses data, try again?'
        refetch={refetchWarehousesData}
      />
    );

  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={warehousesTableColumns}
      // checkboxSelection
      onSelectionModelChange={(ids) => {
        if (setDeleteList) setDeleteList(ids.map((id) => id.toString()));
      }}
      rows={orderBy(warehousesData, "createdAt", "desc") ?? []}
      // isRowSelectable={(params: GridRowParams) => {
      //   const asset = assets.find((a) => a.product?._id === params.id);
      //   return asset?.state === "Landed";
      // }}
    />
  );
};

export default WarehousesTable;
