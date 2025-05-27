import { useState, useEffect, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TextInput, Textarea, Alert, FileInput } from "flowbite-react";
import { FaTimes, FaSave, FaLayerGroup, FaTrash, FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { BACKEND_URL } from "../config/const";

const WorldEditor = ({ worldId, initialWorld = { name: "", type: "Main", description: "" }, onClose, onWorldUpdated }) => {
	const [worldData, setWorldData] = useState(initialWorld);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showMarkerModal, setShowMarkerModal] = useState(false);
	const [newMarker, setNewMarker] = useState({ name: "", type: "", description: "", lat: 0, lng: 0 });
	const [mapElements, setMapElements] = useState([]);
	const [leafletLoaded, setLeafletLoaded] = useState(false);
	const [layers, setLayers] = useState([
		{ id: "base", label: "Base Map", visible: true },
		{ id: "regions", label: "Regions", visible: true },
		{ id: "markers", label: "Markers", visible: true },
	]);
	const [imageFile, setImageFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(initialWorld?.map_image || "");
	const [imageDimensions, setImageDimensions] = useState({ width: 2000, height: 2000 });
	const [mapKey, setMapKey] = useState(0);

	const [sidebarOpen, setSidebarOpen] = useState({
		info: true,
		tools: false,
		layers: false,
		elements: true,
	});
	const [editElement, setEditElement] = useState(null);

	const mapRef = useRef(null);
	const mapInstanceRef = useRef(null);
	const drawControlRef = useRef(null);
	const drawnItemsRef = useRef(null);
	const [selectedElement, setSelectedElement] = useState(null);

	// Load Leaflet and Leaflet.draw
	useEffect(() => {
		const loadLeaflet = async () => {
			if (typeof window !== "undefined" && !window.L) {
				const leafletCSS = document.createElement("link");
				leafletCSS.rel = "stylesheet";
				leafletCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
				document.head.appendChild(leafletCSS);

				const drawCSS = document.createElement("link");
				drawCSS.rel = "stylesheet";
				drawCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css";
				document.head.appendChild(drawCSS);

				const leafletScript = document.createElement("script");
				leafletScript.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
				leafletScript.onload = () => {
					const drawScript = document.createElement("script");
					drawScript.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js";
					drawScript.onload = () => setLeafletLoaded(true);
					document.head.appendChild(drawScript);
				};
				document.head.appendChild(leafletScript);
			} else if (window.L) {
				setLeafletLoaded(true);
			}
		};
		loadLeaflet();
	}, []);
	useEffect(() => {
		if (!imageUrl) return;
		// Only update if the imageUrl is new or from DB and not already set
		const img = new window.Image();
		img.onload = () => {
			// Only update if dimensions are different
			if (imageDimensions.width !== img.width || imageDimensions.height !== img.height) {
				setImageDimensions({ width: img.width, height: img.height });
				setMapKey((k) => k + 1); // Force map remount if needed
			}
		};
		img.src = imageUrl;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageUrl]);
	// Initialize map
	useEffect(() => {
		if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;
		const L = window.L;
		const bounds = [
			[0, 0],
			[imageDimensions.height, imageDimensions.width],
		];
		const map = L.map(mapRef.current, {
			center: [imageDimensions.height / 2, imageDimensions.width / 2],
			zoom: 2,
			crs: L.CRS.Simple,
			minZoom: -2,
			maxZoom: 4,
			maxBounds: bounds,
		});
		map.fitBounds(bounds);
		map.setMaxBounds(bounds);

		// L.rectangle(bounds, {
		//     color: "#4ade80",
		//     fillColor: "#22c55e",
		//     fillOpacity: 0.3,
		//     weight: 0,
		// }).addTo(map);

		const drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		drawnItemsRef.current = drawnItems;

		const drawControl = new L.Control.Draw({
			position: "topright",
			draw: {
				polyline: false,
				polygon: {
					allowIntersection: false,
					drawError: {
						color: "#e1e100",
						message: "<strong>Error:</strong> shape edges cannot cross!",
					},
					shapeOptions: { color: "#97c93d" },
				},
				circle: { shapeOptions: { color: "#662d91" } },
				rectangle: { shapeOptions: { color: "#3388ff" } },
				marker: true,
				circlemarker: false,
			},
			edit: { featureGroup: drawnItems, remove: true },
		});

		map.addControl(drawControl);
		drawControlRef.current = drawControl;

		map.on(L.Draw.Event.CREATED, (e) => {
			const layer = e.layer;
			const type = e.layerType;
			if (type === "marker") {
				const latlng = layer.getLatLng();
				setNewMarker({
					name: "",
					type: "",
					description: "",
					lat: latlng.lat,
					lng: latlng.lng,
				});
				setShowMarkerModal(true);
			} else {
				drawnItems.addLayer(layer);
				const newElement = {
					id: Date.now(),
					type: type,
					name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${mapElements.length + 1}`,
					layer: layer,
					data: getLayerData(layer, type),
				};
				setMapElements((prev) => [...prev, newElement]);
			}
		});

		map.on(L.Draw.Event.EDITED, (e) => {
			const layers = e.layers;
			layers.eachLayer((layer) => {
				setMapElements((prev) =>
					prev.map((el) => {
						if (el.layer === layer) {
							return { ...el, data: getLayerData(layer, el.type) };
						}
						return el;
					})
				);
			});
		});

		map.on(L.Draw.Event.DELETED, (e) => {
			const layers = e.layers;
			layers.eachLayer((layer) => {
				setMapElements((prev) => prev.filter((el) => el.layer !== layer));
			});
		});

		mapInstanceRef.current = map;

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leafletLoaded, mapKey]);

	useEffect(() => {
		if (!leafletLoaded || !imageUrl || !mapInstanceRef.current) return;
		const L = window.L;
		const map = mapInstanceRef.current;
		if (map._imageOverlayLayer) {
			map.removeLayer(map._imageOverlayLayer);
			map._imageOverlayLayer = null;
		}
		const bounds = [
			[0, 0],
			[imageDimensions.height, imageDimensions.width],
		];
		const overlay = L.imageOverlay(imageUrl, bounds).addTo(map);
		map._imageOverlayLayer = overlay;
	}, [leafletLoaded, imageUrl, imageDimensions]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setImageFile(file);
		const url = URL.createObjectURL(file);
		setImageUrl(url);
		const img = new window.Image();
		img.onload = () => {
			setImageDimensions({ width: img.width, height: img.height });
			setMapKey((k) => k + 1);
		};
		img.src = url;
	};

	const getLayerData = (layer, type) => {
		const L = window.L;
		switch (type) {
			case "rectangle":
				return { bounds: layer.getBounds() };
			case "circle":
				return { center: layer.getLatLng(), radius: layer.getRadius() };
			case "polygon":
				return { latlngs: layer.getLatLngs() };
			default:
				return {};
		}
	};

	// Helper to rename file to worldId
	const getRenamedFile = (file, worldId) => {
		const ext = file.name.split(".").pop();
		return new File([file], `${worldId}.${ext}`, { type: file.type });
	};

	// Save world with image upload as FormData
	const handleSaveWorld = async () => {
		setIsLoading(true);
		setError("");
		setSuccess("");
		try {
			const serializedElements = mapElements.map((el) => ({
				id: el.id,
				type: el.type,
				name: el.name,
				data: el.data,
				markerType: el.markerType,
				description: el.description,
			}));

			let formData;
			let useFormData = false;

			if (imageFile) {
				const renamedFile = getRenamedFile(imageFile, worldId);
				formData = new FormData();
				formData.append("image", renamedFile);
				formData.append("name", worldData.name);
				formData.append("type", worldData.type);
				formData.append("description", worldData.description);
				formData.append("mapElements", JSON.stringify(serializedElements));
				formData.append("layers", JSON.stringify(layers.filter((l) => l.visible).map((l) => l.id)));
				useFormData = true;
			}

			let response;
			if (useFormData) {
				response = await fetch(`${BACKEND_URL}/api/world/${worldId}`, {
					method: "PUT",
					body: formData,
				});
			} else {
				response = await fetch(`${BACKEND_URL}/api/world/${worldId}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...worldData,
						mapElements: serializedElements,
						layers: layers.filter((l) => l.visible).map((l) => l.id),
					}),
				});
			}

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const updatedWorld = await response.json();
			setSuccess("World saved successfully!");
			if (onWorldUpdated) onWorldUpdated(updatedWorld);
			setTimeout(() => setSuccess(""), 3000);
		} catch (err) {
			setError(`Failed to save world: ${err.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const addMarker = () => {
		if (!newMarker.name || !mapInstanceRef.current) return;
		const L = window.L;
		const customIcon = L.divIcon({
			className: "custom-marker",
			html: `<div style="background-color: #2563eb; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); font-size: 12px;">📍</div>`,
			iconSize: [25, 25],
			iconAnchor: [12, 12],
		});
		const marker = L.marker([newMarker.lat, newMarker.lng], { icon: customIcon }).bindPopup(
			`<strong>${newMarker.name}</strong><br/>${newMarker.description || "No description"}<br/>Type: ${
				newMarker.type || "N/A"
			}`
		);
		drawnItemsRef.current.addLayer(marker);
		const newElement = {
			id: Date.now(),
			type: "marker",
			name: newMarker.name,
			markerType: newMarker.type,
			description: newMarker.description,
			layer: marker,
			data: {
				latlng: [newMarker.lat, newMarker.lng],
				markerType: newMarker.type,
			},
		};
		setMapElements((prev) => [...prev, newElement]);
		setShowMarkerModal(false);
		setNewMarker({ name: "", type: "", description: "", lat: 0, lng: 0 });
	};

	const deleteElement = (id) => {
		const element = mapElements.find((el) => el.id === id);
		if (element && element.layer && drawnItemsRef.current) {
			drawnItemsRef.current.removeLayer(element.layer);
		}
		setMapElements(mapElements.filter((el) => el.id !== id));
		setSelectedElement(null);
	};

	const selectElement = (element) => {
		setSelectedElement(element);
		if (element.layer && mapInstanceRef.current) {
			if (element.type === "marker") {
				mapInstanceRef.current.setView(element.layer.getLatLng(), mapInstanceRef.current.getZoom());
			} else if (element.data.bounds) {
				mapInstanceRef.current.fitBounds(element.data.bounds);
			} else if (element.data.center) {
				mapInstanceRef.current.setView(element.data.center, mapInstanceRef.current.getZoom());
			}
		}
	};

	// Accordion toggles
	const toggleAccordion = (key) => setSidebarOpen((s) => ({ ...s, [key]: !s[key] }));

	// Edit map element handlers
	const handleEditElement = (element) => {
		setEditElement({
			id: element.id,
			name: element.name,
			type: element.markerType || element.type,
			description: element.description || "",
		});
	};
	const handleEditElementSave = () => {
		setMapElements((prev) =>
			prev.map((el) =>
				el.id === editElement.id
					? {
							...el,
							name: editElement.name,
							markerType: el.type === "marker" ? editElement.type : undefined,
							type: el.type === "marker" ? "marker" : editElement.type,
							description: editElement.description,
					  }
					: el
			)
		);
		setEditElement(null);
	};
	const handleEditElementCancel = () => setEditElement(null);

	const toggleLayer = (layerId) => {
		setLayers((prev) => prev.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l)));
	};

	if (!leafletLoaded) {
		return (
			<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p>Loading map editor...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-screen flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-xl font-bold text-gray-900">World Editor - {worldData.name}</h2>
					<div className="flex gap-2">
						<Button onClick={handleSaveWorld} disabled={isLoading} color="blue">
							<FaSave className="w-4 h-4 mr-2" />
							{isLoading ? "Saving..." : "Save World"}
						</Button>
						<Button onClick={onClose} color="gray">
							<FaTimes className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Alerts */}
				{error && (
					<Alert color="failure" className="m-4">
						{error}
					</Alert>
				)}
				{success && (
					<Alert color="success" className="m-4">
						{success}
					</Alert>
				)}

				{/* Content */}
				<div className="flex-1 flex ">
					{/* Sidebar */}
					<div className="w-80 border-r bg-gray-50 flex flex-col overflow-y-scroll ">
						{/* Accordion Sidebar */}
						<div className="divide-y">
							{/* World Info */}
							<div>
								<button
									className="w-full flex items-center justify-between py-3 px-4 font-semibold text-left"
									onClick={() => toggleAccordion("info")}
								>
									<span>World Information</span>
									{sidebarOpen.info ? <FaChevronUp /> : <FaChevronDown />}
								</button>
								{sidebarOpen.info && (
									<div className="space-y-3 px-4 pb-4">
										<TextInput
											placeholder="World Name"
											value={worldData.name}
											onChange={(e) => setWorldData({ ...worldData, name: e.target.value })}
										/>
										<TextInput
											placeholder="World Type"
											value={worldData.type}
											onChange={(e) => setWorldData({ ...worldData, type: e.target.value })}
										/>
										<Textarea
											placeholder="World Description"
											rows={3}
											value={worldData.description}
											onChange={(e) => setWorldData({ ...worldData, description: e.target.value })}
										/>
										<FileInput
											accept="image/*"
											onChange={handleImageChange}
											helperText="Upload a map image to overlay on the world"
										/>
										{imageUrl && (
											<div className="mt-2">
												<img
													src={imageUrl}
													alt="Map Overlay Preview"
													className="rounded shadow max-h-32 mx-auto"
												/>
											</div>
										)}
									</div>
								)}
							</div>
							{/* Drawing Tools */}
							<div>
								<button
									className="w-full flex items-center justify-between py-3 px-4 font-semibold text-left"
									onClick={() => toggleAccordion("tools")}
								>
									<span>Drawing Tools</span>
									{sidebarOpen.tools ? <FaChevronUp /> : <FaChevronDown />}
								</button>
								{sidebarOpen.tools && (
									<div className="text-sm text-gray-600 px-4 pb-4">
										<p className="mb-2">Use the drawing controls on the map to:</p>
										<ul className="space-y-1 text-xs">
											<li>• Click marker tool to add locations</li>
											<li>• Draw rectangles for regions</li>
											<li>• Draw circles for areas of influence</li>
											<li>• Draw polygons for custom shapes</li>
											<li>• Use edit tool to modify shapes</li>
											<li>• Use delete tool to remove elements</li>
										</ul>
									</div>
								)}
							</div>
							{/* Layers */}
							<div>
								<button
									className="w-full flex items-center justify-between py-3 px-4 font-semibold text-left"
									onClick={() => toggleAccordion("layers")}
								>
									<span className="flex items-center">
										<FaLayerGroup className="w-4 h-4 mr-2" />
										Layers
									</span>
									{sidebarOpen.layers ? <FaChevronUp /> : <FaChevronDown />}
								</button>
								{sidebarOpen.layers && (
									<div className="space-y-2 px-4 pb-4">
										{layers.map((layer) => (
											<label key={layer.id} className="flex items-center">
												<input
													type="checkbox"
													checked={layer.visible}
													onChange={() => toggleLayer(layer.id)}
													className="mr-2"
												/>
												<span className="text-sm">{layer.label}</span>
											</label>
										))}
									</div>
								)}
							</div>
							{/* Map Elements */}
							<div>
								<button
									className="w-full flex items-center justify-between py-3 px-4 font-semibold text-left"
									onClick={() => toggleAccordion("elements")}
								>
									<span>Map Elements ({mapElements.length})</span>
									{sidebarOpen.elements ? <FaChevronUp /> : <FaChevronDown />}
								</button>
								{sidebarOpen.elements && (
									<div className="space-y-2 px-4 pb-4">
										{mapElements.map((element) => (
											<div
												key={element.id}
												className={`p-2 rounded border cursor-pointer flex items-center justify-between ${
													selectedElement?.id === element.id
														? "bg-blue-100 border-blue-300"
														: "bg-white hover:bg-gray-50"
												}`}
												onClick={() => selectElement(element)}
											>
												<div className="flex-1 min-w-0">
													<div className="font-medium text-sm truncate">{element.name}</div>
													<div className="text-xs text-gray-500 capitalize flex items-center">
														{element.type === "marker" && element.markerType && (
															<>
																<span className="ml-1">{element.markerType}</span>
															</>
														)}
														{element.type !== "marker" && element.type}
													</div>
												</div>
												<div className="flex gap-1">
													<Button
														size="xs"
														color="gray"
														onClick={(e) => {
															e.stopPropagation();
															handleEditElement(element);
														}}
													>
														<FaEdit className="w-3 h-3" />
													</Button>
													<Button
														size="xs"
														color="red"
														onClick={(e) => {
															e.stopPropagation();
															deleteElement(element.id);
														}}
													>
														<FaTrash className="w-3 h-3" />
													</Button>
												</div>
											</div>
										))}
										{mapElements.length === 0 && (
											<div className="text-center text-gray-500 text-sm py-4">
												No elements added yet.
												<br />
												Use the drawing tools to get started!
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Map Area */}
					<div className="flex-1 relative">
						<div key={mapKey} ref={mapRef} className="w-full h-full" style={{ minHeight: "500px" }} />
					</div>
				</div>

				{/* Edit Map Element Modal */}
				<Modal show={!!editElement} onClose={handleEditElementCancel}>
					<ModalHeader>Edit Map Element</ModalHeader>
					<ModalBody>
						<div className="space-y-4">
							<TextInput
								placeholder="Name"
								value={editElement?.name || ""}
								onChange={(e) => setEditElement((prev) => ({ ...prev, name: e.target.value }))}
							/>
							<TextInput
								placeholder="Type"
								value={editElement?.type || ""}
								onChange={(e) => setEditElement((prev) => ({ ...prev, type: e.target.value }))}
							/>
							<Textarea
								placeholder="Description (optional)"
								rows={3}
								value={editElement?.description || ""}
								onChange={(e) => setEditElement((prev) => ({ ...prev, description: e.target.value }))}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleEditElementSave} disabled={!editElement?.name}>
							Save
						</Button>
						<Button color="gray" onClick={handleEditElementCancel}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>

				{/* Add Marker Modal */}
				<Modal show={showMarkerModal} onClose={() => setShowMarkerModal(false)}>
					<ModalHeader>Add New Marker</ModalHeader>
					<ModalBody>
						<div className="space-y-4">
							<TextInput
								placeholder="Marker Name"
								value={newMarker.name}
								onChange={(e) => setNewMarker({ ...newMarker, name: e.target.value })}
							/>
							<TextInput
								placeholder="Marker Type"
								value={newMarker.type}
								onChange={(e) => setNewMarker({ ...newMarker, type: e.target.value })}
							/>
							<Textarea
								placeholder="Description (optional)"
								rows={3}
								value={newMarker.description}
								onChange={(e) => setNewMarker({ ...newMarker, description: e.target.value })}
							/>
							<div className="text-sm text-gray-600">
								Position: [{newMarker.lat.toFixed(2)}, {newMarker.lng.toFixed(2)}]
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onClick={addMarker} disabled={!newMarker.name}>
							Add Marker
						</Button>
						<Button color="gray" onClick={() => setShowMarkerModal(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
};

export default WorldEditor;
