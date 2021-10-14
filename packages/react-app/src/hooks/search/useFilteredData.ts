import { useState } from "react";
import { useQuery } from "react-query";

import useFuseSearch from "./useFuseSearch";

interface Props<T> {
  useQueryKey: string;
  getFunction: () => Promise<T[]>;
  filterFields: string[];
}

const useFilteredData = <T>({
  useQueryKey,
  getFunction,
  filterFields,
}: Props<T>) => {
  const [searchQry, setSearchQry] = useState("");

  const { data, ...useQueryData } = useQuery<T[]>([useQueryKey], getFunction);

  const filteredData = useFuseSearch(data || [], filterFields, searchQry);

  return { setSearchQry, filteredData, ...useQueryData };
};

export default useFilteredData;
