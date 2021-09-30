import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getProducts from "../../../../api/data/products/getProducts";
import DataTableError from "../../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../../molecules/dataTables/DataTableSpinner";

const ProductsTable = () => {
  const toast = useToast();

  // query for products data
  const {
    data: productsData,
    isLoading: productsDataIsLoading,
    error: productsDataError,
    isError: productsDataIsError,
    refetch: refetchProductsData,
  } = useQuery("products", getProducts);

  // pop an error toast if products data query errors
  useEffect(() => {
    if (productsDataIsError && productsDataError) {
      toast({
        title: "Error fetching products.",
        description:
          (productsDataError as AxiosError).response?.data ||
          "There was an error fetching the products data, please try again later.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [productsDataError, productsDataIsError, toast]);

  if (productsDataIsLoading) return <DataTableSpinner />;

  if (productsDataIsError)
    return (
      <DataTableError
        message="There was an error fetching the products data, try again?"
        refetch={() => refetchProductsData()}
      />
    );

  return <></>;
};

export default ProductsTable;
