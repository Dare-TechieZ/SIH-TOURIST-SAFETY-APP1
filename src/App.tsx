import React, { useState } from 'react';
import { Shield, MapPin, Users, AlertTriangle, Settings, Home, Menu, X } from 'lucide-react';
import TouristOnboarding from './components/tourist/TouristOnboarding';
import TouristDashboard from './components/tourist/TouristDashboard';
import TouristPanic from './components/tourist/TouristPanic';
import TouristSettings from './components/tourist/TouristSettings';
import AuthorityDashboard from './components/authority/AuthorityDashboard';
import AuthorityIncidents from './components/authority/AuthorityIncidents';
import AuthorityIncidentDetail from './components/authority/AuthorityIncidentDetail';
import WearableIntegration from './components/wearable/WearableIntegration';

type ViewType = 'home' | 'tourist-onboarding' | 'tourist-dashboard' | 'tourist-panic' | 'tourist-settings' | 
                'authority-dashboard' | 'authority-incidents' | 'authority-incident-detail' | 'wearable';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const views = [
    { id: 'tourist-onboarding', label: 'Tourist Onboarding', icon: Shield },
    { id: 'tourist-dashboard', label: 'Tourist Dashboard', icon: Home },
    { id: 'tourist-panic', label: 'Panic Button', icon: AlertTriangle },
    { id: 'tourist-settings', label: 'Tourist Settings', icon: Settings },
    { id: 'authority-dashboard', label: 'Authority Dashboard', icon: MapPin },
    { id: 'authority-incidents', label: 'Incident Management', icon: AlertTriangle },
    { id: 'authority-incident-detail', label: 'Incident Details', icon: Users },
    { id: 'wearable', label: 'Wearable Integration', icon: Shield },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'tourist-onboarding':
        return <TouristOnboarding onComplete={() => setCurrentView('tourist-dashboard')} />;
      case 'tourist-dashboard':
        return <TouristDashboard onPanicClick={() => setCurrentView('tourist-panic')} onSettingsClick={() => setCurrentView('tourist-settings')} />;
      case 'tourist-panic':
        return <TouristPanic onBack={() => setCurrentView('tourist-dashboard')} />;
      case 'tourist-settings':
        return <TouristSettings onBack={() => setCurrentView('tourist-dashboard')} />;
      case 'authority-dashboard':
        return <AuthorityDashboard onIncidentsClick={() => setCurrentView('authority-incidents')} />;
      case 'authority-incidents':
        return <AuthorityIncidents onIncidentClick={() => setCurrentView('authority-incident-detail')} onBack={() => setCurrentView('authority-dashboard')} />;
      case 'authority-incident-detail':
        return <AuthorityIncidentDetail onBack={() => setCurrentView('authority-incidents')} />;
      case 'wearable':
        return <WearableIntegration onBack={() => setCurrentView('home')} />;
      default:
        return <HomeView />;
    }
  };

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Tourist Safety Monitoring System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive safety monitoring and incident response system for tourists with real-time tracking, 
            AI-powered risk assessment, and emergency response capabilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Tourist Mobile App</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView('tourist-onboarding')}
                className="w-full flex items-center p-3 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Shield className="h-5 w-5 mr-3 text-blue-600" />
                Digital ID Onboarding
              </button>
              <button
                onClick={() => setCurrentView('tourist-dashboard')}
                className="w-full flex items-center p-3 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5 mr-3 text-blue-600" />
                Safety Dashboard
              </button>
              <button
                onClick={() => setCurrentView('tourist-panic')}
                className="w-full flex items-center p-3 text-left hover:bg-red-50 rounded-lg transition-colors"
              >
                <AlertTriangle className="h-5 w-5 mr-3 text-red-600" />
                Panic Button
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Authority Dashboard</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView('authority-dashboard')}
                className="w-full flex items-center p-3 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                Live Monitoring
              </button>
              <button
                onClick={() => setCurrentView('authority-incidents')}
                className="w-full flex items-center p-3 text-left hover:bg-orange-50 rounded-lg transition-colors"
              >
                <AlertTriangle className="h-5 w-5 mr-3 text-orange-600" />
                Incident Management
              </button>
              <button
                onClick={() => setCurrentView('authority-incident-detail')}
                className="w-full flex items-center p-3 text-left hover:bg-green-50 rounded-lg transition-colors"
              >
                <Users className="h-5 w-5 mr-3 text-green-600" />
                Incident Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">IoT Integration</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView('wearable')}
                className="w-full flex items-center p-3 text-left hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Shield className="h-5 w-5 mr-3 text-purple-600" />
                Wearable Devices
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">System Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Blockchain Security</h4>
              <p className="text-sm text-gray-600">Secure digital identity with blockchain verification</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Tracking</h4>
              <p className="text-sm text-gray-600">Live location monitoring and geo-fencing</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">AI Safety Scoring</h4>
              <p className="text-sm text-gray-600">Intelligent risk assessment and alerts</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Multi-language</h4>
              <p className="text-sm text-gray-600">Support for 10+ Indian languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'home') {
    return <HomeView />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Shield className="h-8 w-8" />
                <span className="font-semibold text-lg">Tourist Safety System</span>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id as ViewType)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === view.id 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{view.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => {
                      setCurrentView(view.id as ViewType);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === view.id 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{view.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;