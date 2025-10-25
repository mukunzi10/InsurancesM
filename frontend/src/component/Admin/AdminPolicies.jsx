import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Upload,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileCheck
} from 'lucide-react';

export default function AdminPolicies() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showAddPolicy, setShowAddPolicy] = useState(false);

  // Sample policies data
  const [policies, setPolicies] = useState([
    {
      id: 'E390073',
      policyNumber: 'POL-2023-001',
      type: 'Life Insurance',
      holder: 'Gustave Karekezi',
      holderID: 'CLI-12345',
      premium: '50,000 RWF',
      coverage: '10,000,000 RWF',
      status: 'Active',
      startDate: '2023-06-21',
      endDate: '2026-06-21',
      nextPayment: '2025-11-15',
      paymentFrequency: 'Monthly',
      beneficiary: 'Marie Karekezi'
    },
    {
      id: 'S390074',
      policyNumber: 'POL-2023-002',
      type: 'Health Insurance',
      holder: 'Jean Marie Uwimana',
      holderID: 'CLI-12346',
      premium: '35,000 RWF',
      coverage: '5,000,000 RWF',
      status: 'Lapsed',
      startDate: '2023-08-15',
      endDate: '2026-08-15',
      nextPayment: '2025-11-20',
      paymentFrequency: 'Monthly',
      beneficiary: 'Self'
    },
    {
      id: 'P390075',
      policyNumber: 'POL-2024-003',
      type: 'Motor Insurance',
      holder: 'Alice Mukamana',
      holderID: 'CLI-12347',
      premium: '120,000 RWF',
      coverage: '15,000,000 RWF',
      status: 'Active',
      startDate: '2024-01-10',
      endDate: '2025-01-10',
      nextPayment: '2025-01-10',
      paymentFrequency: 'Annually',
      beneficiary: 'N/A'
    },
    {
      id: 'H390076',
      policyNumber: 'POL-2022-004',
      type: 'Property Insurance',
      holder: 'Patrick Nkurunziza',
      holderID: 'CLI-12348',
      premium: '80,000 RWF',
      coverage: '20,000,000 RWF',
      status: 'Active',
      startDate: '2022-11-05',
      endDate: '2025-11-05',
      nextPayment: '2025-11-05',
      paymentFrequency: 'Annually',
      beneficiary: 'N/A'
    },
    {
      id: 'T390077',
      policyNumber: 'POL-2025-005',
      type: 'Travel Insurance',
      holder: 'Sarah Umutoni',
      holderID: 'CLI-12349',
      premium: '15,000 RWF',
      coverage: '2,000,000 RWF',
      status: 'Pending',
      startDate: '2025-11-01',
      endDate: '2025-12-01',
      nextPayment: '2025-11-01',
      paymentFrequency: 'One-time',
      beneficiary: 'Self'
    },
    {
      id: 'L390078',
      policyNumber: 'POL-2023-006',
      type: 'Life Insurance',
      holder: 'Patrick Nkurunziza',
      holderID: 'CLI-12348',
      premium: '75,000 RWF',
      coverage: '25,000,000 RWF',
      status: 'Active',
      startDate: '2023-03-15',
      endDate: '2028-03-15',
      nextPayment: '2025-11-15',
      paymentFrequency: 'Monthly',
      beneficiary: 'Grace Nkurunziza'
    },
    {
      id: 'M390079',
      policyNumber: 'POL-2024-007',
      type: 'Health Insurance',
      holder: 'Jean Marie Uwimana',
      holderID: 'CLI-12346',
      premium: '50,000 RWF',
      coverage: '8,000,000 RWF',
      status: 'Expired',
      startDate: '2023-04-20',
      endDate: '2024-04-20',
      nextPayment: '-',
      paymentFrequency: 'Monthly',
      beneficiary: 'Self'
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/admin/clients' },
    { id: 'policies', label: 'Policies', icon: Shield, path: '/admin/policies' },
    { id: 'claims', label: 'Claims', icon: FileText, path: '/admin/claims' },
    { id: 'payments', label: 'Payments', icon: DollarSign, path: '/admin/payments' },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare, path: '/admin/complaints' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' }
  ];

  const policyTypes = [
    'Life Insurance',
    'Health Insurance',
    'Motor Insurance',
    'Property Insurance',
    'Travel Insurance',
    'Business Insurance'
  ];

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="text-green-600" size={18} />;
      case 'expired':
      case 'lapsed':
        return <XCircle className="text-red-600" size={18} />;
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={18} />;
      case 'suspended':
        return <Clock className="text-orange-600" size={18} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
      case 'lapsed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Life Insurance': 'bg-purple-100 text-purple-800',
      'Health Insurance': 'bg-green-100 text-green-800',
      'Motor Insurance': 'bg-blue-100 text-blue-800',
      'Property Insurance': 'bg-orange-100 text-orange-800',
      'Travel Insurance': 'bg-pink-100 text-pink-800',
      'Business Insurance': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = 
      policy.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.holder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || policy.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || policy.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => p.status === 'Active').length;
  const pendingPolicies = policies.filter(p => p.status === 'Pending').length;
  const expiredPolicies = policies.filter(p => p.status === 'Expired' || p.status === 'Lapsed').length;

  const handleDeletePolicy = (policyId) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(p => p.id !== policyId));
      alert('Policy deleted successfully');
    }
  };

  const handleViewPolicy = (policy) => {
    setSelectedPolicy(policy);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">Sanlam | Allianz</div>
              <div className="text-xs text-blue-300">Admin Panel</div>
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

        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
              AD
            </div>
            <div className="flex-1">
              <div className="font-semibold">Admin User</div>
              <div className="text-sm text-blue-300">System Administrator</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-blue-700 flex justify-around">
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button onClick={() => navigate('/')} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Policy Management</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all insurance policies</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowAddPolicy(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus size={20} />
                <span className="font-semibold">New Policy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Policies</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPolicies}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-600">{activePolicies}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingPolicies}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Expired/Lapsed</p>
                  <p className="text-3xl font-bold text-red-600">{expiredPolicies}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="text-red-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="px-8 pb-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by policy ID, number, or holder name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="lapsed">Lapsed</option>
                  <option value="expired">Expired</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Policies Table */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Policy Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Holder</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Premium</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Coverage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Next Payment</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{policy.id}</p>
                        <p className="text-sm text-gray-500">{policy.policyNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(policy.type)}`}>
                        {policy.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{policy.holder}</p>
                        <p className="text-sm text-gray-500">{policy.holderID}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{policy.premium}</p>
                        <p className="text-xs text-gray-500">{policy.paymentFrequency}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{policy.coverage}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(policy.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                          {policy.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{policy.nextPayment}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewPolicy(policy)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Policy"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePolicy(policy.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Policy"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPolicies.length === 0 && (
              <div className="text-center py-12">
                <Shield className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Policies Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Policy Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Policy Details</h2>
                <p className="text-sm text-gray-600">{selectedPolicy.policyNumber}</p>
              </div>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Policy Status Banner */}
              <div className={`p-4 rounded-lg flex items-center justify-between ${
                selectedPolicy.status === 'Active' ? 'bg-green-50 border-l-4 border-green-500' :
                selectedPolicy.status === 'Pending' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                'bg-red-50 border-l-4 border-red-500'
              }`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedPolicy.status)}
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPolicy.status} Policy</p>
                    <p className="text-sm text-gray-600">Policy ID: {selectedPolicy.id}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(selectedPolicy.type)}`}>
                  {selectedPolicy.type}
                </span>
              </div>

              {/* Policy Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Policy Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">Policy Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Policy Number</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Policy Type</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Coverage Amount</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Premium Amount</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Frequency</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.paymentFrequency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Beneficiary</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.beneficiary}</p>
                    </div>
                  </div>
                </div>

                {/* Policy Holder Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">Policy Holder</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.holder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Client ID</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedPolicy.holderID}</p>
                    </div>
                    <div className="pt-4">
                      <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold">
                        View Client Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Timeline */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Policy Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Start Date</p>
                    <p className="text-lg font-bold text-blue-700">{selectedPolicy.startDate}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Next Payment</p>
                    <p className="text-lg font-bold text-green-700">{selectedPolicy.nextPayment}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">End Date</p>
                    <p className="text-lg font-bold text-purple-700">{selectedPolicy.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <button className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Edit Policy
                </button>
                <button className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors">
                  View Claims
                </button>
                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}