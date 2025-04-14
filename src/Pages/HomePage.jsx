import { useNavigate } from "react-router-dom";
import { useStomp } from "../Utils/StompContext";
import { useEffect } from "react";
import { useState } from "react";
import ApiService from "../Services/ApiService";

export default function HomePage({ username }) {
    const navigate = useNavigate();
    const { stompClient } = useStomp();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await ApiService.request(`/users/${username}/contacts`, "GET");
                setContacts(response.contacts);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [username]);

    useEffect(() => {
        if (stompClient) {
            console.log("WebSocket client available in HomePage");
        }
    }, [stompClient]);

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-green-600 text-white">
                <h1 className="text-lg font-bold">WhatsApp Web</h1>
                <span>{username}</span>
            </div>

            <div className="flex-1 p-4 grid grid-cols-1 gap-4">
                {contacts.map((contact, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-green-100"
                        onClick={() => navigate(`/chat/${contact}`, { state: { contact, username } })}
                    >
                        <h2 className="text-xl font-semibold">{contact}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

