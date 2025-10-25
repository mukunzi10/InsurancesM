import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Briefcase,
  MessageSquare,
  ThumbsUp,
  Bell,
  Settings,
  LogOut,
  XCircle,
} from "lucide-react";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Sample policies
  const policies = [
    {
      id: "E390073",
      name: "FUNERAL PLAN",
      status: "ISSUED - INFORCE",
      statusColor: "text-blue-600",
      premium: "3,000 RWF",
      totalPaid: "84,000 RWF",
      effectiveDate: "Jun 21, 2023",
      pendingDues: "0 RWF",
    },
    {
      id: "S390074",
      name: "SAFE FAMILY",
      status: "LAPSE POLICY",
      statusColor: "text-orange-600",
      premium: "4,809 RWF",
      totalPaid: "28,854 RWF",
      effectiveDate: "Jun 21, 2023",
      pendingDues: "0 RWF",
    },
    {
      id: "P390075",
      name: "TEGANYA",
      status: "DORMANT POLICY",
      statusColor: "text-red-600",
      premium: "7,691 RWF",
      totalPaid: "200,146 RWF",
      effectiveDate: "Jun 21, 2023",
      pendingDues: "0 RWF",
    },
  ];

  const menuItems = [
    { id: "policies", label: "Policies", icon: FileText, path: "/dashboard" },
    { id: "services", label: "Services", icon: Briefcase, path: "/services" },
    { id: "complaints", label: "Complaints", icon: MessageSquare, path: "/complaints" },
    { id: "feedback", label: "Feedback", icon: ThumbsUp, path: "/feedback" },
  ];

  const openModal = (type, policy) => {
    setModalType(type);
    setSelectedPolicy(policy);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedPolicy(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">Sanlam | Allianz</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition-all ${
                  isActive
                    ? "bg-white text-blue-900 border-l-4 border-blue-600"
                    : "text-white hover:bg-blue-700"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
              GK
            </div>
            <div className="flex-1">
              <div className="font-semibold">GUSTAVE KAREKEZI</div>
              <div className="text-sm text-blue-300">0786979551</div>
            </div>
          </div>
        </div>

        {/* Footer Icons */}
        <div className="p-4 border-t border-blue-700 flex justify-around">
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
            <p className="text-gray-600 mt-1">List of all policies and their summary</p>
          </div>
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Policies */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{policy.id}</h3>
                      <p className="text-gray-700 font-semibold mt-1">{policy.name}</p>
                    </div>
                    <span className={`text-xs font-semibold ${policy.statusColor} uppercase`}>
                      {policy.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Premium</p>
                      <p className="text-lg font-bold text-gray-900">{policy.premium}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Paid</p>
                      <p className="text-lg font-bold text-gray-900">{policy.totalPaid}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Effective Date</p>
                      <p className="text-base font-semibold text-gray-900">
                        {policy.effectiveDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Pending Dues</p>
                      <p className="text-base font-semibold text-gray-900">{policy.pendingDues}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => openModal("statement", policy)}
                      className="flex-1 bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800"
                    >
                      Statement
                    </button>
                    <button
                      onClick={() => openModal("contract", policy)}
                      className="flex-1 bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800"
                    >
                      Contract
                    </button>
                    <button
                      // onClick={() => openModal("claim", policy)}

                      className="flex-1 bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800"
                    >
                      <Link to="/claims">Notify Claim</Link>
                      {/* Notify Claim */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 hover:scale-110 flex items-center justify-center">
        <MessageSquare size={24} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              {modalType === "statement"
                ? "Policy Statement"
                : modalType === "contract"
                ? "Policy Contract"
                : "Notify Claim"}
            </h2>

            {/* Dynamic Modal Content */}
            {modalType === "statement" && (
              <div>
                <p className="text-gray-700 mb-2">
                  Policy ID: <strong>{selectedPolicy.id}</strong>
                </p>
                <p className="text-gray-700">
                  Total Paid: <strong>{selectedPolicy.totalPaid}</strong>
                </p>
                <p className="text-gray-600 mt-4">
                  This is a summary statement of payments and coverage details.
                </p>
              </div>
            )}

           {modalType === "contract" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl h-[90vh] flex flex-col relative">
      {/* Modal Header */}
      <div className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-xl font-semibold">Policy Contract</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.open(`/contracts/${selectedPolicy.id}.pdf`, "_blank")}
            className="bg-white text-blue-800 px-4 py-1.5 rounded hover:bg-blue-50 font-semibold"
          >
            Download Contract
          </button>
          <button onClick={closeModal} className="text-white hover:text-red-400">
            <XCircle size={24} />
          </button>
        </div>
      </div>

      {/* PDF Preview Section */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center p-4">
        <iframe
          src={`/contracts/${selectedPolicy.id}.pdf`} // 🔹 Change to your actual PDF path or backend route
          title="Policy Contract"
          className="w-full h-full border rounded"
        ></iframe>
      </div>
    </div>
  </div>
)}

            {modalType === "claim" && (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Claim Reason</label>
                  <textarea
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600"
                    placeholder="Describe your claim..."
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
                  >
                    Submit Claim
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
