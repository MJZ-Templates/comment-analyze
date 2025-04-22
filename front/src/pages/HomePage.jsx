import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import CommentGraph from "../components/CommentGraph";
import SearchBox from "../components/SearchBox";
import useEmotionComment from "../hooks/useEmotionComment";
import useWordFrequency from "../hooks/useWordFrequency";

const HomePage = () => {
  const { comments, fetchComments, filterComment, orderComment } =
    useEmotionComment();
  const { wordFrequency, fetchWordFrequency } = useWordFrequency();

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
        <Comments
          onSearch={fetchComments}
          onOrder={orderComment}
          onFilter={filterComment}
          comments={comments}
        />
        <CommentGraph
          onSearch={fetchWordFrequency}
          wordFrequency={wordFrequency}
        />
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

export default HomePage;
