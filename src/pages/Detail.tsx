import React, { useEffect, useMemo } from "react";
import { DetailType, useFetchData } from "../hooks/useFetchData";
import { useParams } from "react-router";
import { API } from "../api";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { getColor } from "../utils/getColor";

const ListStyled = styled.ul`
  list-style: none;
  margin: 8px 0 0 0;
  padding: 0;
`;

const LiStyled = styled.li`
  display: flex;
  align-items: center;

  ::before {
    content: "•";
    font-size: 30px;
    color: ${(props) => props.color || "grey"};

    margin-right: 8px;
  }
`;

export const Detail = () => {
  const [data, isLoading, error, setSearchValue] = useFetchData(API.getDetail);

  const currentData = data as DetailType;

  const { owner, name } = useParams();

  useEffect(() => {
    if (typeof setSearchValue === "function" && name && owner) {
      setSearchValue(`${owner}/${name}`);
    }
  }, [name, owner, setSearchValue]);

  const markDown = useMemo(
    () =>
      currentData?.readme?.content
        ? window.atob(currentData.readme.content)
        : "",
    [currentData?.readme?.content]
  );

  const langSumBytes = useMemo(
    () =>
      currentData?.langs
        ? Object.values(currentData.langs).reduce((sum, num) => (sum += num))
        : 0,
    [currentData?.langs]
  );

  const sortedLangs = useMemo(() => {
    let result: { [key: string]: number } = {};
    let other = 0;

    if (currentData?.langs) {
      for (let key of Object.keys(currentData.langs)) {
        const percent = (currentData.langs[key] / langSumBytes) * 100;
        if (percent <= 0.1) other += percent;
        else result[key] = percent;
      }
    }

    return { ...result, other } as { [key: string]: number };
  }, [currentData?.langs, langSumBytes]);

  const listJSX = (
    <ListStyled>
      {Object.keys(sortedLangs).map((key) => {
        return (
          <LiStyled color={key === "other" ? "grey" : getColor(key)} key={key}>
            {key}: {sortedLangs[key].toFixed(1)}%
          </LiStyled>
        );
      })}
    </ListStyled>
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error as string}</div>}
      {currentData?.langs && (
        <div>
          <i>Languages:</i>
          {listJSX}
        </div>
      )}

      {currentData?.readme && (
        <div>
          {currentData.readme.name && <h3>{currentData.readme.name}</h3>}
          {currentData.readme.content && <ReactMarkdown children={markDown} />}
        </div>
      )}
    </div>
  );
};
