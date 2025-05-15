import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SalesTrendChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/campaigns/campaigns/")
      .then((res) => res.json())
      .then((json) => {
        // Extract campaigns array
        const campaigns = json.campaigns || [];

        // Transform campaigns to chart data: 
        // Here, x-axis = campaign title, y-axis = funding achieved %
        const chartData = campaigns.map((c) => ({
          title: c.title,
          achievedPercent: c.fundingGoal
            ? Math.round((c.achievedAmount / c.fundingGoal) * 100)
            : 0,
        }));

        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-300 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-6 text-gray-300 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        No campaign data available
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Campaign Funding Achievement (%)
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="title"
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              interval={0} // show all labels
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#9CA3AF" domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="achievedPercent"
              stroke="#8B5CF6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesTrendChart;
