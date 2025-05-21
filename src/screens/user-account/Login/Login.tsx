import { useState } from "react";
import { LockIcon, User2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button.tsx";
import { Card, CardContent } from "../../../components/ui/card.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { Link } from "react-router-dom";

export const Login = (): JSX.Element => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            setError("Please fill in both fields.");
            return;
        }
        setError("");
        console.log("Logging in with", { username, password });
        // Perform login logic here
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
                        {/*<div className="absolute -right-20 top-0 flex items-center">*/}
                        {/*    <img*/}
                        {/*        className="w-[60px] h-[60px] object-cover"*/}
                        {/*        alt="Social duck logo"*/}
                        {/*        src="/img/social-duck-logo-1.png"*/}
                        {/*    />*/}
                        {/*    <div className="bg-white p-3 rounded-xl border-3 border-black shadow-small relative ml-2">*/}
                        {/*        <p className="font-patrick-hand-body text-base">*/}
                        {/*            Welcome back to Social Duck!*/}
                        {/*        </p>*/}
                        {/*        <img*/}
                        {/*            className="absolute w-4 h-[25px] top-3.5 -left-2.5"*/}
                        {/*            alt="Left beak"*/}
                        {/*            src="/img/left-beak.svg"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                />
                            </div>

                            {error && <p className="text-red-600 font-patrick-hand text-sm">{error}</p>}

                            <Button
                                className="w-full h-[52px] bg-black text-white rounded-lg border-4 border-black hover:bg-black/90"
                                onClick={handleLogin}
                            >
                                <span className="font-patrick-hand-body-lg">Login</span>
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
