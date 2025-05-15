import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";

type Campaign = {
  _id: string;
  title: string;
  fundingGoal: number;
  achievedAmount: number;
  dueDate: string;
  createdAt: string;
  rewards: any[];
  socialLinks: any[];
  investments: any[];
};

type RadarDataItem = {
  subject: string;
  value: number;
  fullMark: number;
};

const scaleTo150 = (value: number, maxValue: number) =>
  Math.min(150, (value / maxValue) * 150);

const CustomerSegmentation = () => {
  const [data, setData] = useState<RadarDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns/campaigns/");
        const json = await res.json();

        if (json.campaigns && json.campaigns.length > 0) {
          const campaign = json.campaigns[0]; // Focus on first campaign or you can choose others

          // Calculate days remaining and campaign age
          const dueDate = new Date(campaign.dueDate);
          const createdAt = new Date(campaign.createdAt);
          const today = new Date();

          const daysRemaining = Math.max(
            0,
            Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
          );
          const campaignAge = Math.max(
            0,
            Math.ceil((today.getTime() - createdAt.getTime()) / (1000 * 3600 * 24))
          );

          // Construct radar data array
          const radarData: RadarDataItem[] = [
            {
              subject: "Funding Progress",
              value: scaleTo150(campaign.achievedAmount, campaign.fundingGoal),
              fullMark: 150,
            },
            {
              subject: "Number of Rewards",
              value: scaleTo150(campaign.rewards.length, 10), // assume max 10 tiers
              fullMark: 150,
            },
            {
              subject: "Social Links",
              value: scaleTo150(campaign.socialLinks.length, 5), // max 5 social links?
              fullMark: 150,
            },
            {
              subject: "Investments",
              value: scaleTo150(campaign.investments.length, 20), // max 20 investments assumed
              fullMark: 150,
            },
            {
              subject: "Days Remaining",
              value: scaleTo150(daysRemaining, 60), // scale 0-60 days max
              fullMark: 150,
            },
            {
              subject: "Campaign Age",
              value: scaleTo150(campaignAge, 60), // scale 0-60 days max
              fullMark: 150,
            },
          ];

          setData(radarData);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400 text-center p-6">
        Loading campaign data...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-gray-400 text-center p-6">
        No campaign data available.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Campaign Radar Metrics
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#9CA3AF" />
            <Radar
              name="Campaign Metrics"
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CustomerSegmentation;
