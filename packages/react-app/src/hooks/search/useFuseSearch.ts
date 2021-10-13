import Fuse from "fuse.js";
import { useMemo } from "react";

const useFuseSearch = (
  data: any[],
  searchKeys: string[],
  searchTerm: string
) => {
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        threshold: 0.1, // makes it more strict
        keys: searchKeys,
      }),
    [data, searchKeys]
  );

  const fuseSearchResults = useMemo(() => {
    if (searchTerm) {
      return fuse.search(searchTerm).map((i: any) => i.item);
    }
    return data;
  }, [data, fuse, searchTerm]);

  return fuseSearchResults;
};

export default useFuseSearch;
