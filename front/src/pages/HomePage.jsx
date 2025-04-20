import React from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import CommentGraph from "../components/CommentGraph";

const HomePage = () => {
  return (
    <Page>
      <PageTitle>Youtube Comment Analyze</PageTitle>
      <UrlComponents>
        <UrlInput type="text" placeholder="Put the url" />
        <UrlButton>Search!</UrlButton>
      </UrlComponents>
      <Results>
        <Comments></Comments>
        <CommentGraph></CommentGraph>
      </Results>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const PageTitle = styled.h1``;

const UrlComponents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
`;

const UrlInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UrlButton = styled.button`
  padding: 10px 20px;
  width: 100px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Results = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export default HomePage;
