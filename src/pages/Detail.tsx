import React, { useEffect } from "react";
import { RepoType, useFetchData } from "../hooks/useFetchData";
import { useParams } from "react-router";
import { API } from "../api";

export const Detail = () => {
  const [data, isLoading, error, setSearchValue] = useFetchData(API.getDetail);

  const currentData = data as RepoType;

  const { owner, name } = useParams();

  useEffect(() => {
    if (
      setSearchValue &&
      typeof setSearchValue === "function" &&
      name &&
      owner
    ) {
      setSearchValue(`${owner}/${name}`);
    }
  }, [name, owner, setSearchValue]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error as string}</div>}
      {currentData && (
        <div>
          {currentData.name && <h2>{currentData.name}</h2>}
          {currentData && (
            <ul>
              {currentData.description && (
                <li>
                  <h3>Description</h3>
                  <p>{currentData.description}</p>
                </li>
              )}
              {currentData.size && (
                <li>
                  <h3>Size: </h3>
                  <p>{currentData.size}</p>
                </li>
              )}
              {currentData.stargazers_count && (
                <li>
                  <h3>Stargazers count: </h3>
                  <p>{currentData.stargazers_count}</p>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
