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
  Shield,
  Heart,
  Car,
  Home,
  Plane,
  Users,
  Briefcase as Business,
  GraduationCap,
  Activity,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export default function ClientServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Services data
  const services = [
    {
      id: 1,
      name: 'Life Insurance',
      category: 'life',
      description: 'Comprehensive life coverage for you and your family with flexible premium options.',
      icon: Heart,
      color: 'bg-red-500',
      features: ['Death benefit', 'Critical illness cover', 'Disability cover'],
      premium: 'From 5,000 RWF/month'
    },
    {
      id: 2,
      name: 'Health Insurance',
      category: 'health',
      description: 'Complete healthcare coverage including hospitalization, outpatient, and dental care.',
      icon: Activity,
      color: 'bg-green-500',
      features: ['Hospitalization', 'Outpatient care', 'Dental & Vision'],
      premium: 'From 8,000 RWF/month'
    },
    {
      id: 3,
      name: 'Motor Insurance',
      category: 'motor',
      description: 'Protect your vehicle with comprehensive or third-party coverage options.',
      icon: Car,
      color: 'bg-blue-500',
      features: ['Accident cover', 'Theft protection', '24/7 roadside assistance'],
      premium: 'From 120,000 RWF/year'
    },
    {
      id: 4,
      name: 'Home Insurance',
      category: 'property',
      description: 'Safeguard your home and belongings against fire, theft, and natural disasters.',
      icon: Home,
      color: 'bg-orange-500',
      features: ['Building cover', 'Contents insurance', 'Natural disaster protection'],
      premium: 'From 80,000 RWF/year'
    },
    {
      id: 5,
      name: 'Travel Insurance',
      category: 'travel',
      description: 'Stay protected while traveling with medical, trip cancellation, and luggage coverage.',
      icon: Plane,
      color: 'bg-purple-500',
      features: ['Medical emergencies', 'Trip cancellation', 'Lost luggage'],
      premium: 'From 15,000 RWF/trip'
    },
    {
      id: 6,
      name: 'Business Insurance',
      category: 'business',
      description: 'Comprehensive coverage for your business assets, liability, and operations.',
      icon: Business,
      color: 'bg-indigo-500',
      features: ['Property damage', 'Liability cover', 'Business interruption'],
      premium: 'Custom quotes'
    },
    {
      id: 7,
      name: 'Education Plan',
      category: 'savings',
      description: 'Secure your children\'s education with our dedicated savings and investment plan.',
      icon: GraduationCap,
      color: 'bg-yellow-500',
      features: ['Guaranteed returns', 'Flexible contributions', 'Tax benefits'],
      premium: 'From 20,000 RWF/month'
    },
    {
      id: 8,
      name: 'Investment Plans',
      category: 'savings',
      description: 'Grow your wealth with our diverse investment and retirement planning options.',
      icon: TrendingUp,
      color: 'bg-teal-500',
      features: ['Market-linked returns', 'Retirement planning', 'Wealth accumulation'],
      premium: 'From 30,000 RWF/month'
    },
    {
      id: 9,
      name: 'Group Insurance',
      category: 'group',
      description: 'Employee benefit solutions including life, health, and pension schemes.',
      icon: Users,
      color: 'bg-pink-500',
      features: ['Employee benefits', 'Group life cover', 'Pension schemes'],
      premium: 'Enterprise pricing'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'life', name: 'Life & Health', count: services.filter(s => s.category === 'life' || s.category === 'health').length },
    { id: 'property', name: 'Property & Motor', count: services.filter(s => s.category === 'property' || s.category === 'motor').length },
    { id: 'savings', name: 'Savings & Investment', count: services.filter(s => s.category === 'savings').length },
    { id: 'business', name: 'Business & Group', count: services.filter(s => s.category === 'business' || s.category === 'group').length }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => {
        if (selectedCategory === 'life') return s.category === 'life' || s.category === 'health';
        if (selectedCategory === 'property') return s.category === 'property' || s.category === 'motor';
        if (selectedCategory === 'business') return s.category === 'business' || s.category === 'group';
        return s.category === selectedCategory;
      });

  const menuItems = [
    { id: 'policies', label: 'Policies', icon: FileText, path: '/dashboard' },
    { id: 'services', label: 'Services', icon: Briefcase, path: '/services' },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare, path: '/complaints' },
    { id: 'feedback', label: 'Feedback', icon: ThumbsUp, path: '/feedback' }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600 mt-1">Browse and apply for our insurance services</p>
          </div>
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="bg-white border-b px-8 py-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group">
                  {/* Service Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        <Icon size={28} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-2">{service.name}</h3>
                    <p className="text-lg text-gray-600">{service.description}</p>
                  </div>

                  {/* Service Details */}
                  <div className="p-6">
                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Features</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Starting from</p>
                      <p className="text-lg font-bold text-blue-700">{service.premium}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center">
                        Apply Now
                        <ChevronRight size={18} className="ml-1" />
                      </button>
                      <button className="px-4 bg-gray-100 text-gray-700 py-3 rounded font-semibold hover:bg-gray-200 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Found</h3>
              <p className="text-gray-500">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 flex items-center justify-center">
        <MessageSquare size={24} />
      </button>
    </div>
  );
}