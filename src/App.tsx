import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/user-account/Login/Login";
import { Register } from "./screens/user-account/Register/Register";
import { ForgotPassword } from "./screens/user-account/ForgotPassword";
import { BusinessDetails } from "./screens/onboarding/BusinessDetails";
import { TellUsAbout } from "./screens/onboarding/TellUsAbout";
import { ResetPassword } from "./screens/user-account/ResetPassword";
import { PreviewText } from "./screens/onboarding/PreviewText";
import { PhotoUpload } from "./screens/onboarding/PhotoUpload/PhotoUpload";
import { Final } from "./screens/onboarding/Final";
import { Dashboard } from "./screens/dashboard/Dashboard";
import { Website } from "./screens/home/Website";
import { AuthProvider } from "./contexts/AuthContext";
import { BusinessPage } from "./screens/business/BusinessPage";
import { Chat } from "./screens/chat/Chat";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Website />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/onboarding/1/business-details" element={<BusinessDetails />} />
                    <Route path="/onboarding/2/tell-us-about" element={<TellUsAbout />} />
                    <Route path="/onboarding/3/preview-text" element={<PreviewText />} />
                    <Route path="/onboarding/4/upload-images" element={<PhotoUpload />} />
                    <Route path="/onboarding/5/complete" element={<Final />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/business/:id" element={<BusinessPage />} />
                    <Route path="/chat/:sessionId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
