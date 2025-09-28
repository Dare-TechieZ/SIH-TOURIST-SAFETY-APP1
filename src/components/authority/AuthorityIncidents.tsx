import React, { useState } from 'react';
import { ChevronLeft, Search, Filter, AlertTriangle, Clock, MapPin, User, ArrowRight } from 'lucide-react';

interface AuthorityIncidentsProps {
  onIncidentClick: () => void;
  onBack: () => void;
}

const AuthorityIncidents: React.FC<AuthorityIncidentsProps> = ({ onIncidentClick, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const incidents = [
    {
      id: 'INC-2025-001',
      type: 'emergency',
      tourist: 'John Smith',
      nationality: 'US',
      location: 'Red Fort, Delhi',
      time: '2 min ago',
      severity: 'high',
      status: 'responding',
      description: 'Tourist reported feeling unsafe, requesting immediate assistance'
    },
    {
      id: 'INC-2025-002',
      type: 'medical',
      tourist: 'Maria Garcia',
      nationality: 'Spain',
      location: 'India Gate',
      time: '15 min ago',
      severity: 'high',
      status: 'dispatched',
      description: 'Medical emergency reported via panic button'
    },
    {
      id: 'INC-2025-003',
      type: 'suspicious',
      tourist: 'David Chen',
      nationality: 'Canada',
      location: 'Connaught Place',
      time: '32 min ago',
      severity: 'medium',
      status: 'investigating',
      description: 'Suspicious activity reported in tourist area'
    },
    {
      id: 'INC-2025-004',
      type: 'lost',
      tourist: 'Emma Johnson',
      nationality: 'Australia',
      location: 'Chandni Chowk',
      time: '45 min ago',
      severity: 'low',
      status: 'resolved',
      description: 'Tourist reported being lost, provided directions'
    },
    {
      id: 'INC-2025-005',
      type: 'theft',
      tourist: 'Hans Mueller',
      nationality: 'Germany',
      location: 'Karol Bagh',
      time: '1 hour ago',
      severity: 'medium',
      status: 'investigating',
      description: 'Reported theft of personal belongings'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responding': return 'bg-red-100 text-red-800 border-red-200';
      case 'dispatched': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'suspicious': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'lost': return <MapPin className="h-5 w-5 text-blue-600" />;
      case 'theft': return <AlertTriangle className="h-5 w-5 text-purple-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || incident.type === selectedFilter;
    const matchesSeverity = selectedSeverity === 'all' || incident.severity === selectedSeverity;
    
    return matchesSearch && matchesFilter && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Incident Management</h1>
              <p className="text-blue-100">Monitor and respond to tourist safety incidents</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Active Incidents</div>
            <div className="text-2xl font-bold">{incidents.filter(i => i.status !== 'resolved').length}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search incidents, tourists, or locations..."
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <option value="all">All Types</option>
              <option value="emergency">Emergency</option>
              <option value="medical">Medical</option>
              <option value="suspicious">Suspicious</option>
              <option value="lost">Lost Tourist</option>
              <option value="theft">Theft</option>
            </select>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={onIncidentClick}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {getTypeIcon(incident.type)}
                      <span className="ml-2 font-semibold text-gray-900 text-lg">
                        {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Incident
                      </span>
                      <span className="ml-2 text-gray-500">#{incident.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">{incident.tourist}</span>
                          <span className="ml-1 text-sm">({incident.nationality})</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{incident.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end md:justify-start">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">{incident.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{incident.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity} priority
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      <div className="flex items-center text-blue-600 hover:text-blue-700">
                        <span className="text-sm font-medium mr-2">View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredIncidents.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorityIncidents;