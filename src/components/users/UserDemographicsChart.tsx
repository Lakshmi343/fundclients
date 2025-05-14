import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const UserDemographicsChart = () => {
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("http://localhost:5000/api/auth/users")
      .then((response) => {
        setUserData(response.data);
        processRoleData(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const processRoleData = (data) => {
    // Count the number of users for each role
    const roleCounts = {
      user: 0,
      admin: 0,
      investor: 0,
      organizer: 0,
    };

    data.forEach((user) => {
      if (user.role === "user") roleCounts.user++;
      if (user.role === "admin") roleCounts.admin++;
      if (user.role === "investor") roleCounts.investor++;
      if (user.requestRole === "organizer") roleCounts.organizer++;
    });

    // Convert the role counts to an array for the pie chart
    setRoleData([
      { name: "User", value: roleCounts.user },
      { name: "Admin", value: roleCounts.admin },
      { name: "Investor", value: roleCounts.investor },
      { name: "Organizer", value: roleCounts.organizer },
    ]);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">User Roles</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserDemographicsChart;
