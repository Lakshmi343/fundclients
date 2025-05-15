import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Investment {
  amount: number;
}

interface Campaign {
  title: string;
  fundingGoal: number;
  investments: Investment[];
}

const FundingProgressChart: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns/campaigns");
        const data = await response.json();
        if (data && data.campaigns) {
          setCampaigns(data.campaigns);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const labels = campaigns.map(c => c.title);
  const fundingGoalData = campaigns.map(c => c.fundingGoal);
  const currentFundingData = campaigns.map(c =>
    c.investments.reduce((sum, inv) => sum + inv.amount, 0)
  );
  const progressData = campaigns.map((c, i) => {
    const achieved = currentFundingData[i];
    return parseFloat(((achieved / c.fundingGoal) * 100).toFixed(2));
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Funding Goal",
        data: fundingGoalData,
        borderColor: "#FBBF24",
        backgroundColor: "#FBBF24",
      },
      {
        label: "Current Funding (Investments)",
        data: currentFundingData,
        borderColor: "#10B981",
        backgroundColor: "#10B981",
      },
      {
        label: "Progress (%)",
        data: progressData,
        borderColor: "#6366F1",
        backgroundColor: "#6366F1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#E5E7EB",
        },
      },
      tooltip: {
        backgroundColor: "rgba(31,41,55,0.8)",
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#485563" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#485563" },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-medium mb-4 text-white">Campaign Funding Progress (Investments)</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default FundingProgressChart;
