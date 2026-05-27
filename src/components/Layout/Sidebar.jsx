import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  FileSpreadsheet,

  Users, 
  Briefcase, 
  Palette, 
  BarChart3, 
  Building2,
  FileText,
  DatabaseIcon,
  X
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon:  FileSpreadsheet, label: 'CSV Data Management', path: '/data-management' },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: DatabaseIcon, label: 'Data Enrichment', path: '/enrichment' },
    { icon: Users, label: 'Query Management', path: '/queries' },
    { icon: Briefcase, label: 'Job Postings', path: '/job-postings' },
    { icon: FileText, label: 'Applications Management', path: '/applications' },

    { icon: Palette, label: 'Site Customization', path: '/customization' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },

  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:h-auto md:z-auto`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Pravraha Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)} // Close sidebar on link click on mobile
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;