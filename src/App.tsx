import React, { useState, Suspense, lazy } from 'react';
import { WebsiteHeader } from './components/WebsiteHeader';
import { Homepage } from './components/Homepage';
import { MobileTabNavigationWebsite } from './components/MobileTabNavigationWebsite';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthModal } from './components/AuthModal';
import { GuestModeBar } from './components/GuestModeBar';

// Simplified lazy loading
const FishEncyclopedia = lazy(() => import('./components/FishEncyclopedia'));
const DiseaseDiagnosis = lazy(() => import('./components/DiseaseDiagnosis'));
const ForumSection = lazy(() => import('./components/ForumSection'));
const ShopSection = lazy(() => import('./components/ShopSection'));
const PanduanSection = lazy(() => import('./components/PanduanSection'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const MonitoringDashboard = lazy(() => import('./components/MonitoringDashboard'));

interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'guest' | 'member' | 'admin';
  avatar?: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState<UserData | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(true);

  // Authentication handlers
  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setIsGuestMode(userData.role === 'guest');
  };

  const handleLogout = () => {
    setUser(null);
    setIsGuestMode(true);
    setActiveSection('home');
  };

  const handleSwitchToGuest = () => {
    setUser({
      id: 0,
      name: 'Pengunjung',
      email: 'guest@temanikan.com',
      role: 'guest',
      avatar: undefined
    });
    setIsGuestMode(true);
  };

  // Check if user can access a section
  const canAccessSection = (section: string) => {
    if (!user || user.role === 'guest') {
      const guestAllowedSections = ['home', 'ensiklopedia', 'panduan', 'shop'];
      return guestAllowedSections.includes(section);
    }
    
    // Admin-only sections
    if (section === 'admin') {
      return user.role === 'admin';
    }
    
    return true;
  };

  const renderContent = () => {
    if (!canAccessSection(activeSection)) {
      setActiveSection('home');
      return <Homepage onSectionChange={setActiveSection} />;
    }

    switch (activeSection) {
      case 'ensiklopedia':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat ensiklopedia ikan..." />}>
            <FishEncyclopedia />
          </Suspense>
        );
      case 'diagnosa':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat sistem diagnosa..." />}>
            <DiseaseDiagnosis />
          </Suspense>
        );
      case 'forum':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat forum komunitas..." />}>
            <ForumSection />
          </Suspense>
        );
      case 'shop':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat toko online..." />}>
            <ShopSection />
          </Suspense>
        );
      case 'panduan':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat panduan artikel..." />}>
            <PanduanSection />
          </Suspense>
        );
      case 'admin':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat dashboard admin..." />}>
            <AdminDashboard user={user} />
          </Suspense>
        );
      case 'monitoring':
        return (
          <Suspense fallback={<LoadingSpinner message="Memuat dashboard monitoring..." />}>
            <MonitoringDashboard />
          </Suspense>
        );
      default:
        return <Homepage onSectionChange={setActiveSection} onLoginClick={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <WebsiteHeader 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          user={user}
          onLoginClick={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          onSwitchToGuest={handleSwitchToGuest}
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl">🐠</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">temanikan</h1>
            <p className="text-cyan-100 text-sm">Teman Setia Hobi Ikan Hias</p>
          </div>
        </div>
      </div>

      {/* Guest Mode Banner */}
      {isGuestMode && (
        <div className="max-w-7xl mx-auto p-4 md:p-6 pb-0">
          <GuestModeBar onLoginClick={() => setShowAuthModal(true)} />
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 pb-20 md:pb-6">
        {renderContent()}
      </main>

      {/* Mobile Tab Navigation */}
      <MobileTabNavigationWebsite 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        user={user}
        canAccessSection={canAccessSection}
      />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}