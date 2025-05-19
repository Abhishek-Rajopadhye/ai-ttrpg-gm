import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";

export default function EditWorld({ isOpen, onClose, world, onWorldUpdated }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lore, setLore] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (world) {
            setName(world.name || "");
            setDescription(world.description || "");
            setLore(world.lore || "");
        }
    }, [world]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.put(
                `${BACKEND_URL}/api/world/${world.id}`,
                { name, description, lore },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onWorldUpdated && onWorldUpdated(res.data);
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                    "Failed to update world. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !world) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Edit World</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Lore</label>
                        <textarea
                            value={lore}
                            onChange={(e) => setLore(e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}