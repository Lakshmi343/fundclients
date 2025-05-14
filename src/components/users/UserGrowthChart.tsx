import { useState, useEffect } from "react";
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
import axios from "axios";

// Utility function to get the month from a date
const getMonth = (date: string) => new Date(date).toLocaleString('default', { month: 'short' });

const UserGrowthChart = () => {
  const [userGrowthData, setUserGrowthData] = useState<{ month: string; users: number }[]>([]);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      const users = response.data;

      // Process the users data to get the month-wise count
      const monthWiseCount: { [key: string]: number } = {};

      users.forEach((user: { createdAt: string }) => {
        const month = getMonth(user.createdAt);
        if (monthWiseCount[month]) {
          monthWiseCount[month] += 1;
        } else {
          monthWiseCount[month] = 1;
        }
      });

      // Convert the month-wise data into an array for the chart
      const formattedData = Object.entries(monthWiseCount).map(([month, users]) => ({
        month,
        users,
      }));

      setUserGrowthData(formattedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">User Growth</h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserGrowthChart;
