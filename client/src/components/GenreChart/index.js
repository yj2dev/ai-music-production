import React, { useRef, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";
import GenreScoreParsing from "../../utils/GenreScoreParsing";
import { Container } from "./styled";

function GenreChart() {
  const _genreScore = useSelector((state) => state.music.genreScore);
  const genreScore = GenreScoreParsing(_genreScore);
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const genreChartLabel = ["발라드", "댄스", "랩/힙합", "트로트"];

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {genreChartLabel[index]}
      </text>
    );
  };

  return (
    <Container>
      <PieChart width={500} height={300}>
        <Pie
          data={genreScore}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={renderCustomizedLabel}
          labelLine={false}
          fill="#8884d8"
        >
          {genreScore.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </Container>
  );
}

export default GenreChart;
