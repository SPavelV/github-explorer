import React, { useEffect } from "react";
import { List } from "../components/List/List";
import { Search } from "../components/Search/Search";
import { useFetchData } from "../hooks/useFetchData";
import { API } from "../api";
import { useSearchParams } from "react-router-dom";

export const Main = () => {
  const [searchParams] = useSearchParams();
  const [data, isLoading, error, setSearchValue] = useFetchData(
    API.getSearchRepos
  );

  useEffect(() => {
    if (typeof setSearchValue === "function") {
      setSearchValue(searchParams.get("repoName") || "");
    }
  }, [searchParams, setSearchValue]);

  return (
    <div>
      <Search />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error as string}</div>}
      {data && <List data={data as []} />}
    </div>
  );
};
