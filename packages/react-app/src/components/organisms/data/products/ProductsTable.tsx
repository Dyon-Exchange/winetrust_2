import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import getProducts from "../../../../api/data/products/getProducts";
import useDefaultToast from "../../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../../atoms/tables/StyledDataGrid";
import DataTableError from "../../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../../molecules/dataTables/DataTableSpinner";

// column headers for the products data table
const productsTableColumns: GridColDef[] = [
  { field: "productName", headerName: "Product Name", flex: 1, minWidth: 200 },
  { field: "year", headerName: "Year", flex: 1, minWidth: 125 },
  { field: "region", headerName: "Region", flex: 1, minWidth: 200 },
  {
    field: "subRegion",
    headerName: "Sub-Region",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => param.value || "--",
  },
  {
    field: "subSubRegion",
    headerName: "Sub-Sub-Region",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => param.value || "--",
  },
  { field: "packSize", headerName: "Pack Size", flex: 1, minWidth: 150 },
  { field: "dutyStatus", headerName: "Duty Status", flex: 1, minWidth: 150 },
];

const ProductsTable = () => {
  const toast = useDefaultToast();

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
      });
    }
  }, [productsDataError, productsDataIsError, toast]);

  if (productsDataIsLoading) return <DataTableSpinner />;

  if (productsDataIsError)
    return (
      <DataTableError
        message="There was an error fetching the products data, try again?"
        refetch={refetchProductsData}
      />
    );

  return (
    <StyledDataGrid
      autoHeight
      disableSelectionOnClick
      disableColumnSelector
      hideFooter
      columns={productsTableColumns}
      rows={orderBy(productsData, "createdAt", "desc") ?? []}
    />
  );
};

export default ProductsTable;
