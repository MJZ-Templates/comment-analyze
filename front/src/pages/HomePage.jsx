import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import CommentGraph from "../components/CommentGraph";
import SearchBox from "../components/SearchBox";
import useEmotionComment from "../hooks/useEmotionComment";
import useWordFrequency from "../hooks/useWordFrequency";
import { HashLoader } from "react-spinners";

const HomePage = () => {
  const {
    fetchEmotionLoading,
    comments,
    fetchComments,
    filterComment,
    orderComment,
  } = useEmotionComment();
  const { wordFrequencyLoading, wordFrequency, fetchWordFrequency } =
    useWordFrequency();

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  const handleSearch = (url) => {
    fetchComments(url);
    fetchWordFrequency(url);
  };

  return (
    <Page>
      <PageTitle>Comment Analyze</PageTitle>
      <SearchBox
        ref={focusRef}
        onSearch={handleSearch}
        text={"Fetch All!"}
      ></SearchBox>
      <Results>
        <ComponentWrapper>
          {fetchEmotionLoading ? (
            <HashLoader />
          ) : (
            <Comments
              comments={comments}
              onOrder={orderComment}
              onFilter={filterComment}
            />
          )}
        </ComponentWrapper>
        <ComponentWrapper>
          {wordFrequencyLoading ? (
            <HashLoader />
          ) : (
            <CommentGraph wordFrequency={wordFrequency} />
          )}
        </ComponentWrapper>
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

const Results = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const ComponentWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default HomePage;
