// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
//       <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main className="flex-1 overflow-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef();
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main ref={mainRef} className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
