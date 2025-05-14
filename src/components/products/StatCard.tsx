import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "react-feather";

// Single Stat Card UI
interface CardProps {
  name: string;
  icon: React.ComponentType;
  value: string | number;
  color: string;
}

const Card = ({ name, icon: Icon, value, color }: CardProps) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-gray-100 border border-gray-700">
    <div className="flex items-center">
      <div
        className="flex justify-center items-center p-2 rounded-full"
        style={{ backgroundColor: color }}
      >
        <Icon size={24} />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  </div>
);

// Main StatCards Component
const StatCard = () => {
  const [totalCampaigns, setTotalCampaigns] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((response) => {
        const campaigns = response.data;
        setTotalCampaigns(campaigns.length);

        const categoryMap: Record<string, number> = {};
        campaigns.forEach((campaign: { category: string }) => {
          categoryMap[campaign.category] = (categoryMap[campaign.category] || 0) + 1;
        });
        setCategoryCounts(categoryMap);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Card name="Total Campaigns" icon={Package} value={totalCampaigns} color="#6366F1" />
      <Card name="Technology" icon={TrendingUp} value={categoryCounts["Technology"] || 0} color="#10B981" />
      <Card name="Medical" icon={AlertTriangle} value={categoryCounts["Medical"] || 0} color="#F59E0B" />
      <Card name="Nonprofit" icon={DollarSign} value={categoryCounts["Nonprofit"] || 0} color="#EF4444" />
    </motion.div>
  );
};

export default StatCard;
