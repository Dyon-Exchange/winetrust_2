import {
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getClients from "../../../api/data/clients/getClients";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

// column headers for the clients data table
const clientsTableColumns: GridColDef[] = [
  { 
    field: "firstName", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "First Name", 
    flex: 1, minWidth: 200 
  },
  { 
    field: "lastName", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Last Name", 
    flex: 1, minWidth: 200 
  },
  {
    field: "phoneNumber",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      `(${(param.value as PhoneNumber).countryCode}) ${
        (param.value as PhoneNumber).phoneNumber
      }`,
  },
  { 
    field: "ethAddress", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "ETH Address", 
    flex: 1, minWidth: 400 
  },
];

interface Props {
  setDeleteList?: React.Dispatch<React.SetStateAction<string[]>>;
  assets: Asset[];
}

const ClientsTable: React.FC<Props> = ({ setDeleteList, assets }) => {
  const toast = useDefaultToast();

  // query for clients data
  const {
    data: clientsData,
    isLoading: clientsDataIsLoading,
    error: clientsDataError,
    isError: clientsDataIsError,
    refetch: refetchClientsData,
  } = useQuery("clients", getClients);

  // pop an error toast if clients data query errors
  useEffect(() => {
    if (clientsDataIsError && clientsDataError) {
      toast({
        title: "Error fetching clients.",
        description:
          (clientsDataError as AxiosError).response?.data ||
          "There was an error fetching the clients data, please try again later.",
        status: "error",
      });
    }
  }, [clientsDataError, clientsDataIsError, toast]);

  if (clientsDataIsLoading) return <DataTableSpinner />;

  if (clientsDataIsError)
    return (
      <DataTableError
        message='There was an error fetching the clients data, try again?'
        refetch={refetchClientsData}
      />
    );

  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={clientsTableColumns}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        if (setDeleteList) setDeleteList(ids.map((id) => id.toString()));
      }}
      rows={orderBy(clientsData, "createdAt", "desc") ?? []}
      isRowSelectable={(params: GridRowParams) => {
        const asset = assets.find((a) => a.preAdvice?.owner?._id === params.id);
        return !asset;
      }}
    />
  );
};

export default ClientsTable;
