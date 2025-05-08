const emotions = ["POSITIVE", "NEGATIVE", "NEUTRAL"];
const comments = [
  "This movie is really touching!",
  "The storyline was terrible.",
  "It was just okay...",
  "Totally disappointing.",
  "It was absolutely amazing!",
  "I don't want to watch it again.",
  "It was an average movie.",
  "The actors' performances were excellent.",
  "It was a waste of time.",
  "The music was really good.",
];

export const emotionMockData = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  comment: comments[Math.floor(Math.random() * comments.length)],
  emotion: emotions[Math.floor(Math.random() * emotions.length)],
  likeCount: Math.floor(Math.random() * 21),
}));
