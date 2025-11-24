import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CollegeProvider } from "@/context/CollegeContext";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { EventsPage } from "@/pages/EventsPage";
import { ClubsPage } from "@/pages/ClubsPage";
import { NewStudentDashboard } from "@/pages/NewStudentDashboard";
import { NewOrganizerDashboard } from "@/pages/NewOrganizerDashboard";
import { NewAdminDashboard } from "@/pages/NewAdminDashboard";
import { NewFacultyDashboard } from "@/pages/NewFacultyDashboard";
import { CreateEventPage } from "@/pages/CreateEventPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && profile && !allowedRoles.some(role => profile.roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollegeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            
            {/* Create Event Route */}
            <Route
              path="/create-event"
              element={
                <ProtectedRoute allowedRoles={['organizer', 'admin']}>
                  <CreateEventPage />
                </ProtectedRoute>
              }
            />
            
            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <NewStudentDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Organizer Routes */}
            <Route
              path="/organizer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['organizer', 'admin']}>
                  <NewOrganizerDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <NewAdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Faculty Routes */}
            <Route
              path="/faculty/dashboard"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <NewFacultyDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CollegeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
