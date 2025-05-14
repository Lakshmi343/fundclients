import { useEffect, useState } from "react";
import { Search, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const RoleRequestTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleRequests, setRoleRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/role/requests");
      setRoleRequests(res.data);
      setFilteredRequests(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearchFunction = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = roleRequests.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.requestRole?.toLowerCase().includes(term)
    );
    setFilteredRequests(filtered);
  };

  const handleRoleAction = async () => {
    if (!selectedUser || !actionType) return;
    try {
      await axios.put(`http://localhost:5000/api/auth/role/approve/${selectedUser._id}`, {
        action: actionType,
      });
      fetchRequests();
      closeModal();
    } catch (err) {
      console.error(`${actionType} error:`, err);
    }
  };

  const openModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActionType("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <motion.div
        className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Role Requests</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none"
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
                {["Name", "Email", "Current Role", "Requested Role", "Approval"].map((title) => (
                  <th key={title} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((user) => (
                  <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-purple-800 text-purple-100">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-800 text-yellow-100">
                        {user.requestRole || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isApproved ? (
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-800 text-green-100">
                          Approved
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(user, "approve")}
                            className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-full"
                          >
                            Approve / Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No role requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-6 w-[90%] max-w-md border border-gray-600"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {actionType === "approve" ? "Approve Role" : "Reject Request"}
                </h3>
                <button onClick={closeModal}>
                  <XCircle className="text-red-500 hover:text-red-400" size={24} />
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                Are you sure you want to <strong>{actionType}</strong> the role request for{" "}
                <span className="text-white">{selectedUser.name}</span>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleRoleAction}
                  className={`px-4 py-2 rounded text-white text-sm ${
                    actionType === "approve" ? "bg-green-600" : "bg-red-600"
                  } hover:opacity-90`}
                >
                  Yes, {actionType}
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded text-sm bg-gray-600 text-white hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleRequestTable;
