/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";
import WorldEditor from "./WorldEditor";

export default function WorldList({ worlds, setWorlds, onWorldUpdated, onWorldDeleted }) {
    const user_id = localStorage.getItem("user_id");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedWorld, setSelectedWorld] = useState(null);
	const [showWorldEditor, setShowWorldEditor] = useState(false);

	const fetchWorlds = async () => {
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("access_token");
			const res = await axios.get(`${BACKEND_URL}/api/world/user/${user_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setWorlds(res.data);
		} catch (err) {
			setError("Failed to load worlds.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWorlds();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this world?")) return;
		try {
			const token = localStorage.getItem("access_token");
			await axios.delete(`${BACKEND_URL}/api/world/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setWorlds((prev) => prev.filter((w) => w.id !== id));
			onWorldDeleted && onWorldDeleted(id);
		} catch (err) {
			alert("Failed to delete world.");
		}
	};

	const handleEdit = (world) => {
		setSelectedWorld(world);
		setShowWorldEditor(true);
	};

	const handleWorldEditorClose = () => {
		setShowWorldEditor(false);
		setSelectedWorld(null);
	};

	const handleWorldEditorUpdated = (updatedWorld) => {
		onWorldUpdated && onWorldUpdated(updatedWorld);
		setShowWorldEditor(false);
		setSelectedWorld(null);
	};

	return (
		<>
			{loading ? (
				<div className="text-center text-gray-500">Loading...</div>
			) : error ? (
				<div className="text-center text-red-500">{error}</div>
			) : worlds.length === 0 ? (
				<div className="text-center text-gray-500">No worlds found.</div>
			) : (
				<ul className="space-y-4">
					{worlds.map((world) => (
						<li
							key={world.id}
							className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm hover:shadow transition"
						>
							<div>
								<div className="text-lg text-black dark:text-white font-semibold">{world.name}</div>
								{world.description && <div className="text-gray-600 dark:text-gray-300">{world.description}</div>}
								{world.lore && <div className="text-gray-500 dark:text-gray-200 text-sm mt-1">{world.lore}</div>}
							</div>
							<div className="flex gap-2 mt-3 md:mt-0">
								<button
									onClick={() => handleEdit(world)}
									className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(world.id)}
									className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
			{/* WorldEditor modal */}
			{showWorldEditor && selectedWorld && (
				<WorldEditor
					worldId={selectedWorld.id}
					initialWorld={selectedWorld}
					onClose={handleWorldEditorClose}
					onWorldUpdated={handleWorldEditorUpdated}
				/>
			)}
		</>
	);
}
