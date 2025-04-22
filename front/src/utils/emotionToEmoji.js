const emotionToEmoji = {
  POSITIVE: "😊",
  NEGATIVE: "☹️",
  NEUTRAL: "😐",
};

export const getEmojiByEmotion = (emotion) => emotionToEmoji[emotion] || "❓";
