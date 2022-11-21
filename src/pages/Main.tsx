import React from "react";
import { List } from "../components/List/List";
import { Search } from "../components/Search/Search";
import { useFetchData } from "../hooks/useFetchData";
import { API } from "../api";

export const Main = () => {
  const [data, isLoading, error, searchValue, setSearchValue] = useFetchData(
    API.getSearchRepos
  );

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchValue && typeof setSearchValue === "function") {
      setSearchValue(e.currentTarget.value);
    }
  };

  return (
    <div>
      <Search onChange={changeSearchHandler} value={searchValue as string} />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error as string}</div>}
      {data && <List data={data as []} />}
    </div>
  );
};
