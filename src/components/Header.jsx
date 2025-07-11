import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = ({ setSidebarOpen }) => {
  const { logout } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center ml-4 md:ml-0">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-white font-medium">Welcome! Kathryn Murphy</p>
              <p className="text-gray-400 text-sm">Security is a process, not a product.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Here"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          </button>

          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <Bell className="h-5 w-5" />
          </button>

           {/* Logout */}
           <button
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={logout}
            >
              <User className="h-5 w-5" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;