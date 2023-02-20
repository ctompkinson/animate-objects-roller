import React from 'react';
import './App.css';
import Roller from "./Components/Roller";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`

function App() {
  return (
    <Wrapper>
      <h3>Animate Object Roller</h3>
      <Roller />
    </Wrapper>
  );
}

export default App;