import React, { FC } from "react";
import styled from "styled-components";

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

type SearchProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Search: FC<SearchProps> = ({ onChange, value = "" }) => {
  return (
    <Label>
      <LabelText>Введите название репозитория</LabelText>
      <StyledInput type="text" value={value} onChange={onChange} />
    </Label>
  );
};
