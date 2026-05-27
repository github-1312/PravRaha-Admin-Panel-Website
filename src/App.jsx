
import React from "react";
import { BrowserRouter as Router , Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useAuth } from "./services/auth.context"
import Dashboard from "./pages/Dashboard";
import DataManagement from "./pages/DataManagement";
import UserManagement from "./pages/UserManagement";
import JobPostings from "./pages/JobPostings";
import JobDetails from "./pages/JobDetails";    // New Job Details page
import SiteCustomization from "./pages/SiteCustomization";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import TestimonialManagement from "./pages/TestimonialManagement";
import TeamManagement from "./pages/TeamManagement";
import WebinarManagement from "./pages/WebinarManagement";
import SocialLinkManagement from "./pages/SocialLinkManagement";
import ContactManagement from "./pages/ContactManagement";
import CompanySettings from "./pages/CompanySettings";
import AboutManagement from "./pages/AboutManagement";
import CaseStudyLayout from "./pages/CaseStudyManagement";
import HeroContentSettings from "./pages/HeroContentSettings";
import AllFilesPage from './pages/data-upload/AllFilesPage';
import ApplicationsManagement from "./pages/ApplicationsManagement";
// Layout
import Layout from "./components/Layout/Layout";

// ScrollToTop Component
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CsvDataManagement from "./pages/data-upload/CsvDataManagement";
import CSVDataTable from "./pages/data-upload/CsvDataTable";
import QueryManagement from "./pages/QueryManagement";
import DataEnrichmentPage from "./pages/DataEnrichmentPage";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user && !token) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
       <Router>
          <ScrollToTop />
            <Toaster
        position="top-right"
        containerStyle={{}}
        toastOptions={{
          className:
            "flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border",
          success: {
            className:
              "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300",
            icon: (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ),
          },
          error: {
            className:
              "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300",
            icon: (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            ),
          },
        }}
      />



          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="data" element={<DataManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="queries" element={<QueryManagement />} />
              
              <Route path="data-management" element={<CsvDataManagement />} />
              <Route path="csv-data/all" element={<AllFilesPage/>} />
              <Route path="csv-data/:fileId" element={<CSVDataTable />} />
              <Route path="enrichment" element={<DataEnrichmentPage />} />
              <Route path="job-postings" element={<JobPostings />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="applications" element={<ApplicationsManagement />} />

              <Route path="customization/*" element={<SiteCustomization />}>
                <Route index element={<HeroContentSettings />} />
                <Route path="hero-content" element={<HeroContentSettings />} />
                <Route path="blogs" element={<DataManagement />} />
                <Route path="testimonials" element={<TestimonialManagement />} />
                <Route path="teams" element={<TeamManagement />} />
                <Route path="webinars" element={<WebinarManagement />} />
                <Route path="sociallinks" element={<SocialLinkManagement />} />
                <Route path="contact" element={<ContactManagement />} />
                <Route path="settings" element={<CompanySettings />} />
                <Route path="about" element={<AboutManagement />} />
                <Route path="case-studies" element={<CaseStudyLayout />} />
              </Route>

              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
