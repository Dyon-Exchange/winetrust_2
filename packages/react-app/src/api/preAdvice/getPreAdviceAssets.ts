import { GridCellValue } from "@mui/x-data-grid";
import axios from "axios";

export default async (preadviceId: GridCellValue): Promise<Asset[]> => {
  const { data } = await axios.get(`/pre-advice/assets/${preadviceId}`);
  const assets: Asset[] = data.data;
  return assets;
};
