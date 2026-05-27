

import React from "react";
import { Link } from "react-router-dom";

const SubHeaderCustomisation = () => {
  const navigationItems = [
    { name: "Hero Content", href: "/customization/hero-content" },
    // { name: "Blogs", href: "/customization/blogs" },
    // { name: "Teams", href: "/customization/teams" },
    // { name: "Testimonials", href: "/customization/testimonials" },
    // { name: "Webinars", href: "/customization/webinars" },
    // { name: "Case Studies", href: "/customization/case-studies" },
    { name: "About", href: "/customization/about" },
    { name: "Contact", href: "/customization/contact" },
    // { name: "Settings", href: "/customization/settings" },
    { name: "Social Media", href: "/customization/sociallinks" },
  ];

  return (
    <div className="w-full shadow-sm border-b bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <nav
          className="flex overflow-x-auto no-scrollbar space-x-3 sm:space-x-4 lg:space-x-6 
                     scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          aria-label="Secondary Navigation"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full 
                         text-gray-700 hover:text-blue-600 hover:bg-blue-50
                         dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800
                         transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SubHeaderCustomisation;
