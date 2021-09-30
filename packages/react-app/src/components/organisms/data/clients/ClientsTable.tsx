import { useToast } from "@chakra-ui/react";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getClients from "../../../../api/data/clients/getClients";
import StyledDataGrid from "../../../atoms/tables/StyledDataGrid";
import DataTableError from "../../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../../molecules/dataTables/DataTableSpinner";

// column headers for the clients data table
const clientsTableColumns: GridColDef[] = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 200 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 200 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) =>
      `(${(param.value as PhoneNumber).countryCode}) ${
        (param.value as PhoneNumber).phoneNumber
      }`,
  },
  { field: "ethAddress", headerName: "ETH Address", flex: 1, minWidth: 400 },
];

const ClientsTable = () => {
  const toast = useToast();

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
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [clientsDataError, clientsDataIsError, toast]);

  if (clientsDataIsLoading) return <DataTableSpinner />;

  if (clientsDataIsError)
    return (
      <DataTableError
        message="There was an error fetching the clients data, try again?"
        refetch={() => refetchClientsData()}
      />
    );

  return (
    <StyledDataGrid
      autoHeight
      disableSelectionOnClick
      disableColumnSelector
      hideFooter
      columns={clientsTableColumns}
      rows={orderBy(clientsData, "createdAt", "desc") ?? []}
    />
  );
};

export default ClientsTable;
