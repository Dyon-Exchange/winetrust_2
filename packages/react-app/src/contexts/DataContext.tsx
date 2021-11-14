import React, { createContext, useState, ReactChild, useEffect } from "react";
import { useQuery } from "react-query";

import getAssets from "../api/assets/getAssets";

interface IDataContext {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

const INITIAL_DATA_CONTEXT = {
  assets: [] as Asset[],
  setAssets: () => {},
};

export const DataContext = createContext<IDataContext>(INITIAL_DATA_CONTEXT);

interface Props {
  children: ReactChild;
}

const DataContextProvider: React.FC<Props> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const { data: assetsData } = useQuery("assets", getAssets);

  useEffect(() => {
    if (assetsData) setAssets(assetsData);
    console.log("okay", assetsData);
  }, [assetsData]);

  return (
    <DataContext.Provider value={{ assets, setAssets }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
