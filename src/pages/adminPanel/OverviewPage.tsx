import { motion } from "framer-motion";
import { BarChart, ShoppingBag, Users, Zap } from "lucide-react";

import SalesOverviewChart from "../../components/overview/SalesOverviewChart";
import SalesChannelChart from "../../components/overview/SalesChannelChart";
import CategoryDistributionChart from "../../components/overview/CategoryDistributionChart";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import Stats from "../../components/users/Stats";
import FundingProgressChart from "../../components/overview/FundingProgressChart";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      
   <Stats/>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FundingProgressChart/>
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
