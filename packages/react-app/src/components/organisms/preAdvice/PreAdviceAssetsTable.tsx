import {
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
  GridCellValue,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import getClients from "../../../api/data/clients/getClients";
import getPreAdviceAssets from "../../../api/preAdvice/getPreAdviceAssets";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import StyledDataGrid from "../../atoms/tables/StyledDataGrid";
import DataTableError from "../../molecules/dataTables/DataTableError";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";
import AssetStateHandler from "../assets/AssetStateHandler";

// column headers for the clients data table
// column headers for the assets data table
const assetsTableColumns: GridColDef[] = [
  {
    field: "simpleName",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Product",
    minWidth: 350,
    align: "center",
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product.simpleName,
  },
  {
    field: "productPackSize",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Pack Size",
    minWidth: 100,
    align: "center",
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).product?.packSize || "",
  },
  {
    field: "assetId",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Asset ID",
    minWidth: 200,
    align: "center",
    valueGetter: (param: GridValueGetterParams) =>
      (param.row as Asset).assetId || "",
  },
  // {
  //   field: "productDutyStatus",
  //   headerClassName: "super-app-theme--header",
  //   headerAlign: "center",
  //   headerName: "Duty Status",
  //   minWidth: 100,
  //   align: "center",
  //   flex:1,
  //   valueGetter: (param: GridValueGetterParams) =>
  //     (param.row as Asset).product?.dutyStatus || "",
  // },
  {
    field: "state",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    headerName: "Landing Status",
    minWidth: 100,
    align: "center",
    flex:1
  },
];

interface Props {
  prop: GridCellValue;
}

const PreAdviceAssetsTable: React.FC<Props> = ({ prop }) => {
  const [user, setUser] = useState<Asset[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    getPreAdviceAssets(prop).then((fetchedUser) => {
      setPending(false);
      setUser(fetchedUser);
    });
  }, [prop]);
  console.log(user)
  return (
    <StyledDataGrid
      disableSelectionOnClick
      disableColumnSelector
      columns={assetsTableColumns}
      rows={user}
    />
  );
};

export default PreAdviceAssetsTable;
