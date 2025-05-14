import { useState, useEffect } from "react";
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
import axios from "axios";

// Utility function to get the hour range (e.g., "0-4", "4-8")
const getHourRange = (hour: number) => {
  if (hour >= 0 && hour < 4) return "0-4";
  if (hour >= 4 && hour < 8) return "4-8";
  if (hour >= 8 && hour < 12) return "8-12";
  if (hour >= 12 && hour < 16) return "12-16";
  if (hour >= 16 && hour < 20) return "16-20";
  return "20-24";
};

// Process the API data into the desired format
const processUserActivityData = (users: any[]) => {
  const activityData = {
    Mon: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Tue: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Wed: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Thu: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Fri: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Sat: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
    Sun: { "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
  };

  users.forEach((user) => {
    const day = new Date(user.updatedAt).toLocaleString("en-US", { weekday: "short" });
    const hour = new Date(user.updatedAt).getHours();
    const range = getHourRange(hour);

    if (activityData[day]) {
      activityData[day][range]++;
    }
  });

  return Object.keys(activityData).map((day) => ({
    name: day,
    ...activityData[day],
  }));
};

const UserActivityHeatmap = () => {
  const [userActivityData, setUserActivityData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users");
        const data = response.data;
        const processedData = processUserActivityData(data);
        setUserActivityData(processedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">User Activity Heatmap</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={userActivityData}>
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
            <Bar dataKey="0-4" stackId="a" fill="#6366F1" />
            <Bar dataKey="4-8" stackId="a" fill="#8B5CF6" />
            <Bar dataKey="8-12" stackId="a" fill="#EC4899" />
            <Bar dataKey="12-16" stackId="a" fill="#10B981" />
            <Bar dataKey="16-20" stackId="a" fill="#F59E0B" />
            <Bar dataKey="20-24" stackId="a" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserActivityHeatmap;
