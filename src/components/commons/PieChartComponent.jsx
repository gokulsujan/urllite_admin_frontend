import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from "recharts";

const generateColors = (count) => {
  const colors = [];
  const saturation = 70;
  const lightness = 50;
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

const PieChartComponent = ({
  data,
  labelKey = "label",
  valueKey = "value",
  title = "Pie Chart",
  showDataInside = false,
  dataFormatter
}) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-4">No data available</div>;
  }

  const colors = generateColors(data.length);
  const total = data.reduce((sum, entry) => sum + entry[valueKey], 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    if (!showDataInside) {
      return null;
    }
    const radius = (innerRadius + outerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    const value = data[index][valueKey];
    const location = data[index]?.location;
    const formattedValue = dataFormatter ? dataFormatter(value) : value;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {formattedValue}
        {location !== undefined && (
          <>
            <tspan x={x} y={y + 14}>{location}</tspan>
          </>
        )}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: "400px", marginTop: "2rem" }}>
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={labelKey}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={showDataInside ? renderCustomizedLabel : ({ name }) => name}
            labelLine={!showDataInside}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
