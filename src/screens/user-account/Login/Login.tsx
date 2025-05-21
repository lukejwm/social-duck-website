import { useState } from "react";
import { LockIcon, User2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const Login = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }
        
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/business/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            await login(email, data.id);
            
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password.");
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
                        <div className="mb-8">
                            <h1 className="font-patrick-hand text-2xl tracking-[0.06px]">
                                Login
                            </h1>
                            <p className="font-patrick-hand text-base tracking-[0.03px]">
                                Sign in to your account
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-3 border-black">
                                <User2Icon className="w-8 h-8" />
                                <Input
                                    className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-black focus-visible:ring-0"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-3 border-black">
                                <LockIcon className="w-8 h-8" />
                                <Input
                                    type="password"
                                    className="border-0 bg-transparent font-patrick-hand-body text-black placeholder:text-black focus-visible:ring-0"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            {error && <p className="text-red-600 font-patrick-hand text-sm">{error}</p>}

                            <Button
                                className="w-full h-[52px] bg-black text-white rounded-lg border-4 border-black hover:bg-black/90"
                                onClick={handleLogin}
                                disabled={loading || !email || !password}
                            >
                                <span className="font-patrick-hand-body-lg">
                                    {loading ? "Signing In..." : "Login"}
                                </span>
                            </Button>

                            <div className="text-center mt-4">
                                <Link to="/reset-password" className="font-patrick-hand text-black underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="text-center mt-2">
                                <p className="font-patrick-hand text-black">
                                    Don't have an account?
                                    <Link to="/signup" className="text-blue-600 underline"> Register</Link>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
