import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Stomp from "../Config/Stomp";

const StompContext = createContext({
    stompClient: null,
    messages: [],
    sendMessage: () => {},
});

export const StompProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);

    // Subscribe and handle incoming messages
    const subscribeToMessages = useCallback((client) => {
        client.subscribe("/actor/topic/privateMessages", (message) => {
            const msg = JSON.parse(message.body);
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    // Establish STOMP connection and subscribe
    useEffect(() => {
        const connectStomp = async () => {
            try {
                await Stomp.connect();
                const client = Stomp.getClient();
                setStompClient(client);
                subscribeToMessages(client);
            } catch (error) {
                console.error("Error connecting to STOMP:", error);
            }
        };

        connectStomp();

        return () => {
            Stomp.disconnect();
        };
    }, [subscribeToMessages]);

    // Send message utility (accessible anywhere)
    const sendMessage = (destination, msg) => {
        if (stompClient) {
            stompClient.publish({
                destination,
                body: JSON.stringify(msg),
            });
            setMessages((prev) => [...prev, msg]); // Add sent message to messages list
        }
    };

    return (
        <StompContext.Provider value={{ stompClient, messages, sendMessage }}>
            {children}
        </StompContext.Provider>
    );
};

export const useStomp = () => useContext(StompContext);

