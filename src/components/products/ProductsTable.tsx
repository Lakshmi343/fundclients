import { motion } from "framer-motion";
import { Trash2, Search, Facebook, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Reward {
  tier: string;
  amount: number;
  description: string;
  _id: string;
}

interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

interface CreatorProfile {
  picture: string;
}

interface Creator {
  _id: string;
  name: string;
  profile?: CreatorProfile;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  achievedAmount: number;
  dueDate: string;
  country: string;
  category: string;
  image: string;
  rewards: Reward[];
  socialLinks: SocialLink[];
  creator: Creator | string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/campaigns/campaigns")
      .then((response) => {
        const campaignsArray: Campaign[] = Array.isArray(response.data)
          ? response.data
          : response.data.campaigns || [];

        setCampaigns(campaignsArray);
        setFilteredCampaigns(campaignsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns", error);
        setLoading(false);
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
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      axios
        .delete(`http://localhost:5000/api/campaigns/campaigns/${id}`)
        .then(() => {
          const updatedCampaigns = filteredCampaigns.filter((c) => c._id !== id);
          setFilteredCampaigns(updatedCampaigns);
          setCampaigns((prev) => prev.filter((c) => c._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting campaign", error);
        });
    }
  };

  const socialIcons = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={18} className="text-blue-600" />;
      case "twitter":
        return <Twitter size={18} className="text-blue-400" />;
      case "instagram":
        return <Instagram size={18} className="text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <motion.div
        className="max-w-7xl mx-auto bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">Campaign List</h2>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search Campaigns..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchFunction}
              aria-label="Search Campaigns"
              autoComplete="off"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-6">Loading campaigns...</div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-gray-400 text-center py-6">No campaigns found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Funding Goal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Achieved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Creator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Social Links</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {filteredCampaigns.map((campaign) => {
                  // Handle creator as string or object
                  const creatorName =
                    typeof campaign.creator === "string"
                      ? "Unknown Creator"
                      : campaign.creator?.name || "Unknown";

                  const creatorPic =
                    typeof campaign.creator === "string"
                      ? null
                      : campaign.creator?.profile?.picture || null;

                  return (
                    <motion.tr
                      key={campaign._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex items-center gap-3">
                        {campaign.image && (
                          <img
                            src={`http://localhost:5000${campaign.image}`}
                            alt={`${campaign.title} Image`}
                            className="w-10 h-10 rounded-full object-cover border border-gray-600"
                          />
                        )}
                        {campaign.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{campaign.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${campaign.fundingGoal.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${campaign.achievedAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(campaign.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center gap-2">
                        {creatorPic && (
                          <img
                            src={`http://localhost:5000${creatorPic}`}
                            alt={`${creatorName} Profile`}
                            className="w-8 h-8 rounded-full object-cover border border-gray-600"
                          />
                        )}
                        {creatorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center gap-3">
                        {campaign.socialLinks.map((link) => (
                          <a
                            key={link._id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                            aria-label={`Visit ${link.platform} page`}
                          >
                            {socialIcons(link.platform)}
                          </a>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center gap-2">
                        <button
                          className="text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => handleDelete(campaign._id)}
                          aria-label={`Delete Campaign ${campaign.title}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsTable;
