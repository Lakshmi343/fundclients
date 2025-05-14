// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const salesData = [
//   { month: "Jan", sales: 4000 },
//   { month: "Feb", sales: 3000 },
//   { month: "Mar", sales: 5000 },
//   { month: "Apr", sales: 4500 },
//   { month: "May", sales: 6000 },
//   { month: "Jun", sales: 5500 },
// ];

// const SalesTrendChart = () => {
//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//     >
//       <h2 className="text-xl font-semibold text-gray-100 mb-4">Sales Trend</h2>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <LineChart data={salesData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//             <XAxis dataKey="month" stroke="#9CA3AF" />
//             <YAxis stroke="#9CA3AF" />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(31, 41, 55, 0.8)",
//                 borderColor: "#4B5563",
//               }}
//               itemStyle={{ color: "#E5E7EB" }}
//             />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#8B5CF6"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };
// export default SalesTrendChart;
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

interface Campaign {
  _id: string;
  title: string;
  fundingGoal: number;
  category: string;
}

const SalesTrendChart = () => {
  const [campaignData, setCampaignData] = useState<Campaign[]>([]);
  const [salesData, setSalesData] = useState<{ month: string; sales: number }[]>(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((response) => {
        const data = response.data;
        const formattedData = data.map((campaign: Campaign) => ({
          month: campaign.title, // You can use the campaign's title as the month here
          sales: campaign.fundingGoal, // Set fundingGoal as the sales value
        }));
        setCampaignData(data);
        setSalesData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching campaigns", error);
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Sales Trend</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={salesData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesTrendChart;
