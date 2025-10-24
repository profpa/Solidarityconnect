import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Learn from './pages/Learn';
import Community from './pages/Community';
import Campaigns from './pages/Campaigns';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { HomeIcon, CalendarIcon, UsersIcon, CurrencyRupeeIcon, UserCircleIcon, ShieldCheckIcon } from './components/Icons';
import { UserProfile, AppEvent, FundraisingCampaign, DigitalLibraryDocument } from './types';
import { MOCK_USER, MOCK_ADMIN_USER, MOCK_EVENTS, MOCK_FUNDRAISERS, MOCK_DOCUMENTS } from './constants';
import Notification from './components/Notification';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  notification: string | null;
  events: AppEvent[];
  fundraisers: FundraisingCampaign[];
  documents: DigitalLibraryDocument[];
  login: () => void;
  logout: () => void;
  toggleAdminView: () => void;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  updateUser: (updatedUser: Partial<UserProfile>) => void;
  addEvent: (event: AppEvent) => void;
  addFundraiser: (campaign: FundraisingCampaign) => void;
  addDocument: (doc: DigitalLibraryDocument) => void;
}

const AppContext = React.createContext<AppContextType | null>(null);

const MainAppLayout = () => {
  const { user, toggleAdminView } = useAppContext();
  const location = useLocation();
  const isAdmin = user?.role === 'Admin';

  const getTitle = () => {
      if (isAdmin && (location.pathname === '/' || location.pathname === '/admin')) return 'Admin Dashboard';
      switch (location.pathname) {
          case '/': return 'Dashboard';
          case '/events': return 'Events & Opportunities';
          case '/learn': return 'Learning Center';
          case '/community': return 'Community Hub';
          case '/campaigns': return 'Campaigns';
          case '/payments': return 'Payments & Contributions';
          case '/profile': return 'My Profile';
          case '/profile/edit': return 'Edit Profile';
          case '/admin': return 'Admin Dashboard';
          default: return 'Solidarity Connect';
      }
  };

  const Header = () => (
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">{getTitle()}</h1>
              <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Admin View</span>
                  <button onClick={toggleAdminView} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isAdmin ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isAdmin ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
              </div>
          </div>
      </header>
  );

  const BottomNav = () => {
    const baseNavItems = [
      { path: '/', label: 'Dashboard', icon: <HomeIcon /> },
      { path: '/events', label: 'Events', icon: <CalendarIcon /> },
      { path: '/community', label: 'Community', icon: <UsersIcon /> },
      { path: '/payments', label: 'Payments', icon: <CurrencyRupeeIcon /> },
    ];
    
    const finalNavItem = isAdmin
      ? { path: '/admin', label: 'Admin', icon: <ShieldCheckIcon /> }
      : { path: '/profile', label: 'Profile', icon: <UserCircleIcon /> };

    const navItems = [...baseNavItems, finalNavItem];

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    );
  };
  
  return (
    <div className="max-w-lg mx-auto bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

function AppRoutes() {
  const { isAuthenticated, user } = useAppContext();
  const isAdmin = user?.role === 'Admin';

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route element={<MainAppLayout />}>
          <Route path="/" element={isAdmin ? <Admin /> : <Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

function AppWithProvider() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [events, setEvents] = useState<AppEvent[]>(MOCK_EVENTS);
  const [fundraisers, setFundraisers] = useState<FundraisingCampaign[]>(MOCK_FUNDRAISERS);
  const [documents, setDocuments] = useState<DigitalLibraryDocument[]>(MOCK_DOCUMENTS);

  const navigate = useNavigate();

  const login = () => {
    setUser(MOCK_USER);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleAdminView = () => {
    setUser(currentUser => {
        if (!currentUser) return null;
        const isSwitchingToAdmin = currentUser.role !== 'Admin';
        if (isSwitchingToAdmin) {
            navigate('/admin');
            return MOCK_ADMIN_USER;
        } else {
            navigate('/');
            return MOCK_USER;
        }
    });
  };
  
  const updateUser = (updatedUserInfo: Partial<UserProfile>) => {
      setUser(currentUser => currentUser ? { ...currentUser, ...updatedUserInfo } : null);
  };

  const addEvent = (event: AppEvent) => {
    setEvents(currentEvents => [event, ...currentEvents]);
  };
  
  const addFundraiser = (campaign: FundraisingCampaign) => {
    setFundraisers(currentFundraisers => [campaign, ...currentFundraisers]);
  };

  const addDocument = (doc: DigitalLibraryDocument) => {
    setDocuments(currentDocs => [doc, ...currentDocs]);
  };

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    notification,
    events,
    fundraisers,
    documents,
    setNotification,
    login,
    logout,
    toggleAdminView,
    updateUser,
    addEvent,
    addFundraiser,
    addDocument
  }), [user, isAuthenticated, notification, events, fundraisers, documents]);

  return (
    <AppContext.Provider value={contextValue}>
      <Notification message={notification} onClose={() => setNotification(null)} />
      <AppRoutes />
    </AppContext.Provider>
  );
}

const AppWrapper = () => (
    <HashRouter>
        <AppWithProvider />
    </HashRouter>
);

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export default AppWrapper;
