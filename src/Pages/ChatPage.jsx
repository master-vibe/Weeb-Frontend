import { useState, useEffect, useRef } from "react";
import { useStomp } from "../Utils/StompContext";
import { useParams } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { getLocalStorage } from "../Utils/LocalStorage";

export default function ChatPage() {
    const { sendMessage, messages } = useStomp();
    const [input, setInput] = useState("");
    const messageEndRef = useRef(null);
    const { contact } = useParams();
    const username = getLocalStorage("username");

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            const msg = {
                sender: username,
                receiver: contact,
                messageContent: input,
            };
            sendMessage("/chat/privateMessages", msg);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-2xl h-screen mx-auto">
            <div className="bg-green-600 text-white p-4 font-bold text-center rounded-b-xl">
                Chatting with {contact}
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-white">
                {messages
                    .filter(
                        (msg) =>
                            (msg.sender === username && msg.receiver === contact) ||
                            (msg.receiver === username && msg.sender === contact)
                    )
                    .map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`my-2 p-2 rounded-lg max-w-sm ${
                                    msg.sender === username ? "bg-green-200" : "bg-gray-200"
                                }`}
                            >
                                <span className="block text-xs text-gray-600">
                                    {msg.sender === username ? "You" : msg.sender}
                                </span>
                                <span className="block">{msg.messageContent}</span>
                            </div>
                        </div>
                    ))}
                <div ref={messageEndRef} />
            </div>

            <div className="flex p-4 bg-gray-100">
                <input
                    type="text"
                    className="flex-1 border rounded-l-lg p-2"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                            e.preventDefault();
                        }
                    }}
                />
                <Button onClick={handleSendMessage} className="rounded-l-none">
                    Send
                </Button>
            </div>
        </div>
    );
}
