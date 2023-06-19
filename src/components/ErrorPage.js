import React from "react";
import styled from "styled-components";

function ErrorPage() {
  return (
    <Error>
      <h1>Sorry! The page that you are trying to visit does not exist.</h1>
    </Error>
  );
}

const Error = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 4cqw;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
`;

export default ErrorPage;
