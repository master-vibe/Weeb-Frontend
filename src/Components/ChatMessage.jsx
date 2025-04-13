export default function ChatMessage({ message, currentUser }) {
    const isOwn = message.user === currentUser;

    return (
        <div
            className={`my-2 p-2 rounded-lg max-w-sm ${isOwn ? "bg-green-200 ml-auto" : "bg-gray-200 mr-auto"
                }`}
        >
            <span className="block text-xs text-gray-600">{message.user}</span>
            <span>{message.text}</span>
        </div>
    );
}