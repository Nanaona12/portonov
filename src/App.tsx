import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DashboardProjects from "./pages/dashboard/DashboardProjects";
import DashboardExperience from "./pages/dashboard/DashboardExperience";
import DashboardCertifications from "./pages/dashboard/DashboardCertifications";
import DashboardAwards from "./pages/dashboard/DashboardAwards";
import DashboardOrganizations from "./pages/dashboard/DashboardOrganizations";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="experience" element={<DashboardExperience />} />
              <Route path="certifications" element={<DashboardCertifications />} />
              <Route path="awards" element={<DashboardAwards />} />
              <Route path="organizations" element={<DashboardOrganizations />} />
              <Route path="profile" element={<DashboardProfile />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
