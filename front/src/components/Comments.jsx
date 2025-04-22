import React from "react";
import styled from "styled-components";
import { getEmojiByEmotion } from "../utils/emotionToEmoji";
import Button from "./Button";
import SearchBox from "./SearchBox";

const Comments = ({ comments, onSearch, onFilter }) => {
  return (
    <Container>
      <h1>Emotion Analysis</h1>
      <SearchContainer>
        <SearchBox
          onSearch={onSearch}
          text={"Fetch Emotion Analysis"}
        ></SearchBox>
      </SearchContainer>
      {comments && (
        <Buttons>
          <ALLButton onClick={() => onFilter("ALL")}>ALL</ALLButton>
          <FilterButton emotion="POSITIVE" onClick={() => onFilter("POSITIVE")}>
            POSITIVE
          </FilterButton>
          <FilterButton emotion="NEGATIVE" onClick={() => onFilter("NEGATIVE")}>
            NEGATIVE
          </FilterButton>
          <FilterButton emotion="NEUTRAL" onClick={() => onFilter("NEUTRAL")}>
            NEUTRAL
          </FilterButton>
        </Buttons>
      )}
      <CommentList>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} emotion={comment.emotion}>
              <CommentText>{comment.comment}</CommentText>
              <CommentInfo>
                <CommentLikeCount>{comment.likeCount} Likes</CommentLikeCount>
                <CommentEmotion>
                  {getEmojiByEmotion(comment.emotion)}
                </CommentEmotion>
              </CommentInfo>
            </Comment>
          ))}
      </CommentList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 8px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ emotion }) =>
    emotion === "POSITIVE"
      ? "#007bff"
      : emotion === "NEGATIVE"
      ? "#ee5858"
      : "#adb5bd"};
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const CommentText = styled.p`
  font-size: 16px;
  color: white;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommentLikeCount = styled.span`
  font-size: 14px;
  color: #fff;
  display: block;
  padding-right: 12px;
`;

const CommentEmotion = styled.span`
  font-size: 24px;
  color: #666;
  display: block;
  padding-right: 12px;
`;

const FilterButton = styled(Button)`
  flex: 1;
  background-color: ${({ emotion }) =>
    emotion === "POSITIVE"
      ? "#007bff"
      : emotion === "NEGATIVE"
      ? "#ee5858"
      : "#adb5bd"};
`;

const ALLButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid #ccc;
`;

export default Comments;
