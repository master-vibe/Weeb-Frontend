import { Button } from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage({ username }) {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
            <Button onClick={() => navigate("/chat")}>Go to Chat</Button>
        </div>
    );
}