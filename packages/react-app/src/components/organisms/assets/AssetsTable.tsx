import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import getAssets from "../../../api/assets/getAssets";
import useFuseSearch from "../../../hooks/search/useFuseSearch";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import usePreAdviceFilter from "../../../zustand/usePreAdviceFilter";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

import NFTDisplayHandler from "./NFTDisplayHandler";

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
    field: "expectedArrivalDate",
    headerName: "Expected Arrival",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      dayjs((param.row as Asset).expectedArrivalDate).format(
        "ddd MMM DD, YYYY"
      ),
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
    renderCell: (param: GridValueGetterParams) => (
      <NFTDisplayHandler row={param.row as Asset} />
    ),
  },
];

interface AssetsTableProps {
  searchQuery: string;
}

const AssetsTable = ({ searchQuery }: AssetsTableProps) => {
  const toast = useDefaultToast();

  // get everything needed from the pre-advice filter zustand
  const { selectedPreAdviceId } = usePreAdviceFilter();

  // query for assets data
  const {
    data: assetsData,
    isLoading: assetsDataIsLoading,
    error: assetsDataError,
    isError: assetsDataIsError,
    refetch: refetchAssetsData,
  } = useQuery("assets", getAssets);

  const filteredAssetsData: Asset[] | undefined = useMemo(() => {
    if (!assetsData) return undefined;
    if (selectedPreAdviceId)
      return assetsData.filter(
        (asset: Asset) => asset.preAdvice._id === selectedPreAdviceId
      );
    return assetsData;
  }, [assetsData, selectedPreAdviceId]);

  // filter the assets data if there is a search query
  const searchFilteredAssetsData = useFuseSearch(
    filteredAssetsData || [],
    [
      "preAdvice.preAdviceId",
      "product.productName",
      "product.year",
      "product.packSize",
      "product._id",
      "product.dutyStatus",
      "product.cost.currency",
      "product.cost.amount",
      "preAdvice.transferringWarehouse.name",
      "preAdvice.arrivingWarehouse.name",
      "preAdvice.owner.firstName",
      "preAdvice.owner.lastName",
      "state",
      "_id",
    ],
    searchQuery
  );

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
      rows={
        orderBy(
          searchFilteredAssetsData || filteredAssetsData,
          "createdAt",
          "desc"
        ) ?? []
      }
    />
  );
};

export default AssetsTable;
