import React, { FC } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Label = styled.label`
  display: block;
  margin-bottom: 24px;
`;

const StyledInput = styled.input`
  padding: 8px;
  display: block;
  border-radius: 6px;
  font-size: 16px;
  border: 1px solid grey;
`;

const LabelText = styled.div`
  margin-bottom: 8px;
`;

export const Search: FC = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchparams({
      repoName: e.target.value,
    });
  };
  return (
    <Label>
      <LabelText>Введите название репозитория</LabelText>
      <StyledInput
        type="text"
        value={searchParams.get("repoName") || ""}
        onChange={changeHandler}
      />
    </Label>
  );
};
