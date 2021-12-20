import {
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect, useState, useRef, Ref } from "react";
import { useQuery } from "react-query";

import getPreAdvices from "../../../api/preAdvice/getPreAdvices";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

// column headers for the preAdvices data table
const preAdviceTableColumns: GridColDef[] = [
  {
    field: "preAdviceId",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Number",
    flex: 1,
    minWidth: 175,
  },
  {
    field: "owner",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Transferring Client",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => `${
      (param.value as Client).firstName
    } ${(param.value as Client).lastName}
    `,
  },
  {
    field: "transferringWarehouse",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Origin Warehouse",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      (param.value as Warehouse).name,
  },
  {
    field: "arrivalWarehouse",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Destination Warehouse",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      (param.value as Warehouse).name,
  },
  {
    field: "state",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Landing Status",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "createdAt",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Date Placed",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "_id",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Products",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => "See Products", //  WIP button that open a modal with list of products
  },
];

interface Props {
  setDeleteList?: React.Dispatch<React.SetStateAction<string[]>>;
  assets: Asset[];
}

const PreAdvicesTable: React.FC<Props> = ({ setDeleteList, assets }) => {
  const toast = useDefaultToast();

  // query for pre-advices data
  const {
    data: preAdvicesData,
    isLoading: preAdvicesDataIsLoading,
    error: preAdvicesDataError,
    isError: preAdvicesDataIsError,
    refetch: refetchPreAdvicesData,
  } = useQuery("pre-advices", getPreAdvices);
  console.log(preAdvicesData);
  // pop an error toast if preAdvices data query errors
  useEffect(() => {
    if (preAdvicesDataIsError && preAdvicesDataError) {
      toast({
        title: "Error fetching preAdvices.",
        description:
          (preAdvicesDataError as AxiosError).response?.data ||
          "There was an error fetching the preAdvices data, please try again later.",
        status: "error",
      });
    }
  }, [preAdvicesDataError, preAdvicesDataIsError, toast]);

  if (preAdvicesDataIsLoading) return <DataTableSpinner />;

  if (preAdvicesDataIsError)
    return (
      <DataTableError
        message="There was an error fetching the preAdvices data, try again?"
        refetch={refetchPreAdvicesData}
      />
    );

  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={preAdviceTableColumns}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        if (setDeleteList) setDeleteList(ids.map((id) => id.toString()));
      }}
      rows={orderBy(preAdvicesData, "createdAt", "desc") ?? []}
    />
  );
};

export default PreAdvicesTable;
