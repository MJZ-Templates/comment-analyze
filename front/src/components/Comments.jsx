import React from "react";
import styled from "styled-components";
import { getEmojiByEmotion } from "../utils/emotionToEmoji";
import Button from "./Button";
import SearchBox from "./SearchBox";
import { AiOutlineLike } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { FaSortAmountDown } from "react-icons/fa";
import useDropdown from "../hooks/useDropdown";

const sortOptions = ["most-like", "less-like"];

const Comments = ({ comments, onSearch, onOrder, onFilter }) => {
  const { open, selected, toggleOpen, handleSelect, dropdownRef } = useDropdown(
    {
      onSelect: onOrder,
    }
  );

  return (
    <Container>
      <h1>Emotion Analysis</h1>
      <SearchContainer>
        <SearchBox
          onSearch={onSearch}
          text={"Fetch Emotion Analysis"}
        ></SearchBox>
      </SearchContainer>
      {comments.length > 0 && (
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
      {comments.length > 0 && (
        <DropdownWrapper ref={dropdownRef}>
          <OrderButton onClick={toggleOpen}>
            <FaSortAmountDown />
            &nbsp; &nbsp;
            {selected}
          </OrderButton>
          {open && (
            <Dropdown>
              {sortOptions.map((option) => (
                <DropdownItem key={option} onClick={() => handleSelect(option)}>
                  {option}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </DropdownWrapper>
      )}

      <CommentList>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} emotion={comment.emotion}>
              <CommentText>{comment.comment}</CommentText>
              <CommentInfo>
                <CommentLikeCount>
                  {comment.likeCount}
                  <AiOutlineLike
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                    }}
                  />
                </CommentLikeCount>
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
  margin-bottom: 4px;
  gap: 8px;
`;

const OrderButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  position: relative;
  align-self: flex-end;
  margin-bottom: 16px;
  width: auto;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: white;
  color: black;
  border-radius: 4px;
  width: 160px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid #ccc;

  &:hover {
    background-color: #555;
  }

  &:last-child {
    border-bottom: none;
  }
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
  display: flex;
  padding-right: 12px;
  gap: 4px;
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
