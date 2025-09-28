import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Users, TrendingUp, Activity, Clock, Shield, Filter } from 'lucide-react';

interface AuthorityDashboardProps {
  onIncidentsClick: () => void;
}

const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({ onIncidentsClick }) => {
  const [activeAlerts, setActiveAlerts] = useState(12);
  const [totalTourists, setTotalTourists] = useState(2847);
  const [responseTime, setResponseTime] = useState('8.5 min');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const alerts = [
    { id: 1, type: 'emergency', location: 'Red Fort Area', time: '2 min ago', severity: 'high' },
    { id: 2, type: 'suspicious', location: 'Connaught Place', time: '15 min ago', severity: 'medium' },
    { id: 3, type: 'medical', location: 'India Gate', time: '23 min ago', severity: 'high' },
    { id: 4, type: 'lost', location: 'Chandni Chowk', time: '45 min ago', severity: 'low' }
  ];

  const touristClusters = [
    { area: 'Red Fort', count: 156, riskLevel: 'low' },
    { area: 'India Gate', count: 234, riskLevel: 'medium' },
    { area: 'Connaught Place', count: 189, riskLevel: 'high' },
    { area: 'Chandni Chowk', count: 98, riskLevel: 'medium' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tourist Safety Command Center</h1>
              <p className="text-blue-100">Real-time monitoring and incident response</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Last Updated</div>
            <div className="font-semibold">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalTourists.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">Active Tourists</div>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{activeAlerts}</div>
                <div className="text-blue-100 text-sm">Active Alerts</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{responseTime}</div>
                <div className="text-blue-100 text-sm">Avg Response</div>
              </div>
              <Clock className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-blue-100 text-sm">Safety Score</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Live Tourist Locations</h2>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Clusters
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors">
                    Heatmap
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors">
                    <Filter className="h-4 w-4 inline mr-1" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-medium">Interactive Map View</p>
                <p className="text-sm">Real-time tourist location clusters and risk zones</p>
              </div>
            </div>
          </div>

          {/* Tourist Clusters */}
          <div className="bg-white rounded-xl shadow-lg mt-6 overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Tourist Concentration by Area</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {touristClusters.map((cluster, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{cluster.area}</div>
                        <div className="text-sm text-gray-600">{cluster.count} tourists</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(cluster.riskLevel)}`}>
                      {cluster.riskLevel} risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Incidents */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                <button
                  onClick={onIncidentsClick}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
            </div>
            <div className="divide-y">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className={`h-4 w-4 mr-2 ${
                          alert.severity === 'high' ? 'text-red-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                        <span className="font-medium text-gray-900 capitalize">{alert.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{alert.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={onIncidentsClick}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <AlertTriangle className="h-5 w-5 mr-3" />
                Incident Management
              </button>
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Activity className="h-5 w-5 mr-3" />
                Deploy Response Team
              </button>
              <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Shield className="h-5 w-5 mr-3" />
                Safety Broadcast
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">IoT Devices</span>
                <span className="text-green-600 font-medium">1,247 Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Network Coverage</span>
                <span className="text-green-600 font-medium">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Teams</span>
                <span className="text-blue-600 font-medium">8 Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Sync</span>
                <span className="text-gray-900 font-medium">30 sec ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;