import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListInner = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  h2 {
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 10px;
  }
  a {
    color: blueviolet;
    text-decoration: none;
  }

  li + li {
    margin-top: 24px;
  }
`;

type ListProps = {
  data?: [];
};

export const List: FC<ListProps> = ({ data = [] }) => {
  if (!data.length) return null;

  const clickHandler = (id: string) => {
    console.log("click id :>> ", id);
  };

  return (
    <ListInner>
      {data.map(({ name, id, description, owner }: any) => {
        const login = owner ? (`${owner.login as string}/` as string) : "";
        const to = `${login}${name}`;
        return (
          <li key={id}>
            <h2>
              <Link to={to} onClick={() => clickHandler(id)}>
                {name}
              </Link>
            </h2>
            <p>{description}</p>
          </li>
        );
      })}
    </ListInner>
  );
};
