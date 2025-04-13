import { useState } from "react";
import { Button } from "@/Components/UI/Button";

export default function ChatInput({ onSend }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className="flex p-4 bg-gray-100">
            <input
                type="text"
                className="flex-1 border rounded-l-lg p-2"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} className="rounded-l-none">
                Send
            </Button>
        </div>
    );
}
