import {
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect, useState, useRef, Ref } from "react";
import { useQuery } from "react-query";

import getProducts from "../../../api/data/products/getProducts";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

// column headers for the products data table
const productsTableColumns: GridColDef[] = [
  { 
    field: "productName", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Product Name", 
    flex: 1, minWidth: 200 
  },
  { 
    field: "year",
    headerClassName: "super-app-theme--header",
    headerAlign: "center", 
    headerName: "Year", 
    flex: 1, minWidth: 125 
  },
  { 
    field: "region", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Region", 
    flex: 1, minWidth: 200 
  },
  {
    field: "subRegion",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Sub-Region",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => param.value || "--",
  },
  {
    field: "subSubRegion",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Sub-Sub-Region",
    flex: 1,
    minWidth: 200,
    valueGetter: (param: GridValueGetterParams) => param.value || "--",
  },
  { 
    field: "packSize", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Pack Size", 
    flex: 1, minWidth: 150 
  },
  { 
    field: "_id", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Product ID", 
    flex: 1, minWidth: 300 
  },
  { 
    field: "description", 
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Description", 
    flex: 1, minWidth: 200 
  },
  // { 
  //   field: "dutyStatus", 
  //   headerClassName: "super-app-theme--header",
  //   headerAlign: "center",
  //   headerName: "Duty Status", 
  //   flex: 1, minWidth: 150 
  // },
];

interface Props {
  setDeleteList?: React.Dispatch<React.SetStateAction<string[]>>;
  assets: Asset[];
}

const ProductsTable: React.FC<Props> = ({ setDeleteList, assets }) => {
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
        message='There was an error fetching the products data, try again?'
        refetch={refetchProductsData}
      />
    );

  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={productsTableColumns}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        if (setDeleteList) setDeleteList(ids.map((id) => id.toString()));
      }}
      rows={orderBy(productsData, "createdAt", "desc") ?? []}
      isRowSelectable={(params: GridRowParams) => {
        const asset = assets.find((a) => a.product?._id === params.id);
        return !asset || asset.state === "Landed";
      }}
    />
  );
};

export default ProductsTable;