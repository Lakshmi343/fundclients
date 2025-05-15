import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

const ProductPerformance = () => {
  const [productPerformanceData, setProductPerformanceData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:5000/api/campaigns/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns) {
          // Transform API data into chart data format
          const chartData = data.campaigns.map((campaign) => ({
            name: campaign.title,
            sales: campaign.achievedAmount,
            revenue: campaign.fundingGoal,
            profit: campaign.achievedAmount - campaign.fundingGoal,
          }));
          setProductPerformanceData(chartData);
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
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Product Performance
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={productPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#8B5CF6" name="Achieved Amount" />
            <Bar dataKey="revenue" fill="#10B981" name="Funding Goal" />
            <Bar dataKey="profit" fill="#F59E0B" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformance;
