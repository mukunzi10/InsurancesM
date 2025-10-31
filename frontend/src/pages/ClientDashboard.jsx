// src/pages/ClientDashboard.jsx
import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function ClientDashboard() {
  const BASE_URL = "http://localhost:5000"; // Backend URL
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authenticated user data and policies
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Fetch user data
        const userResponse = await axios.get(`${BASE_URL}/api/auth/me`, config);
        setUser(userResponse.data);

        // Fetch policies
        const policiesResponse = await axios.get(`${BASE_URL}/api/policies/my-policies`, config);
        setPolicies(policiesResponse.data.policies || []);

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        
        // Check if it's an auth error
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate, BASE_URL]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Rest of your component...

  const menuItems = [
    { id: "policies", label: "Policies", icon: FileText, path: "/clientDashboard" },
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

    const getUserInitials = () => {
    if (!user) return "U";
    const names = user.firstName && user.lastName ? [user.firstName, user.lastName] : [];
    if (names.length >= 2) return `${names[0][0]}${names[1][0]}`.toUpperCase();
    return user.firstName?.[0]?.toUpperCase() || "U";
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-700 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );

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

        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
              {getUserInitials()}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
              <div className="text-sm text-blue-300">{user?.phone}</div>  
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-blue-700 flex justify-around">
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
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

        <div className="flex-1 overflow-y-auto p-8">
          {policies.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No Policies Found</h3>
              <p className="text-gray-500 mt-2">You don't have any active policies yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <div
                  key={policy._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{policy.policyNumber}</h3>
                        <p className="text-gray-700 font-semibold mt-1">{policy.name}</p>
                      </div>
                      <span className={`text-xs font-semibold ${policy.statusColor || 'text-blue-600'} uppercase`}>
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
                        <p className="text-base font-semibold text-gray-900">{policy.effectiveDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Pending Dues</p>
                        <p className="text-base font-semibold text-gray-900">{policy.pendingDues}</p>
                      </div>
                    </div>

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
                      <button className="flex-1 bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800">
                        <Link to="/claims">Notify Claim</Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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

            {modalType === "statement" && selectedPolicy && (
              <div>
                <p className="text-gray-700 mb-2">
                  Policy Number: <strong>{selectedPolicy.policyNumber}</strong>
                </p>
                <p className="text-gray-700">
                  Total Paid: <strong>{selectedPolicy.totalPaid}</strong>
                </p>
                <p className="text-gray-600 mt-4">
                  This is a summary statement of payments and coverage details.
                </p>
              </div>
            )}

            {modalType === "contract" && selectedPolicy && (
              <div>
                <p className="text-gray-700 mb-2">
                  Policy Number: <strong>{selectedPolicy.policyNumber}</strong>
                </p>
                <p className="text-gray-600 mt-4">
                  Contract preview and download will be available here.
                </p>
                <button className="mt-4 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
                  Download Contract
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
