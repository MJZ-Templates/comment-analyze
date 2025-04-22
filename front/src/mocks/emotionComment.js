const emotions = ["POSITIVE", "NEGATIVE", "NEUTRAL"];
const comments = [
  "이 영화 진짜 감동적이에요!",
  "스토리가 너무 별로였어요",
  "그냥 그랬음...",
  "완전 실망이에요.",
  "정말 최고였어요!",
  "다시 보고 싶지 않아요.",
  "평범한 영화였어요.",
  "배우들의 연기가 훌륭했어요.",
  "시간 낭비였어요.",
  "음악이 정말 좋았어요.",
];

export const emotionMockData = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  comment: comments[Math.floor(Math.random() * comments.length)],
  emotion: emotions[Math.floor(Math.random() * emotions.length)],
  likeCount: Math.floor(Math.random() * 21),
}));
