import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Plus, List, User } from "lucide-react";

const Navigation: React.FC<{ username: string }> = ({ username }) => {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/add", icon: Plus, label: "Add Todo" },
    { to: "/all", icon: List, label: "All Todos" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <List className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">TodoFlow</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}
            </div>

            {/* Username Display */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
