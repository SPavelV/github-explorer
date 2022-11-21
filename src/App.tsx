import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Detail } from "./pages/Detail";

const AppInner = styled.div`
  max-width: 990px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

function App() {
  return (
    <AppInner>
      <header className="App-header">
        <h1>Github Explorer</h1>
      </header>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/:owner/:name" element={<Detail />} />
      </Routes>
    </AppInner>
  );
}

export default App;
