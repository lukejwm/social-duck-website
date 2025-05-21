import { useState } from "react";
import { Button } from "../../../components/ui/button.tsx";
import { Card, CardContent } from "../../../components/ui/card.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { Link, useNavigate } from "react-router-dom";

export const ResetPassword = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.log("Sending password reset request for", email);
    navigate("/forgot-password");
  };

  return (
      <div className="min-h-screen bg-[#ffde59] flex flex-col items-center justify-center">
        <div className="w-full max-w-[524px] flex flex-col items-center">
          <img
              className="w-[200px] h-[200px] object-cover mb-8"
              alt="Social Duck Logo"
              src="/img/rectangle-1.png"
          />

          <Card className="w-[361px] border-3 border-black shadow-[0px_4px_4px_#00000040] relative">
            <CardContent className="p-6">
              <div className="mb-8 text-center">
                <h1 className="font-patrick-hand text-2xl tracking-[0.06px]">
                  Reset Password
                </h1>
                <p className="font-patrick-hand text-base tracking-[0.03px]">
                  Enter your email to receive reset instructions
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-3 border-black">
                  <Input
                      type="email"
                      className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-black focus-visible:ring-0"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-600 font-patrick-hand text-sm">{error}</p>}

                <Button
                    className="w-full h-[52px] bg-black text-white rounded-lg border-4 border-black hover:bg-black/90"
                    onClick={handleResetPassword}
                    disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                >
                  <span className="font-patrick-hand-body-lg">Reset Password</span>
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
