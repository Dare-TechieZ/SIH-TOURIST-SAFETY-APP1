import React, { useState, useEffect } from 'react';
import { Shield, MapPin, AlertTriangle, Settings, Phone, Navigation, TrendingUp, Clock, Users } from 'lucide-react';

interface TouristDashboardProps {
  onPanicClick: () => void;
  onSettingsClick: () => void;
}

const TouristDashboard: React.FC<TouristDashboardProps> = ({ onPanicClick, onSettingsClick }) => {
  const [safetyScore, setSafetyScore] = useState(85);
  const [currentLocation, setCurrentLocation] = useState('Connaught Place, New Delhi');
  const [nearbyAlerts, setNearbyAlerts] = useState([
    { id: 1, type: 'traffic', message: 'Heavy traffic on Ring Road', time: '5 min ago' },
    { id: 2, type: 'weather', message: 'Rain expected in 30 minutes', time: '10 min ago' }
  ]);

  useEffect(() => {
    // Simulate real-time safety score updates
    const interval = setInterval(() => {
      setSafetyScore(prev => Math.max(70, Math.min(95, prev + (Math.random() - 0.5) * 5)));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSafetyScoreText = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Moderate';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome Back, John</h1>
            <p className="text-blue-100">Stay safe during your travels</p>
          </div>
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
        
        {/* Safety Score */}
        <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Current Safety Score</h2>
              <p className="text-blue-100 text-sm">AI-powered risk assessment</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{safetyScore}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${getSafetyScoreColor(safetyScore)}`}>
                {getSafetyScoreText(safetyScore)}
              </div>
            </div>
          </div>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-1000"
              style={{ width: `${safetyScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onPanicClick}
              className="bg-red-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="h-8 w-8" />
              <span className="font-medium">Emergency</span>
            </button>
            <button className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-blue-700 transition-colors">
              <Phone className="h-8 w-8" />
              <span className="font-medium">Call Helpline</span>
            </button>
          </div>
        </div>

        {/* Current Location */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Location</h3>
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">{currentLocation}</p>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <p>Interactive map would display here</p>
              <p className="text-sm">Showing nearby points of interest</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Navigation className="h-4 w-4 inline mr-2" />
              Navigate
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Share Location
            </button>
          </div>
        </div>

        {/* Nearby Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Nearby Alerts</h3>
          {nearbyAlerts.length > 0 ? (
            <div className="space-y-3">
              {nearbyAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <p>No active alerts in your area</p>
            </div>
          )}
        </div>

        {/* Safety Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Safety Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.2km</div>
              <div className="text-sm text-gray-500">Distance Traveled</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">6.5h</div>
              <div className="text-sm text-gray-500">Active Time</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Check-ins</div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Safety Tips for Today</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Stay hydrated</p>
                <p className="text-xs text-gray-600">Temperature is expected to reach 32°C today</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Popular attractions nearby</p>
                <p className="text-xs text-gray-600">India Gate and Red Fort are within 5km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;