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

  return { comments, fetchComments, filterComment };
};

export default useEmotionComment;
