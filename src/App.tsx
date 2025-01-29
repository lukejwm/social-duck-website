import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { ForgotPassword } from "./screens/ForgotPassword";
import { BusinessDetails } from "./screens/BusinessDetails";
import { TellUsAbout } from "./screens/TellUsAbout";
import { ResetPassword } from "./screens/ResetPassword";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/business-details" element={<BusinessDetails />} />
                <Route path="/tell-us-about" element={<TellUsAbout />} />
            </Routes>
        </Router>
    );
};

export default App;
