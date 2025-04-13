import { useEffect, useRef, useState } from "react";
import { Button } from "../Components/UI/Button";
import Stomp from "../Config/Stomp";

export default function ChatPage({ username }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messageEndRef = useRef(null);

    useEffect(() => {
        Stomp.connect().then(() => {
            Stomp.subscribe("/topic/messages", (message) => {
                setMessages((prev) => [...prev, JSON.parse(message.body)]);
            });
        });
        return () => Stomp.unsubscribe();
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim()) {
            const msg = { user: username, text: input };
            Stomp.send("/app/chat", {}, JSON.stringify(msg));
            setInput("");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-2xl h-screen mx-auto">
            <div className="bg-green-600 text-white p-4 font-bold text-center rounded-b-xl">
                Chatting as {username}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-white">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`my-2 p-2 rounded-lg max-w-sm ${msg.user === username ? "bg-green-200 ml-auto" : "bg-gray-200 mr-auto"
                            }`}
                    >
                        <span className="block text-xs text-gray-600">{msg.user}</span>
                        <span>{msg.text}</span>
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
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button onClick={sendMessage} className="rounded-l-none">
                    Send
                </Button>
            </div>
        </div>
    );
}

