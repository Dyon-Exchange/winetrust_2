import React from "react";
import { useQuery } from "react-query";

import getClients from "../../../../api/data/clients/getClients";
import DataTableSpinner from "../../../molecules/progressIndicators/DataTableSpinner";

const ClientsTable = () => {
  // query for clients data
  const {
    data: clientsData,
    isLoading: clientsDataIsLoading,
    error: clientsDataError,
    isError: clientsDataIsError,
    refetch: refetchClientsData,
  } = useQuery("clients", getClients);

  if (clientsDataIsLoading) return <DataTableSpinner />;

  return <></>;
};

export default ClientsTable;
