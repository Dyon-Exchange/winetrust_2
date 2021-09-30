import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getClients from "../../../../api/data/clients/getClients";
import DataTableError from "../../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../../molecules/dataTables/DataTableSpinner";

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

  return <></>;
};

export default ClientsTable;
