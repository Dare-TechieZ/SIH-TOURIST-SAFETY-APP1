import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Users, Shield, Clock, X } from 'lucide-react';

interface TouristPanicProps {
  onBack: () => void;
}

const TouristPanic: React.FC<TouristPanicProps> = ({ onBack }) => {
  const [panicActivated, setPanicActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [emergencyContacted, setEmergencyContacted] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (panicActivated && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setEmergencyContacted(true);
            setLocationShared(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [panicActivated, countdown]);

  const handlePanicActivate = () => {
    setPanicActivated(true);
  };

  const handleCancel = () => {
    setPanicActivated(false);
    setCountdown(5);
    setEmergencyContacted(false);
    setLocationShared(false);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {!panicActivated ? (
        // Initial Panic Screen
        <div className="p-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Emergency Assistance</h1>
              <p className="text-gray-600 mb-8">
                Press and hold the button below to activate emergency protocols. 
                Your location will be shared with authorities and emergency contacts.
              </p>

              <div className="space-y-6">
                <button
                  onClick={handlePanicActivate}
                  className="w-full bg-red-600 text-white py-6 rounded-xl font-bold text-xl hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <AlertTriangle className="h-8 w-8 mr-3" />
                  EMERGENCY HELP
                </button>

                <div className="text-left space-y-4">
                  <h3 className="font-semibold text-gray-900">What happens when activated:</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                      <span>Local police (100) and tourist helpline (1363) will be notified</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                      <span>Your exact location will be shared in real-time</span>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                      <span>Emergency contacts will receive SMS alerts</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                      <span>Incident will be logged for immediate response</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Phone className="h-5 w-5 inline mr-2" />
                    Call 100
                  </button>
                  <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <Phone className="h-5 w-5 inline mr-2" />
                    Call 1363
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Active Panic Screen
        <div className="min-h-screen bg-red-600 text-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">EMERGENCY ACTIVATED</h1>
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {countdown > 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <div className="text-8xl font-bold mb-4">{countdown}</div>
                <p className="text-xl mb-2">Activating emergency protocols...</p>
                <p className="text-red-100">Press Cancel to abort</p>
              </div>
              
              <button
                onClick={handleCancel}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors"
              >
                CANCEL EMERGENCY
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-semibold">Emergency Response Active</h2>
                </div>
                <p className="text-red-100">
                  Your emergency has been reported. Help is on the way.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3" />
                      <span>Police & Helpline Notified</span>
                    </div>
                    {emergencyContacted && <span className="text-green-300">✓</span>}
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>Location Shared</span>
                    </div>
                    {locationShared && <span className="text-green-300">✓</span>}
                  </div>
                  <p className="text-sm text-red-100 mt-2 ml-8">
                    Connaught Place, New Delhi
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3" />
                      <span>Emergency Contacts Alerted</span>
                    </div>
                    {emergencyContacted && <span className="text-green-300">✓</span>}
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>Response Time: 8-12 minutes</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-white text-red-600 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors">
                  Call Emergency Services
                </button>
                <button className="w-full border border-white text-white py-4 rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                  Share Live Location
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full border border-white text-white py-4 rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Cancel Emergency (False Alarm)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TouristPanic;