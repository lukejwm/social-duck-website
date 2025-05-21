import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./screens/user-account/Login";
import { Register } from "./screens/user-account/Register";
import { ForgotPassword } from "./screens/user-account/ForgotPassword";
import { BusinessDetails } from "./screens/onboarding/BusinessDetails";
import { TellUsAbout } from "./screens/onboarding/TellUsAbout";
import { ResetPassword } from "./screens/user-account/ResetPassword";
import {PreviewText} from "./screens/onboarding/PreviewText";
import {PhotoUpload} from "./screens/onboarding/PhotoUpload/PhotoUpload.tsx";
import {Final} from "./screens/onboarding/Final";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/onboarding/1/business-details" element={<BusinessDetails />} />
                <Route path="/onboarding/2/tell-us-about" element={<TellUsAbout />} />
                <Route path="/onboarding/3/preview-text" element={<PreviewText />} />
                <Route path="/onboarding/4/upload-images" element={<PhotoUpload />} />
                <Route path="/onboarding/5/complete" element={<Final />} />
            </Routes>
        </Router>
    );
};

export default App;
