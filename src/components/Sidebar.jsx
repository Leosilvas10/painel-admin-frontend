
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Users, 
  Settings, 
  HelpCircle,
  LogOut,
  X,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/', icon: LayoutDashboard, current: location.pathname === '/' },
    { name: 'Issues', href: '/issues', icon: AlertTriangle, current: location.pathname === '/issues' },
    { name: 'Files', href: '/files', icon: FileText, current: location.pathname === '/files' },
    { name: 'Landing Pages', href: '/landing-pages', icon: FileText, current: location.pathname === '/landing-pages' },
    { name: 'Media', href: '/media', icon: Image, current: location.pathname === '/media' },
    { name: 'Forms', href: '/forms', icon: BarChart3, current: location.pathname === '/forms' },
    { name: 'Users', href: '/users', icon: Users, current: location.pathname === '/users' },
  ];

  const secondaryNavigation = [
    { name: 'Threat Details', href: '/threat-details', icon: AlertTriangle },
    { name: 'Threats', href: '/threats', icon: AlertTriangle },
    { name: 'Help & Support', href: '/help', icon: HelpCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} secondaryNavigation={secondaryNavigation} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <SidebarContent navigation={navigation} secondaryNavigation={secondaryNavigation} />
        </div>
      </div>
    </>
  );
};

const SidebarContent = ({ navigation, secondaryNavigation }) => {
  return (
    <>
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">JG</span>
          </div>
          <span className="text-white font-semibold text-lg">Jota<span className="text-purple-400">Guard</span></span>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
          <div className="mb-8">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              General
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.current
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
              >
                <item.icon
                  className={`${
                    item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  } mr-3 flex-shrink-0 h-5 w-5`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Reports
            </p>
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              >
                <item.icon
                  className="text-gray-400 group-hover:text-white mr-3 flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Upgrade section */}
        <div className="p-4">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-xl">🔒</span>
            </div>
            <p className="text-white font-medium mb-2">Additional features to enhance your security.</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
              Upgrade →
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
