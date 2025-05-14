import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// Define types for the project data
interface Project {
  title: string;
  currentFunding: number;
  fundingGoal: number;
  progress: number;
}

const FundingProgressChart: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch the project data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/projects/");
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    };
    fetchProjects();
  }, []);

  // Prepare the data for the chart
  const chartData = projects.map((project) => ({
    name: project.title,
    currentFunding: project.currentFunding,
    fundingGoal: project.fundingGoal,
    progress: ((project.currentFunding / project.fundingGoal) * 100).toFixed(2),
  }));

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Funding Progress Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#485563" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FundingProgressChart;
