import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getAssets from "../../../api/assets/getAssets";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

// column headers for the assets data table
const assetsTableColumns: GridColDef[] = [
  {
    field: "preAdviceId",
    headerName: "Pre-Advice ID",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).preAdvice.preAdviceId,
  },
  {
    field: "productName",
    headerName: "Product",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product.productName,
  },
  {
    field: "productYear",
    headerName: "Year",
    flex: 1,
    minWidth: 150,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product.year,
  },
  {
    field: "productPackSize",
    headerName: "Pack Size",
    flex: 1,
    minWidth: 150,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product.packSize,
  },
  {
    field: "productId",
    headerName: "Product ID",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product._id,
  },
  {
    field: "productDutyStatus",
    headerName: "Duty Status",
    flex: 1,
    minWidth: 150,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product.dutyStatus,
  },
  {
    field: "price",
    headerName: "Original Price",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      `${(param.row as Asset).cost.currency} ${(
        param.row as Asset
      ).cost.amount.toLocaleString()}`,
  },
  {
    field: "transferringWarehouse",
    headerName: "Transferring Warehouse",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).preAdvice.transferringWarehouse.name,
  },
  {
    field: "arrivalWarehouse",
    headerName: "Arrival Warehouse",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).preAdvice.arrivalWarehouse.name,
  },
  {
    field: "owner",
    headerName: "Owner",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) =>
      `${(param.row as Asset).preAdvice.owner.firstName} ${
        (param.row as Asset).preAdvice.owner.lastName
      }`,
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
    minWidth: 150,
    valueGetter: (param: GridValueGetterParams) => (param.row as Asset).state,
  },
  {
    field: "assetId",
    headerName: "Asset ID",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) => (param.row as Asset)._id,
  },
  {
    field: "tokenId",
    headerName: "Token ID",
    flex: 1,
    minWidth: 250,
    valueGetter: (param: GridValueGetterParams) => (param.row as Asset)._id,
  },
];

interface AssetsTableProps {
  searchQuery: string;
}

const AssetsTable = ({ searchQuery }: AssetsTableProps) => {
  const toast = useDefaultToast();

  // query for assets data
  const {
    data: assetsData,
    isLoading: assetsDataIsLoading,
    error: assetsDataError,
    isError: assetsDataIsError,
    refetch: refetchAssetsData,
  } = useQuery("assets", getAssets);

  // pop an error toast if assets data query errors
  useEffect(() => {
    if (assetsDataIsError && assetsDataError) {
      toast({
        title: "Error fetching assets.",
        description:
          (assetsDataError as AxiosError).response?.data ||
          "There was an error fetching the assets data, please try again later.",
        status: "error",
      });
    }
  }, [assetsDataError, assetsDataIsError, toast]);

  if (assetsDataIsLoading) return <DataTableSpinner />;

  if (assetsDataIsError)
    return (
      <DataTableError
        message="There was an error fetching the assets data, try again?"
        refetch={refetchAssetsData}
      />
    );

  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={assetsTableColumns}
      rows={orderBy(assetsData, "createdAt", "desc") ?? []}
      style={{ height: "75vh" }}
    />
  );
};

export default AssetsTable;
