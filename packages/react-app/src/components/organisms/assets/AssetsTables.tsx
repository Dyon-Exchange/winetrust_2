import React from "react";
import { useQuery } from "react-query";

import getAssets from "../../../api/assets/getAssets";

const AssetsTable = () => {
  // query for assets data
  const {
    data: assetsData,
    isLoading: assetsDataIsLoading,
    error: assetsDataError,
    isError: assetsDataIsError,
    refetch: refetchAssetsData,
  } = useQuery("assets", getAssets);

  if (assetsDataIsLoading) return <>Loading...</>;

  return <>{JSON.stringify(assetsData)}</>;
};

export default AssetsTable;
