import { useEffect, useState } from "react";

type OwnerType = {
  name: string;
};

export type RepoType = {
  name: string;
  id: string;
  description: string;
  owner: OwnerType;
  size: number;
  stargazers_count: number;
};

export type ReadmeType = {
  content: string;
  download_url: string;
  encoding: "base64";
  git_url: string;
  html_url: string;
  name: "README.md";
  path: "README.md";
  sha: string;
  size: number;
  type: "file";
};

export type langsType = {
  [key: string]: number;
};

export type DetailType = {
  langs: langsType;
  readme: ReadmeType;
};

export const useFetchData = (
  apiMethod: (searchText: string) => Promise<any>
) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<RepoType | RepoType[] | DetailType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (searchValue) {
      const getData = async () => {
        setIsLoading(true);

        const result = await apiMethod(searchValue);

        if (isSubscribed) {
          setData(result);
        }
      };

      getData()
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      setData(null);
    }
    setError("");
    return () => (isSubscribed = false);
  }, [searchValue, apiMethod]);

  return [data, isLoading, error, setSearchValue];
};
