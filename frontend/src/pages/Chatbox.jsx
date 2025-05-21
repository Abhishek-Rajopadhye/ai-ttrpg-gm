/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, TextInput, Spinner } from "flowbite-react";

export default function Chatbox() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const { logout } = useContext(AuthContext);
	const chatEndRef = useRef(null);

	const handleSend = async () => {
		if (!input.trim()) return;
		const newMessages = [...messages, { sender: "user", text: input }];
		setMessages(newMessages);
		setInput("");
		setLoading(true);
		const prompt = { prompt: input };
		try {
			const response = await axios.post(`${BACKEND_URL}/api/ai/generate`, prompt, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			const data = response.data;
			setMessages([...newMessages, { sender: "bot", text: data.response }]);
		} catch (err) {
			setMessages([...newMessages, { sender: "bot", text: "Error: could not get response." }]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, loading]);

	return (
		<div className="overflow-y-clip relative h-160 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<main className="relative h-140 overflow-y-auto p-6 space-y-4">
				{messages.map((msg, index) => (
					<Card
						key={index}
						className={`max-w-2xl px-4 py-3 rounded-xl shadow ${
							msg.sender === "user"
								? "bg-blue-100 dark:bg-blue-900 ml-auto text-right border border-blue-200 dark:border-blue-800"
								: "bg-white dark:bg-gray-700 mr-auto text-left border border-gray-200 dark:border-gray-700"
						}`}
					>
						<div className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
							{msg.sender === "user" ? "You" : "AI-GM"}
						</div>
						<ReactMarkdown
							children={msg.text}
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeHighlight]}
							components={{
								code({ node, inline, className, children, ...props }) {
									return !inline ? (
										<pre className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto text-sm my-2 text-gray-100">
											<code className={className} {...props}>
												{children}
											</code>
										</pre>
									) : (
										<code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5" {...props}>
											{children}
										</code>
									);
								},
								a: ({ node, ...props }) => (
									<a
										{...props}
										className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
										target="_blank"
										rel="noopener noreferrer"
									/>
								),
								ul: ({ node, ...props }) => <ul className="list-disc ml-6" {...props} />,
								ol: ({ node, ...props }) => <ol className="list-decimal ml-6" {...props} />,
								blockquote: ({ node, ...props }) => (
									<blockquote
										className="border-l-4 border-blue-400 dark:border-blue-600 pl-4 italic text-gray-600 dark:text-gray-300 my-2"
										{...props}
									/>
								),
								table: ({ node, ...props }) => (
									<div className="overflow-x-auto">
										<table className="min-w-full border border-gray-300 dark:border-gray-600" {...props} />
									</div>
								),
								th: ({ node, ...props }) => (
									<th className="border px-2 py-1 bg-gray-100 dark:bg-gray-800" {...props} />
								),
								td: ({ node, ...props }) => <td className="border px-2 py-1 dark:border-gray-700" {...props} />,
							}}
						/>
					</Card>
				))}
				{loading && (
					<Card className="max-w-2xl px-4 py-3 rounded-xl shadow bg-white dark:bg-gray-700 mr-auto text-left border border-gray-200 dark:border-gray-700 text-gray-400 italic flex items-center gap-2">
						<Spinner size="sm" className="mr-2" />
						Assistant is typing...
					</Card>
				)}
				<div ref={chatEndRef} />
			</main>
			<footer className="relative w-screen p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2 shadow">
				<TextInput
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
					placeholder="Type your message..."
					className="flex-1"
					color="gray"
					autoFocus
				/>
				<Button color="blue" onClick={handleSend} disabled={loading} className="px-6 py-2 font-semibold">
					Send
				</Button>
			</footer>{" "}
		</div>
	);
}
