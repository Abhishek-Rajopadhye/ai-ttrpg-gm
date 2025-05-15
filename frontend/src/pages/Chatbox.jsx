/* eslint-disable no-unused-vars */
import { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import axios from "axios";
import { BACKEND_URL } from "../config/const";

export default function Chatbox() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSend = async () => {
		if (!input.trim()) return;
		const newMessages = [...messages, { sender: "user", text: input }];
		setMessages(newMessages);
		setInput("");
		setLoading(true);

		try {
			const response = await axios.post(`${BACKEND_URL}/api/chat`, {
				body: JSON.stringify({ message: input }),
			});

			const data = await response.json();
			setMessages([...newMessages, { sender: "bot", text: data.reply }]);
		} catch (err) {
			setMessages([...newMessages, { sender: "bot", text: "Error: could not get response." }]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<header className="p-4 bg-blue-600 text-white flex justify-between items-center">
				<h1 className="text-xl font-semibold">Chat Assistant</h1>
				<button onClick={() => signOut(auth)} className="bg-white text-blue-600 px-3 py-1 rounded-md">
					Sign Out
				</button>
			</header>
			<main className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`max-w-md p-2 rounded-lg ${
							msg.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-200 mr-auto"
						}`}
					>
						{msg.text}
					</div>
				))}
				{loading && <div className="text-sm text-gray-500">Assistant is typing...</div>}
			</main>
			<footer className="p-4 bg-white border-t flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
					placeholder="Type your message..."
					className="flex-1 p-2 border rounded-md"
				/>
				<button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
					Send
				</button>
			</footer>
		</div>
	);
}
