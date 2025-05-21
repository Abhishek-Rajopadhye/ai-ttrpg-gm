import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";
import WorldMapModal from "./WorldMapModal";

export default function AddWorld({ isOpen, onClose, onWorldAdded }) {
	const [name, setName] = useState("");
	const [type, setType] = useState("main_world");
	const [description, setDescription] = useState("");
	const [mapImage, setMapImage] = useState(null);
	const [mapImageUrl, setMapImageUrl] = useState("");
	const [areas, setAreas] = useState([]);
	const [pois, setPois] = useState([]);
	const [showMapModal, setShowMapModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function fileToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result.split(",")[1]); // remove data:image/...;base64,
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setMapImage(file);
		setMapImageUrl(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("access_token");
			const formData = new FormData();
			formData.append("name", name);
			formData.append("type", type);
			formData.append("description", description);
			const base64Image = mapImage ? await fileToBase64(mapImage) : "";
			formData.append("map_image", base64Image);
			formData.append("areas", JSON.stringify(areas));
			formData.append("pois", JSON.stringify(pois));
			// Add other fields as needed

			const res = await axios.post(`${BACKEND_URL}/api/world/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			setName("");
			setType("main_world");
			setDescription("");
			setMapImage(null);
			setMapImageUrl("");
			setAreas([]);
			setPois([]);
			onWorldAdded && onWorldAdded(res.data);
			onClose();
		} catch (err) {
			setError(err.response?.data?.detail || "Failed to add world. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
					onClick={onClose}
					aria-label="Close"
				>
					&times;
				</button>
				<h2 className="text-xl font-bold mb-4 text-center">Add New World</h2>
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
						<label className="block text-sm font-medium mb-1">Type</label>
						<input
							value={type}
							onChange={(e) => setType(e.target.value)}
							className="w-full border border-gray-300 rounded px-3 py-2"
						>
						</input>
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
						<label className="block text-sm font-medium mb-1">Map Image</label>
						<input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
						{mapImage && (
							<div className="mt-2">
								<img src={mapImageUrl} alt="Map Preview" className="max-h-48 mx-auto rounded shadow" />
								<button
									type="button"
									className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
									onClick={() => setShowMapModal(true)}
								>
									Add Areas & POIs
								</button>
							</div>
						)}
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
					>
						{loading ? "Adding..." : "Add World"}
					</button>
				</form>
				{showMapModal && mapImage && (
					<WorldMapModal
						imageUrl={mapImageUrl}
						imageFile={mapImage}
						areas={areas}
						setAreas={setAreas}
						pois={pois}
						setPois={setPois}
						onClose={() => setShowMapModal(false)}
					/>
				)}
			</div>
		</div>
	);
}
