import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#A28FD0",
  "#FFBB28",
  "#FF8042",
];

const ChannelPerformance = () => {
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/campaigns/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns && data.campaigns.length > 0) {
          const totalAchieved = data.campaigns.reduce(
            (sum, campaign) => sum + campaign.achievedAmount,
            0
          );
          // Map to pie chart data with percentages
          const chartData = data.campaigns.map((campaign) => ({
            name: campaign.title,
            value: campaign.achievedAmount,
            // percent will be calculated by recharts tooltip & label, but you can calculate if needed here
            percent: (campaign.achievedAmount / totalAchieved) * 100,
          }));
          setChannelData(chartData);
        }
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Channel Performance (Achieved Amount %)
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={channelData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              isAnimationActive={true}
            >
              {channelData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => new Intl.NumberFormat().format(value)}
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChannelPerformance;
