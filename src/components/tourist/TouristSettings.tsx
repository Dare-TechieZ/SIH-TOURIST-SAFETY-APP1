import React, { useState } from 'react';
import { ChevronLeft, Shield, MapPin, Globe, Bell, Users, Phone, Eye, EyeOff } from 'lucide-react';

interface TouristSettingsProps {
  onBack: () => void;
}

const TouristSettings: React.FC<TouristSettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    realTimeTracking: true,
    locationSharing: true,
    emergencyAlerts: true,
    safetyNotifications: true,
    language: 'english',
    emergencyContact: '+91 98765 43210',
    shareLocationWithFamily: true,
    autoCheckIn: false,
    privateMode: false
  });

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'odia', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'assamese', name: 'Assamese', native: 'অসমীয়া' }
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: React.ElementType, 
    title: string, 
    description: string, 
    children: React.ReactNode 
  }) => (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );

  const ToggleSwitch = ({ checked, onChange, disabled = false }: { checked: boolean, onChange: () => void, disabled?: boolean }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked 
          ? 'bg-blue-600' 
          : disabled 
            ? 'bg-gray-300' 
            : 'bg-gray-200'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Safety & Privacy Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Safety & Privacy</h2>
          
          <SettingItem
            icon={Shield}
            title="Real-time Tracking"
            description="Allow continuous location monitoring for enhanced safety"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable tracking</span>
              <ToggleSwitch
                checked={settings.realTimeTracking}
                onChange={() => updateSetting('realTimeTracking', !settings.realTimeTracking)}
              />
            </div>
            {settings.realTimeTracking && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  Your location is being monitored for safety. This helps authorities respond faster in case of emergencies.
                </p>
              </div>
            )}
          </SettingItem>

          <SettingItem
            icon={settings.privateMode ? EyeOff : Eye}
            title="Private Mode"
            description="Limit data sharing while maintaining core safety features"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Private mode</span>
              <ToggleSwitch
                checked={settings.privateMode}
                onChange={() => updateSetting('privateMode', !settings.privateMode)}
              />
            </div>
            {settings.privateMode && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  Some features may be limited in private mode. Emergency functions remain fully active.
                </p>
              </div>
            )}
          </SettingItem>

          <SettingItem
            icon={Users}
            title="Share Location with Family"
            description="Allow your family to see your location during travels"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Family sharing</span>
              <ToggleSwitch
                checked={settings.shareLocationWithFamily}
                onChange={() => updateSetting('shareLocationWithFamily', !settings.shareLocationWithFamily)}
                disabled={settings.privateMode}
              />
            </div>
          </SettingItem>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          
          <SettingItem
            icon={Bell}
            title="Emergency Alerts"
            description="Receive alerts about potential risks in your area"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Emergency alerts</span>
              <ToggleSwitch
                checked={settings.emergencyAlerts}
                onChange={() => updateSetting('emergencyAlerts', !settings.emergencyAlerts)}
              />
            </div>
          </SettingItem>

          <SettingItem
            icon={Shield}
            title="Safety Notifications"
            description="Get proactive safety tips and recommendations"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Safety tips</span>
              <ToggleSwitch
                checked={settings.safetyNotifications}
                onChange={() => updateSetting('safetyNotifications', !settings.safetyNotifications)}
              />
            </div>
          </SettingItem>

          <SettingItem
            icon={MapPin}
            title="Auto Check-in"
            description="Automatically check in at popular tourist destinations"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Auto check-in</span>
              <ToggleSwitch
                checked={settings.autoCheckIn}
                onChange={() => updateSetting('autoCheckIn', !settings.autoCheckIn)}
              />
            </div>
          </SettingItem>
        </div>

        {/* Language Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h2>
          
          <SettingItem
            icon={Globe}
            title="Preferred Language"
            description="Choose your preferred language for the app interface"
          >
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.native})
                </option>
              ))}
            </select>
          </SettingItem>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
          
          <SettingItem
            icon={Phone}
            title="Primary Emergency Contact"
            description="This contact will be notified during emergencies"
          >
            <input
              type="tel"
              value={settings.emergencyContact}
              onChange={(e) => updateSetting('emergencyContact', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </SettingItem>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Pre-configured Emergency Numbers</h3>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Police Emergency:</span>
                <span className="font-medium">100</span>
              </div>
              <div className="flex justify-between">
                <span>Tourist Helpline:</span>
                <span className="font-medium">1363</span>
              </div>
              <div className="flex justify-between">
                <span>Medical Emergency:</span>
                <span className="font-medium">108</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h2>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Data Protection</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your personal data is encrypted and stored securely using blockchain technology. 
              Only authorized personnel can access your information during emergencies.
            </p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Privacy Policy
              </button>
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Download My Data
              </button>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristSettings;