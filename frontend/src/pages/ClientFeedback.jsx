import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Send,
  FileText,
  Briefcase,
  ThumbsUp,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ClientFeedback() {
  const navigate = useNavigate();
  const location = useLocation();

  // Feedback Data
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      category: "Claims Service",
      rating: 5,
      message: "Great experience! My claim was processed very quickly.",
      date: "2025-10-15",
    },
    {
      id: 2,
      category: "Customer Support",
      rating: 4,
      message: "Helpful team, but response took slightly longer than expected.",
      date: "2025-10-12",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.message || formData.rating === 0) {
      alert("Please fill all fields and provide a rating.");
      return;
    }
    const newFeedback = {
      id: feedbackList.length + 1,
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };
    setFeedbackList([newFeedback, ...feedbackList]);
    setFormData({ category: "", rating: 0, message: "" });
  };

  const menuItems = [
    { id: "policies", label: "Policies", icon: FileText, path: "/dashboard" },
    { id: "services", label: "Services", icon: Briefcase, path: "/services" },
    { id: "complaints", label: "Complaints", icon: MessageSquare, path: "/complaints" },
    { id: "feedback", label: "Feedback", icon: ThumbsUp, path: "/feedback" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-900"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="font-bold text-lg">Sanlam | Allianz</div>
          </div>
        </div>

        {/* Navigation Menu */}
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

        {/* User Info */}
        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
              GK
            </div>
            <div>
              <div className="font-semibold">GUSTAVE KAREKEZI</div>
              <div className="text-sm text-blue-300">0786979551</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ThumbsUp className="text-blue-700 mr-2" /> Feedback
            </h1>
            <p className="text-gray-600 mt-1">Share your feedback and experiences</p>
          </div>
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Feedback Form */}
        <div className="p-8 bg-white shadow mb-6 mx-6 mt-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Category</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Claims Service">Claims Service</option>
                <option value="Policy Management">Policy Management</option>
                <option value="Payment Process">Payment Process</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 mb-1">Rating *</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600"
                placeholder="Share your thoughts..."
                required
              ></textarea>
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 flex items-center"
              >
                <Send size={18} className="mr-2" /> Submit Feedback
              </button>
            </div>
          </form>
        </div>

        {/* Feedback List */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Previous Feedback
            </h2>

            {feedbackList.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                No feedback submitted yet.
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-700 text-white text-left">
                    <th className="p-3 rounded-tl-lg">Date</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3 rounded-tr-lg">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackList.map((f) => (
                    <tr key={f.id} className="border-b hover:bg-gray-50 transition-all">
                      <td className="p-3 text-gray-700">{f.date}</td>
                      <td className="p-3 text-gray-800 font-medium">{f.category}</td>
                      <td className="p-3 text-yellow-500">
                        {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                      </td>
                      <td className="p-3 text-gray-600">{f.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
