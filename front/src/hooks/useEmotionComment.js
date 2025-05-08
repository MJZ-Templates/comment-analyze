import { useState } from "react";
import { getEmotions } from "../apis/emotion";

const useEmotionComment = (identifier) => {
  const [originalComments, setOriginalComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (identifier) => {
    try {
      setLoading(true);
      const data = await getEmotions(identifier);

      setOriginalComments(data.comments);
      setComments(data.comments);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("failed to fetch next page comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!nextPageToken) return;

    try {
      setLoading(true);
      const data = await getEmotions(identifier, undefined, nextPageToken);
      const newComments = [...originalComments, ...data.comments];

      setOriginalComments(newComments);
      setComments(newComments);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("failed to fetch next page comments:", error);
    } finally {
      setLoading(false);
    }
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
    const sorted = [...comments].sort((a, b) => {
      if (option === "most-like") {
        return b.likeCount - a.likeCount;
      }
      return a.likeCount - b.likeCount;
    });
    setComments(sorted);
  };

  return {
    comments,
    fetchComments,
    fetchNextPage,
    filterComment,
    orderComment,
    hasNextPage: !!nextPageToken,
    fetchEmotionLoading: loading,
  };
};

export default useEmotionComment;
