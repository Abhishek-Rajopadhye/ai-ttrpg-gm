/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { AuthContext } from "../context/AuthContext";

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
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <header className="p-4 bg-blue-700 text-white flex justify-between items-center shadow">
                <h1 className="text-2xl font-bold tracking-wide">AI TTRPG Session</h1>
                <button
                    onClick={logout}
                    className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition"
                >
                    Sign Out
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-2xl px-4 py-3 rounded-xl shadow ${
                            msg.sender === "user"
                                ? "bg-blue-100 ml-auto text-right border border-blue-200"
                                : "bg-white mr-auto text-left border border-gray-200"
                        }`}
                    >
                        <div className="mb-1 text-xs font-semibold text-gray-500">
                            {msg.sender === "user" ? "You" : "AI-GM"}
                        </div>
                        <ReactMarkdown
                            children={msg.text}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    return !inline ? (
                                        <pre className="bg-gray-900 rounded-lg p-3 overflow-x-auto text-sm my-2">
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    ) : (
                                        <code className="bg-gray-200 rounded px-1 py-0.5" {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                a: ({ node, ...props }) => (
                                    <a
                                        {...props}
                                        className="text-blue-600 underline hover:text-blue-800"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc ml-6" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal ml-6" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-2" {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-300" {...props} />
                                    </div>
                                ),
                                th: ({ node, ...props }) => (
                                    <th className="border px-2 py-1 bg-gray-100" {...props} />
                                ),
                                td: ({ node, ...props }) => (
                                    <td className="border px-2 py-1" {...props} />
                                ),
                            }}
                        />
                    </div>
                ))}
                {loading && (
                    <div className="max-w-2xl px-4 py-3 rounded-xl shadow bg-white mr-auto text-left border border-gray-200 text-gray-400 italic">
                        Assistant is typing...
                    </div>
                )}
                <div ref={chatEndRef} />
            </main>
            <footer className="p-4 bg-white border-t flex gap-2 shadow">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition disabled:opacity-50"
                >
                    Send
                </button>
            </footer>
        </div>
    );
}