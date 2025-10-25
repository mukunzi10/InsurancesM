import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  ThumbsUp,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Send,
  X
} from 'lucide-react';

export default function ClientComplaints() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaintForm, setComplaintForm] = useState({
    subject: '',
    category: '',
    policyNumber: '',
    description: '',
    priority: 'medium'
  });

  // Sample complaints data
  const complaints = [
    {
      id: 'CMP-2024-001',
      subject: 'Claim payment delay',
      category: 'Claims',
      policyNumber: 'E390073',
      status: 'In Progress',
      priority: 'high',
      dateSubmitted: '2025-10-20',
      lastUpdated: '2025-10-23',
      description: 'My claim payment has been delayed for over 2 weeks. Reference: CLM-2024-156',
      response: 'We are currently reviewing your case. Expected resolution by Oct 28, 2025.'
    },
    {
      id: 'CMP-2024-002',
      subject: 'Policy document not received',
      category: 'Documentation',
      policyNumber: 'S390074',
      status: 'Resolved',
      priority: 'medium',
      dateSubmitted: '2025-10-15',
      lastUpdated: '2025-10-18',
      description: 'I have not received my policy documents after registration.',
      response: 'Documents have been sent to your registered email address. Please check your spam folder.'
    },
    {
      id: 'CMP-2024-003',
      subject: 'Premium amount discrepancy',
      category: 'Billing',
      policyNumber: 'P390075',
      status: 'Open',
      priority: 'medium',
      dateSubmitted: '2025-10-22',
      lastUpdated: '2025-10-22',
      description: 'The premium amount charged is different from what was agreed.',
      response: null
    },
    {
      id: 'CMP-2024-004',
      subject: 'Unable to access online portal',
      category: 'Technical',
      policyNumber: 'E390073',
      status: 'Closed',
      priority: 'low',
      dateSubmitted: '2025-10-10',
      lastUpdated: '2025-10-12',
      description: 'I cannot log in to my account on the website.',
      response: 'Issue has been resolved. Password reset link was sent to your email.'
    }
  ];

  const menuItems = [
    { id: 'policies', label: 'Policies', icon: FileText, path: '/dashboard' },
    { id: 'services', label: 'Services', icon: Briefcase, path: '/services' },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare, path: '/complaints' },
    { id: 'feedback', label: 'Feedback', icon: ThumbsUp, path: '/feedback' }
  ];

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'in progress':
        return <Clock className="text-blue-600" size={20} />;
      case 'open':
        return <AlertCircle className="text-orange-600" size={20} />;
      default:
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'open':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintForm({
      ...complaintForm,
      [name]: value
    });
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaintForm);
    // Add API call here
    setShowNewComplaint(false);
    setComplaintForm({
      subject: '',
      category: '',
      policyNumber: '',
      description: '',
      priority: 'medium'
    });
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">Sanlam | Allianz</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-6 py-4 transition-all ${
                  isActive
                    ? 'bg-white text-blue-900 border-l-4 border-blue-600'
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
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

        {/* Bottom Icons */}
        <div className="p-4 border-t border-blue-700 flex justify-around">
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button 
            onClick={() => navigate('/')}
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
            <h1 className="text-3xl font-bold text-gray-900">Complaints</h1>
            <p className="text-gray-600 mt-1">Submit and track your complaints</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setShowNewComplaint(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Plus size={20} />
              <span className="font-semibold">New Complaint</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border-b px-8 py-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search complaints by ID or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Complaints List */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  {/* Complaint Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{complaint.subject}</h3>
                        {getStatusIcon(complaint.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-semibold">{complaint.id}</span>
                        <span>•</span>
                        <span>Policy: {complaint.policyNumber}</span>
                        <span>•</span>
                        <span>Category: {complaint.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority.toUpperCase()} Priority
                      </span>
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div className="mb-4">
                    <p className="text-gray-700">{complaint.description}</p>
                  </div>

                  {/* Response Section */}
                  {complaint.response && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Response from Support Team:</p>
                      <p className="text-sm text-gray-700">{complaint.response}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Submitted: {complaint.dateSubmitted}</span>
                      <span>•</span>
                      <span>Last Updated: {complaint.lastUpdated}</span>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={16} />
                      <span className="font-semibold">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredComplaints.length === 0 && (
            <div className="text-center py-20">
              <MessageSquare className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Complaints Found</h3>
              <p className="text-gray-500">No complaints match your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Submit New Complaint</h2>
              <button
                onClick={() => setShowNewComplaint(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitComplaint} className="p-6 space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={complaintForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your complaint"
                />
              </div>

              {/* Category and Policy Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={complaintForm.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Claims">Claims</option>
                    <option value="Billing">Billing</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Technical">Technical</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={complaintForm.policyNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E390073"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority Level *
                </label>
                <div className="flex space-x-4">
                  {['low', 'medium', 'high'].map((priority) => (
                    <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={complaintForm.priority === priority}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={complaintForm.description}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Please provide detailed information about your complaint..."
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Our support team will review your complaint and respond within 2-3 business days. You will receive updates via email and SMS.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewComplaint(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Submit Complaint</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 flex items-center justify-center">
        <MessageSquare size={24} />
      </button>
    </div>
  );
}