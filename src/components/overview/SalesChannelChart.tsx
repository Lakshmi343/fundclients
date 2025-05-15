import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

interface Reward {
  tier: string;
  amount: number;
  description: string;
  _id: string;
}

interface Campaign {
  _id: string;
  rewards: Reward[];
}

const SalesChannelChart = () => {
  const [tierData, setTierData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns/campaigns")
      .then((response) => {
        const campaigns: Campaign[] = response.data.campaigns;

        // Count rewards by tier
        const tierCounts: Record<string, number> = {};

        campaigns.forEach((campaign) => {
          campaign.rewards.forEach((reward) => {
            tierCounts[reward.tier] = (tierCounts[reward.tier] || 0) + 1;
          });
        });

        // Convert to array for chart data
        const formattedTierData = Object.entries(tierCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setTierData(formattedTierData);
      })
      .catch((error) => {
        console.error("Error fetching campaigns", error);
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-lg font-medium text-gray-100">Rewards Tier Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={tierData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#685563" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,.8)",
                borderColor: "#685563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey={"value"} fill="#8884d8">
              {tierData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
