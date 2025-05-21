/* eslint-disable no-unused-vars */
import { MapContainer, ImageOverlay, Marker, Polygon, useMapEvents } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";

// Helper modal for details input
function DetailsModal({ title, fields, onSubmit, onCancel }) {
	const [values, setValues] = useState(Object.fromEntries(fields.map((f) => [f.name, ""])));
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-bold mb-4">{title}</h3>
				{fields.map((f) => (
					<div key={f.name} className="mb-3">
						<label className="block text-sm font-medium mb-1">{f.label}</label>
						<input
							type="text"
							value={values[f.name]}
							onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
							className="w-full border border-gray-300 rounded px-3 py-2"
							required={f.required}
						/>
					</div>
				))}
				<div className="flex gap-2 justify-end">
					<button className="px-4 py-1 bg-gray-200 rounded" onClick={onCancel}>
						Cancel
					</button>
					<button className="px-4 py-1 bg-blue-600 text-white rounded" onClick={() => onSubmit(values)}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default function WorldMapModal({ imageUrl, imageFile, areas, setAreas, pois, setPois, onClose }) {
    const [drawingArea, setDrawingArea] = useState(false);
    const [currentArea, setCurrentArea] = useState([]);
    const [drawingPOI, setDrawingPOI] = useState(false);
    const [pendingPOI, setPendingPOI] = useState(null);
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [showPOIModal, setShowPOIModal] = useState(false);
    const [areaCoords, setAreaCoords] = useState([]);
    const [imageSize, setImageSize] = useState({ width: 3000, height: 1000 });
    const [mapKey, setMapKey] = useState(0); // To force re-render
    const [editAreaIdx, setEditAreaIdx] = useState(null);
    const [editPOIIdx, setEditPOIIdx] = useState(null);

	// Get image dimensions
    useEffect(() => {
        if (imageUrl) {
            const img = new window.Image();
            img.onload = () => {
                setImageSize({ width: img.width, height: img.height });
                setMapKey((k) => k + 1); // force MapContainer to re-render with new bounds/center
            };
            img.src = imageUrl;
        }
	}, [imageUrl]);


	// Set bounds for the image based on its dimensions
    const bounds = [
        [0, 0],
        [imageSize.height, imageSize.width],
    ];

	function MapClickHandler() {
		useMapEvents({
			click(e) {
				const { lat, lng } = e.latlng;
				// Limit to image bounds
				if (lat < 0 || lat > imageSize.height || lng < 0 || lng > imageSize.width) return;

				if (drawingArea) {
					setCurrentArea((prev) => [...prev, [lat, lng]]);
				}
				if (drawingPOI) {
					setPendingPOI({ lat, lng });
					setDrawingPOI(false);
					setShowPOIModal(true);
				}
			},
		});
		return null;
	}

	// When finishing area, ask for details
	const finishArea = () => {
		if (currentArea.length > 2) {
			setAreaCoords(currentArea);
			setShowAreaModal(true);
		}
		setDrawingArea(false);
	};
	// Edit Area
	const handleEditArea = (idx) => {
		setAreaCoords(areas[idx].boundary.coordinates[0].map(([lng, lat]) => [lat, lng]));
		setEditAreaIdx(idx);
		setShowAreaModal(true);
	};
	// Save edited area
	const handleAreaDetails = (values) => {
		const newArea = {
			id: values.id,
			name: values.name,
			type: values.type || "continent",
			description: values.description,
			boundary: {
				type: "Polygon",
				coordinates: [areaCoords.map(([lat, lng]) => [lng, lat])],
			},
			pois: [],
		};
		if (editAreaIdx !== null) {
			const updated = [...areas];
			updated[editAreaIdx] = newArea;
			setAreas(updated);
			setEditAreaIdx(null);
		} else {
			setAreas([...areas, newArea]);
		}
		setCurrentArea([]);
		setAreaCoords([]);
		setShowAreaModal(false);
	};
	// Remove Area
	const handleRemoveArea = (idx) => {
		setAreas(areas.filter((_, i) => i !== idx));
	};

	// Edit POI
	const handleEditPOI = (idx) => {
		setPendingPOI({
			lat: pois[idx].location.coordinates[1],
			lng: pois[idx].location.coordinates[0],
		});
		setEditPOIIdx(idx);
		setShowPOIModal(true);
	};
	// Save edited POI
	const handlePOIDetails = (values) => {
		const newPOI = {
			id: values.id,
			name: values.name,
			type: values.type || "city",
			description: values.description,
			location: {
				type: "Point",
				coordinates: [pendingPOI.lng, pendingPOI.lat],
			},
		};
		if (editPOIIdx !== null) {
			const updated = [...pois];
			updated[editPOIIdx] = newPOI;
			setPois(updated);
			setEditPOIIdx(null);
		} else {
			setPois([...pois, newPOI]);
		}
		setPendingPOI(null);
		setShowPOIModal(false);
	};
	// Remove POI
	const handleRemovePOI = (idx) => {
		setPois(pois.filter((_, i) => i !== idx));
	};
	// Calculate center for the map
	const center = [imageSize.height / 2, imageSize.width / 2];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative flex flex-col"
				style={{ maxHeight: "95vh" }}
			>
				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
					onClick={onClose}
					aria-label="Close"
				>
					&times;
				</button>
				<h3 className="text-lg font-bold mb-2">Mark Areas & POIs</h3>
				<div className="mb-2 flex gap-2">
					<button
						className="bg-blue-600 text-white px-3 py-1 rounded"
						onClick={() => {
							setDrawingArea(true);
							setDrawingPOI(false);
							setCurrentArea([]);
						}}
						disabled={drawingArea}
					>
						{drawingArea ? "Drawing Area..." : "Draw Area"}
					</button>
					<button
						className="bg-green-600 text-white px-3 py-1 rounded"
						onClick={() => {
							setDrawingPOI(true);
							setDrawingArea(false);
						}}
						disabled={drawingPOI}
					>
						{drawingPOI ? "Click on map for POI" : "Add POI"}
					</button>
					{drawingArea && (
						<button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={finishArea}>
							Finish Area
						</button>
					)}
					<button className="bg-purple-600 text-white px-3 py-1 rounded ml-auto" onClick={onClose}>
						Finish Adding Areas & POIs
					</button>
				</div>
				<div style={{ width: "100%", height: 500 }}>
                    <MapContainer
                        crs={L.CRS.Simple}
                        bounds={bounds}
                        style={{ height: 500, width: "100%" }}
                        minZoom={-2}
                        maxZoom={2}
                        zoom={0}
                        center={[imageSize.height / 2, imageSize.width / 2]}
                        maxBounds={bounds}
                        maxBoundsViscosity={1.0}
                    >
                        <ImageOverlay url={imageUrl} bounds={bounds} />
                        <MapClickHandler />
                        {areas.map((area, idx) => (
                            <Polygon
                                key={idx}
                                positions={area.boundary.coordinates[0].map(([lng, lat]) => [lat, lng])}
                                pathOptions={{ color: "blue" }}
                                eventHandlers={{
                                    click: () => handleEditArea(idx),
                                    contextmenu: (e) => {
                                        e.originalEvent.preventDefault();
                                        handleRemoveArea(idx);
                                    },
                                }}
                            />
                        ))}
                        {currentArea.length > 0 && (
                            <Polygon
                                positions={currentArea}
                                pathOptions={{ color: "red", dashArray: "4" }}
                            />
                        )}
                        {pois.map((poi, idx) => (
                            <Marker
                                key={idx}
                                position={[poi.location.coordinates[1], poi.location.coordinates[0]]}
                                icon={L.icon({
                                    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                })}
                                eventHandlers={{
                                    click: () => handleEditPOI(idx),
                                    contextmenu: (e) => {
                                        e.originalEvent.preventDefault();
                                        handleRemovePOI(idx);
                                    },
                                }}
                            />
                        ))}
                    </MapContainer>
                </div>
                <div className="mt-4 flex gap-8">
                    <div>
                        <div className="font-semibold mb-1">Areas</div>
                        <ul className="text-xs space-y-1">
                            {areas.map((a, idx) => (
                                <li key={a.id || idx} className="flex items-center gap-2">
                                    <span>{a.name}</span>
                                    <button className="text-blue-600" onClick={() => handleEditArea(idx)}>Edit</button>
                                    <button className="text-red-600" onClick={() => handleRemoveArea(idx)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold mb-1">POIs</div>
                        <ul className="text-xs space-y-1">
                            {pois.map((p, idx) => (
                                <li key={p.id || idx} className="flex items-center gap-2">
                                    <span>{p.name}</span>
                                    <button className="text-blue-600" onClick={() => handleEditPOI(idx)}>Edit</button>
                                    <button className="text-red-600" onClick={() => handleRemovePOI(idx)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
				<div className="mt-2 text-sm text-gray-600">
					Click "Draw Area" and click on the map to add points. Click "Finish Area" to save.
					<br />
					Click "Add POI" and then click on the map to add a POI.
					<br />
					Click "Finish Adding Areas & POIs" when done.
				</div>
			</div>
			{/* Area details modal */}
            {showAreaModal && (
                <DetailsModal
                    title="Area Details"
                    fields={[
                        { name: "id", label: "ID", required: true },
                        { name: "name", label: "Name", required: true },
                        { name: "type", label: "Type (e.g. continent, country, etc)", required: false },
                        { name: "description", label: "Description", required: false },
                    ]}
                    onSubmit={handleAreaDetails}
                    onCancel={() => { setShowAreaModal(false); setCurrentArea([]); setEditAreaIdx(null); }}
                />
            )}
            {/* POI details modal */}
            {showPOIModal && (
                <DetailsModal
                    title="POI Details"
                    fields={[
                        { name: "id", label: "ID", required: true },
                        { name: "name", label: "Name", required: true },
                        { name: "type", label: "Type (e.g. city, monument, etc)", required: false },
                        { name: "description", label: "Description", required: false },
                    ]}
                    onSubmit={handlePOIDetails}
                    onCancel={() => { setShowPOIModal(false); setPendingPOI(null); setEditPOIIdx(null); }}
                />
            )}
        </div>
	);
}
