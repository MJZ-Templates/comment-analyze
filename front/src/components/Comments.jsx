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
          <Button
            onClick={() => onFilter("ALL")}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
            }}
          >
            ALL
          </Button>
          <Button
            onClick={() => onFilter("POSITIVE")}
            style={{ flex: 1, backgroundColor: "#007bff" }}
          >
            POSITIVE
          </Button>
          <Button
            onClick={() => onFilter("NEGATIVE")}
            style={{ flex: 1, backgroundColor: "#ee5858" }}
          >
            NEGATIVE
          </Button>
          <Button
            onClick={() => onFilter("NEUTRAL")}
            style={{ flex: 1, backgroundColor: "#adb5bd" }}
          >
            NEUTRAL
          </Button>
        </Buttons>
      )}
      <CommentList>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} emotion={comment.emotion}>
              <CommentText>{comment.comment}</CommentText>
              <CommentEmotion>
                {getEmojiByEmotion(comment.emotion)}
              </CommentEmotion>
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

const CommentEmotion = styled.span`
  font-size: 24px;
  color: #666;
  display: block;
  padding-right: 12px;
`;

export default Comments;
