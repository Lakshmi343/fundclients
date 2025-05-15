import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import axios from "axios";

type Insight = {
  icon: LucideIcon;
  color: string;
  insight: string;
};

const AIPoweredInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/campaigns/campaigns/");
        const campaigns = response.data.campaigns;

        if (!campaigns || campaigns.length === 0) return;

        const totalCampaigns = campaigns.length;
        const topCampaign = campaigns.reduce((prev, current) => {
          const prevTotal = prev.investments.reduce((sum, i) => sum + i.amount, 0);
          const currTotal = current.investments.reduce((sum, i) => sum + i.amount, 0);
          return currTotal > prevTotal ? current : prev;
        });

        const topCampaignInvested = topCampaign.investments.reduce((sum, i) => sum + i.amount, 0);
        const topCampaignPercent = ((topCampaignInvested / topCampaign.fundingGoal) * 100).toFixed(2);
        const uniqueInvestors = new Set(topCampaign.investments.map(i => i.investor)).size;

        const generatedInsights: Insight[] = [
          {
            icon: TrendingUp,
            color: "text-green-500",
            insight: `Top campaign "${topCampaign.title}" has raised ₹${topCampaignInvested.toLocaleString()} — ${topCampaignPercent}% of its funding goal.`,
          },
          {
            icon: Users,
            color: "text-blue-500",
            insight: `"${topCampaign.title}" has attracted ${uniqueInvestors} unique investor(s), indicating strong community interest.`,
          },
          {
            icon: ShoppingBag,
            color: "text-purple-500",
            insight: `Category "${topCampaign.category}" is trending — it could be a high-interest domain for future campaigns.`,
          },
          {
            icon: DollarSign,
            color: "text-yellow-500",
            insight: `${totalCampaigns} campaign(s) are currently live, showing an increase in platform activity.`,
          },
        ];

        setInsights(generatedInsights);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        AI-Powered Insights
      </h2>
      <div className="space-y-4">
        {insights.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <p className="text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIPoweredInsights;
