import React, { useState } from 'react';
import { ChevronLeft, User, MapPin, Clock, Phone, AlertTriangle, FileText, Camera, Send, CheckCircle } from 'lucide-react';

interface AuthorityIncidentDetailProps {
  onBack: () => void;
}

const AuthorityIncidentDetail: React.FC<AuthorityIncidentDetailProps> = ({ onBack }) => {
  const [responseMessage, setResponseMessage] = useState('');
  const [eFireStatus, setEFireStatus] = useState('pending');

  const incident = {
    id: 'INC-2025-001',
    type: 'emergency',
    tourist: {
      name: 'John Smith',
      nationality: 'United States',
      age: 34,
      digitalId: 'TIN-12345678',
      phoneNumber: '+1 555-0123',
      emergencyContact: '+1 555-9876',
      photo: '/api/placeholder/150/150'
    },
    location: {
      current: 'Red Fort, Delhi',
      coordinates: '28.6562° N, 77.2410° E',
      lastUpdated: '2 minutes ago'
    },
    incident: {
      type: 'Panic Button Activated',
      severity: 'high',
      time: '2025-01-14 14:30:25',
      description: 'Tourist activated panic button reporting feeling unsafe in crowded area near Red Fort entrance',
      status: 'responding'
    },
    tripDetails: {
      arrivalDate: '2025-01-12',
      plannedDeparture: '2025-01-20',
      accommodation: 'The Imperial Hotel, New Delhi',
      itinerary: ['Red Fort', 'India Gate', 'Humayuns Tomb']
    },
    responseTeam: {
      officer: 'Inspector Raj Kumar',
      unit: 'Tourist Police Unit 3',
      eta: '6 minutes',
      vehicleNumber: 'DL-01-TP-3456'
    }
  };

  const handleGenerateEFir = () => {
    setEFireStatus('generating');
    setTimeout(() => {
      setEFireStatus('generated');
    }, 3000);
  };

  const handleSendResponse = () => {
    if (responseMessage.trim()) {
      // Send response logic here
      setResponseMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Incident Details - {incident.id}</h1>
              <p className="text-blue-100">Emergency response coordination</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              HIGH PRIORITY
            </span>
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              RESPONDING
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tourist Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-blue-600 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <User className="h-5 w-5 mr-2" />
                Tourist Digital Identity
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">JS</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{incident.tourist.name}</h3>
                  <p className="text-gray-600">{incident.tourist.nationality} • Age {incident.tourist.age}</p>
                  <p className="text-sm text-gray-500 mb-2">Digital ID: {incident.tourist.digitalId}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Verified with Blockchain</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{incident.tourist.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>
                      <br />{incident.tourist.emergencyContact}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Trip Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Arrival:</span> {incident.tripDetails.arrivalDate}
                    </div>
                    <div>
                      <span className="font-medium">Departure:</span> {incident.tripDetails.plannedDeparture}
                    </div>
                    <div>
                      <span className="font-medium">Hotel:</span> {incident.tripDetails.accommodation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-red-600 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Incident Report
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Incident Type</h4>
                  <p className="text-gray-600">{incident.incident.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Time Reported</h4>
                  <p className="text-gray-600">{incident.incident.time}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{incident.incident.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Current Location</h4>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <div>
                      <p>{incident.location.current}</p>
                      <p className="text-sm text-gray-500">{incident.location.coordinates}</p>
                      <p className="text-xs text-gray-400">Last updated: {incident.location.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <p className="text-sm">Live Location Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Actions */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-green-600 text-white">
              <h2 className="text-lg font-semibold">Response Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={handleGenerateEFir}
                  className={`p-4 rounded-lg border-2 border-dashed transition-all ${
                    eFireStatus === 'pending' 
                      ? 'border-blue-300 hover:border-blue-500 text-blue-600 hover:bg-blue-50' 
                      : eFireStatus === 'generating'
                      ? 'border-yellow-300 text-yellow-600 bg-yellow-50'
                      : 'border-green-300 text-green-600 bg-green-50'
                  }`}
                  disabled={eFireStatus !== 'pending'}
                >
                  <FileText className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-center">
                    {eFireStatus === 'pending' && (
                      <>
                        <h3 className="font-medium">Generate e-FIR</h3>
                        <p className="text-sm">Auto-create incident report</p>
                      </>
                    )}
                    {eFireStatus === 'generating' && (
                      <>
                        <h3 className="font-medium">Generating...</h3>
                        <p className="text-sm">Creating e-FIR document</p>
                      </>
                    )}
                    {eFireStatus === 'generated' && (
                      <>
                        <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <h3 className="font-medium">e-FIR Generated</h3>
                        <p className="text-sm">FIR-2025-001234</p>
                      </>
                    )}
                  </div>
                </button>
                
                <button className="p-4 border-2 border-dashed border-purple-300 hover:border-purple-500 text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                  <Camera className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-center">
                    <h3 className="font-medium">Upload Evidence</h3>
                    <p className="text-sm">Photos, documents, recordings</p>
                  </div>
                </button>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Send Response Message</h4>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your response to the tourist..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendResponse}
                    disabled={!responseMessage.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Team & Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-orange-600 text-white">
              <h3 className="font-semibold">Response Team</h3>
            </div>
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">{incident.responseTeam.officer}</h4>
                <p className="text-sm text-gray-600">{incident.responseTeam.unit}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium text-orange-600">{incident.responseTeam.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{incident.responseTeam.vehicleNumber}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Contact Team
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-600 text-white">
              <h3 className="font-semibold">Incident Timeline</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Panic button activated</p>
                    <p className="text-xs text-gray-500">14:30:25 - 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Alert dispatched to authorities</p>
                    <p className="text-xs text-gray-500">14:30:28 - 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response team assigned</p>
                    <p className="text-xs text-gray-500">14:31:15 - 1 min ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Team arrival expected</p>
                    <p className="text-xs text-gray-400">14:36:00 - in 6 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-purple-600 text-white">
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Escalate Priority
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Request Backup
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityIncidentDetail;