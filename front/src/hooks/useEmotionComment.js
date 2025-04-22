import { useState } from "react";
import { emotionMockData } from "../mocks/emotionComment";

const useEmotionComment = () => {
  const [originalComments, setOriginalComments] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    setOriginalComments(emotionMockData);
    setComments(emotionMockData);
  };

  const filterComment = (emotion) => {
    if (emotion === "ALL") {
      setComments(originalComments);
      return;
    }
    setComments(
      originalComments.filter((comment) => comment.emotion === emotion)
    );
  };

  const orderComment = (option) => {
    if (option === "most-like") {
      comments.sort((a, b) => b.likeCount - a.likeCount);
      return;
    }
    comments.sort((a, b) => a.likeCount - b.likeCount);
  };

  return { comments, fetchComments, filterComment, orderComment };
};

export default useEmotionComment;
