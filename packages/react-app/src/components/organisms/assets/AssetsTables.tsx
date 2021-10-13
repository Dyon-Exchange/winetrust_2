import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getAssets from "../../../api/assets/getAssets";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

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

  return <>{JSON.stringify(assetsData)}</>;
};

export default AssetsTable;
