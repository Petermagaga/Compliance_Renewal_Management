import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ComplianceItems from "./pages/ComplianceItems";
import AddComplianceItem from "./pages/AddComplianceItem";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./features/notifications/context/NotificationContext";

function App() {
  return (
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/compliance"
              element={
                <ProtectedRoute>
                  <ComplianceItems />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-item"
              element={
                <ProtectedRoute>
                  <AddComplianceItem />
                </ProtectedRoute>
              }
            />


            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <NotificationsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reminders"
                element={
                    <ProtectedRoute>
                        <RemindersPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <ReportsPage />
                    </ProtectedRoute>
                }
            />

            <Route
            
            path="/settings"
            element={
                <ProtectedRoute>
                    <SettingsPage />
                </ProtectedRoute>
            }
            
            />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
  );
}

export default App;
