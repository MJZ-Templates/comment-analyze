import { useState } from "react";
import { diverseWordFrequencies } from "../mocks/wordFrequency";

const useWordFrequency = () => {
  const [wordFrequency, setWordFrequency] = useState({});

  const fetchWordFrequency = async () => {
    const frequency = {};
    diverseWordFrequencies.forEach((item) => {
      frequency[item.word] = item.count;
    });

    setWordFrequency(frequency);
  };

  return { wordFrequency, fetchWordFrequency };
};

export default useWordFrequency;
