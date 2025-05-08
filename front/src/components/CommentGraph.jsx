import React from "react";
import styled from "styled-components";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SearchBox from "./SearchBox";

const pastelColors = [
  "#A8DADC",
  "#F6BD60",
  "#FFADAD",
  "#B5EAD7",
  "#CBAACB",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#BDB2FF",
];

const CommentGraph = ({ wordFrequency }) => {
  const data = Object.entries(wordFrequency)
    .map(([word, count]) => ({ word, count }))
    .filter(({ count }) => count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const hasData = data.length > 0;

  return (
    <Container>
      <h1>Word Frequency</h1>
      <BarContainer>
        {hasData && (
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis
                dataKey="word"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pastelColors[index % pastelColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </BarContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  flex: 1;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 500px;
`;

export default CommentGraph;
