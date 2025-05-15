import { motion } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";


import Header from "../../components/common/Header";

import ProductsTable from "../../components/products/ProductsTable";
import CategoryDistributionChart from "../../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../../components/products/SalesTrendChart";
import RevenueChart from "../../components/analytics/RevenueChart";
import CampaignStats from "./CampaignStats";

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />
   <CampaignStats/>
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
  

       
        <ProductsTable />
  
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
        <div>
          <RevenueChart/>
        </div>
        
      </main>
    </div>
  );
};

export default ProductsPage;
