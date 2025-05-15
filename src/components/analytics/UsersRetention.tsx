import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const UsersRetention = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/campaigns/campaigns/"
        );
        const campaigns = response.data.campaigns;

        // Transform data for chart: calculate % funding achieved
        const chartData = campaigns.map((campaign) => ({
          name: campaign.title,
          fundingPercent: Math.round(
            (campaign.achievedAmount / campaign.fundingGoal) * 100
          ),
          achievedAmount: campaign.achievedAmount,
          fundingGoal: campaign.fundingGoal,
        }));

        setCampaignData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Campaign Funding Progress (%)
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={campaignData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" interval={0} angle={-30} textAnchor="end" height={70} />
            <YAxis stroke="#9CA3AF" domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value, name) =>
                name === "fundingPercent"
                  ? `${value}%`
                  : value.toLocaleString()
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="fundingPercent"
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

export default UsersRetention;
