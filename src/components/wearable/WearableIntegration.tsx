import React, { useState } from 'react';
import { ChevronLeft, Watch, Heart, Activity, MapPin, Smartphone, Wifi, Battery, Shield, AlertTriangle } from 'lucide-react';

interface WearableIntegrationProps {
  onBack: () => void;
}

const WearableIntegration: React.FC<WearableIntegrationProps> = ({ onBack }) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const wearableDevices = [
    {
      id: 'smart-band-1',
      name: 'SafeTrack Smart Band Pro',
      type: 'Smart Band',
      features: ['Heart Rate', 'GPS', 'SOS Button', 'Fall Detection'],
      battery: 85,
      status: 'available'
    },
    {
      id: 'safety-tag-1',
      name: 'TouristGuard Safety Tag',
      type: 'Safety Tag',
      features: ['Location Tracking', 'Panic Button', 'Geofencing'],
      battery: 92,
      status: 'available'
    },
    {
      id: 'smart-watch-1',
      name: 'SecureWatch Series X',
      type: 'Smart Watch',
      features: ['Health Monitoring', 'Emergency Calls', 'Real-time Alerts'],
      battery: 67,
      status: 'connected'
    }
  ];

  const healthData = {
    heartRate: 72,
    steps: 8543,
    distance: '6.2 km',
    calories: 284,
    lastSync: '2 min ago'
  };

  const handleDeviceConnect = (deviceId: string) => {
    setIsScanning(true);
    setSelectedDevice(deviceId);
    
    setTimeout(() => {
      setIsScanning(false);
      setIsConnected(true);
    }, 3000);
  };

  const handleScanForDevices = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600 bg-green-100';
    if (level > 20) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">IoT Wearable Integration</h1>
              <p className="text-purple-100">Connect and manage your safety devices</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">Connected Devices</div>
            <div className="text-2xl font-bold">
              {wearableDevices.filter(d => d.status === 'connected').length}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Device Pairing Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Watch className="h-5 w-5 mr-2 text-purple-600" />
                Available Devices
              </h2>
              <button
                onClick={handleScanForDevices}
                disabled={isScanning}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScanning
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isScanning ? 'Scanning...' : 'Scan for Devices'}
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {wearableDevices.map((device) => (
                <div
                  key={device.id}
                  className={`border-2 rounded-xl p-4 transition-all ${
                    device.status === 'connected'
                      ? 'border-green-300 bg-green-50'
                      : selectedDevice === device.id
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Watch className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{device.name}</h3>
                        <p className="text-gray-600 text-sm">{device.type}</p>
                        <div className="flex items-center mt-1">
                          <Battery className={`h-4 w-4 mr-1 ${getBatteryColor(device.battery)}`} />
                          <span className={`text-xs px-2 py-1 rounded-full ${getBatteryColor(device.battery)}`}>
                            {device.battery}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {device.status === 'connected' ? (
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium">Connected</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeviceConnect(device.id)}
                          disabled={isScanning && selectedDevice === device.id}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isScanning && selectedDevice === device.id
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {isScanning && selectedDevice === device.id ? 'Connecting...' : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {device.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Monitoring */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-600" />
              Health Monitoring
            </h2>
          </div>
          <div className="p-6">
            {isConnected ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{healthData.heartRate}</div>
                  <div className="text-sm text-gray-500">BPM</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{healthData.steps.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Steps</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{healthData.distance}</div>
                  <div className="text-sm text-gray-500">Distance</div>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{healthData.calories}</div>
                  <div className="text-sm text-gray-500">Calories</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Connected Devices</h3>
                <p className="text-gray-600">Connect a wearable device to monitor your health data</p>
              </div>
            )}
            
            {isConnected && (
              <div className="text-center text-sm text-gray-500">
                Last synchronized: {healthData.lastSync}
              </div>
            )}
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              Safety Features
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-800">SOS Button</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Press and hold for 3 seconds to send emergency alert with location
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800">Real-time Location</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Continuous GPS tracking with geofencing alerts for high-risk areas
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                  <Heart className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-800">Health Alerts</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Automatic alerts for abnormal heart rate or fall detection
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Wifi className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-purple-800">Smart Connectivity</h3>
                    <p className="text-sm text-purple-700 mt-1">
                      Seamless sync with your mobile app and authority systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800">Important Safety Tips</h3>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Keep your device charged at all times</li>
                    <li>• Test the SOS function before traveling</li>
                    <li>• Enable location services for accurate tracking</li>
                    <li>• Update emergency contacts in your profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Settings */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Device Settings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto SOS Detection</h3>
                  <p className="text-sm text-gray-600">Automatically send SOS on fall detection</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Heart Rate Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified of irregular heart rate</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Location Sharing</h3>
                  <p className="text-sm text-gray-600">Share location with emergency contacts</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WearableIntegration;