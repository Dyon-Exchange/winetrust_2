import { styled } from "@material-ui/styles";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

// min height and max height takes into account the top bar

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  minHeight: "225px",
  height: "calc(100vh - 300px)",
  "& .MuiDataGrid-columnsContainer" : {
    background: "rgba(43, 108, 176, 0.5)"
  },
  "& .MuiDataGrid-columnHeaderTitleContainer" : {
    color: "#fff"
  }
});

export default StyledDataGrid;
