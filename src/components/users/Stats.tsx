import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { UsersIcon, UserPlus, UserCheck, UserX } from "lucide-react"; // Assuming you are using Lucide icons for your stats

interface UserStats {
  totalUsers: number;
  newUsersToday: number;
  activeUsers: number;
  churnRate: number;
  organizersCount: number; // Track the number of organizers
  investorsCount: number;  // Track the number of investors
}

interface StatCardProps {
  name: string;
  icon: JSX.Element;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ name, icon, value, color }) => (
  <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between text-white">
    <div>
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
    <div
      className="rounded-full p-3"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
  </div>
);

const Stats: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    newUsersToday: 0,
    activeUsers: 0,
    churnRate: 0,
    organizersCount: 0,
    investorsCount: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      const users = res.data;

      // Count users by role
      const totalUsers = users.length;
      const organizersCount = users.filter(user => user.requestRole === 'organizer').length;
      const investorsCount = users.filter(user => user.role === 'investor').length;

      // Simulating additional stats
      const newUsersToday = 50; // Example static value
      const activeUsers = totalUsers - 10; // Example: Subtract 10 from total as inactive
      const churnRate = 5; // Example static value for churn rate

      setUserStats({
        totalUsers,
        newUsersToday,
        activeUsers,
        churnRate,
        organizersCount,
        investorsCount,
      });
    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <StatCard
        name="Total Users"
        icon={<UsersIcon size={24} />}
        value={userStats.totalUsers.toLocaleString()} // Will only call toLocaleString if totalUsers is a valid number
        color="#6366F1"
      />
     
     
      
      <StatCard
        name="Organizers"
        icon={<UsersIcon size={24} />} // Assuming you want the same icon
        value={userStats.organizersCount}
        color="#6366F1"
      />
      <StatCard
        name="Investors"
        icon={<UsersIcon size={24} />} // Assuming you want the same icon
        value={userStats.investorsCount}
        color="#10B981"
      />
    </motion.div>
  );
};

export default Stats;
