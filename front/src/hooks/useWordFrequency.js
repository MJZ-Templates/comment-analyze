import { useState } from "react";
import { getFrequency } from "../apis/frequency";

const useWordFrequency = (identifier) => {
  const [wordFrequency, setWordFrequency] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWordFrequency = async (identifier) => {
    try {
      setLoading(true);
      const data = await getFrequency(identifier);

      const frequencyMap = {};
      data?.wordFrequencies.forEach((item) => {
        frequencyMap[item.word] = item.count;
      });

      setWordFrequency(frequencyMap);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("failed to fetch word frequency:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!nextPageToken) return;

    try {
      setLoading(true);
      const data = await getFrequency(identifier, undefined, nextPageToken);

      const newFrequencyMap = { ...wordFrequency };

      data.wordFrequencies.forEach((item) => {
        if (newFrequencyMap[item.word]) {
          newFrequencyMap[item.word] += item.count;
        } else {
          newFrequencyMap[item.word] = item.count;
        }
      });

      setWordFrequency(newFrequencyMap);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("failed to fetch next page word frequency:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    wordFrequency,
    fetchWordFrequency,
    fetchNextPage,
    hasNextPage: !!nextPageToken,
    wordFrequencyLoading: loading,
  };
};

export default useWordFrequency;
