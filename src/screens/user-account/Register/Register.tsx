import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope, FaLock } from "react-icons/fa"; // import icons
import businessService from "../../../services/businessService";
import { useAuth } from "../../../contexts/AuthContext";

export const Register = (): JSX.Element => {
  const [form, setForm] = useState({ businessName: "", email: "", password: "", repeatPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.businessName || !form.email || !form.password || !form.repeatPassword) {
      setError("All fields must be filled out.");
      return;
    }
    if (form.password !== form.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const businessData = {
        email: form.email,
        business_name: form.businessName,
        address: "", // Will be filled in during the onboarding process
        town_city: "", // Will be filled in during the onboarding process
        type: "", // Will be filled in during the onboarding process
        password: form.password
      };

      const response = await businessService.register(businessData);
      
      await login(form.email, response.id);
      
      navigate("/onboarding/1/business-details");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-[#ffde59] min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[524px] flex flex-col items-center">
          <img
              className="w-[200px] h-[200px] object-cover mb-8"
              alt="Social Duck Logo"
              src="/img/rectangle-1.png"
          />

          <Card className="w-[361px] border-3 border-black shadow-[0px_4px_4px_#00000040] relative">
            <CardContent className="p-6">
              <div className="mb-8 text-center">
                <h1 className="font-patrick-hand text-2xl tracking-[0.06px]">Register</h1>
                <p className="font-patrick-hand text-base tracking-[0.03px]">Create your account</p>
              </div>

              <div className="space-y-4">
                {/* Business Name */}
                <div className="flex items-center">
                  <FaHome className="text-black mr-2" />
                  <Input
                      type="text"
                      name="businessName"
                      placeholder="Business Name"
                      className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-gray-400 focus-visible:ring-0"
                      value={form.businessName}
                      onChange={handleChange}
                      disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <FaEnvelope className="text-black mr-2" />
                  <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-gray-400 focus-visible:ring-0"
                      value={form.email}
                      onChange={handleChange}
                      disabled={loading}
                  />
                </div>

                {/* Password */}
                <div className="flex items-center">
                  <FaLock className="text-black mr-2" />
                  <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-gray-400 focus-visible:ring-0"
                      value={form.password}
                      onChange={handleChange}
                      disabled={loading}
                  />
                </div>

                {/* Repeat Password */}
                <div className="flex items-center">
                  <FaLock className="text-black mr-2" />
                  <Input
                      type="password"
                      name="repeatPassword"
                      placeholder="Repeat Password"
                      className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-gray-400 focus-visible:ring-0"
                      value={form.repeatPassword}
                      onChange={handleChange}
                      disabled={loading}
                  />
                </div>

                {error && <p className="text-red-600 font-patrick-hand text-sm">{error}</p>}

                <Button
                    className="w-full h-[52px] bg-black text-white rounded-lg border-4 border-black hover:bg-black/90"
                    onClick={handleRegister}
                    disabled={loading || !form.businessName || !form.email || !form.password || !form.repeatPassword}
                >
                  <span className="font-patrick-hand-body-lg">
                    {loading ? "Creating Account..." : "Create Account"}
                  </span>
                </Button>
              </div>

              <div className="text-center mt-4">
                <Link to="/login" className="font-patrick-hand text-black underline">
                  Back to sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};
