export default function ChatHeader({ username }) {
    return (
        <div className="bg-green-600 text-white p-4 font-bold text-center rounded-b-xl">
            Chatting as {username}
        </div>
    );
}