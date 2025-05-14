import { motion } from "framer-motion";
import { Trash2, Search, Facebook, Twitter, Instagram } from "lucide-react";  // Importing more icons
import { useState, useEffect } from "react";
import axios from "axios";

interface Reward {
  tier: string;
  amount: number;
  description: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
  image: string;
  rewards: Reward[];
  socialLinks: SocialLink[];
  creator: { _id: string; name: string; email: string };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Fetch campaigns data from API
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((response) => {
        setCampaigns(response.data);
        setFilteredCampaigns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching campaigns", error);
      });
  }, []);

  const handleSearchFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(term) ||
        campaign.category.toLowerCase().includes(term)
    );
    setFilteredCampaigns(filtered);
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/campaigns/${id}`)
      .then(() => {
        // Remove deleted campaign from the state
        setFilteredCampaigns(filteredCampaigns.filter((campaign) => campaign._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting campaign", error);
      });
  };

  // Social Media Icons Mapping
  const socialIcons = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 background-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Campaign List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Campaigns..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchFunction}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Funding Goal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {filteredCampaigns.map((campaign) => (
              <motion.tr
                key={campaign._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <img
                    src={campaign.image}
                    alt="Campaign img"
                    className="size-10 rounded-full"
                  />
                  {campaign.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {campaign.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${campaign.fundingGoal.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {campaign.creator.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {campaign.socialLinks.map((link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 mr-2"
                      key={link._id}
                    >
                      {socialIcons(link.platform)}
                    </a>
                  ))}
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
