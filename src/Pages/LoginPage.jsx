// LoginPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import ApiService from "../Services/ApiService";
import { setCookie } from "../Utils/Cookie";

export default function LoginPage({ setUsername, setIsLoggedIn}) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

        const handleLogin = async () => {
        if (name.trim() && password.trim()) {
            try {
                const response = await ApiService.request("/auth/login", "POST", {
                    data: {
                        username: name,
                        password,
                    },
                });
                if (response.jwtToken) {
                    setCookie("token", response.jwtToken, { path: "/" });
                    setUsername(name);
                    setIsLoggedIn(true);
                    navigate("/home");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <input
                    type="text"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Enter username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="w-full mb-2">
                    Login
                </Button>
                <p className="text-sm mb-2">
                    Not signed up? <b className="cursor-pointer" onClick={() => navigate("/signup")}>Signup</b>
                </p>
            </div>
        </div>
    );
}

