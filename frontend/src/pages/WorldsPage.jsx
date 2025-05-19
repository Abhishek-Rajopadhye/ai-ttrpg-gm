import { useState } from "react";
import WorldList from "../components/WorldList";
import AddWorldModal from "../components/AddWorld";

export default function WorldsPage() {
    const [showAdd, setShowAdd] = useState(false);
    const [worlds, setWorlds] = useState([]);

    // Handler to add a new world to the list
    const handleWorldAdded = (newWorld) => {
        setWorlds((prev) => [...prev, newWorld]);
    };

    // Handler to update a world in the list
    const handleWorldUpdated = (updatedWorld) => {
        setWorlds((prev) =>
            prev.map((w) => (w.id === updatedWorld.id ? updatedWorld : w))
        );
    };

    // Handler to remove a world from the list
    const handleWorldDeleted = (deletedId) => {
        setWorlds((prev) => prev.filter((w) => w.id !== deletedId));
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Worlds</h2>
                <button
                    onClick={() => setShowAdd(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add World
                </button>
            </div>
            <WorldList
                worlds={worlds}
                setWorlds={setWorlds}
                onWorldUpdated={handleWorldUpdated}
                onWorldDeleted={handleWorldDeleted}
            />
            <AddWorldModal
                isOpen={showAdd}
                onClose={() => setShowAdd(false)}
                onWorldAdded={(world) => {
                    handleWorldAdded(world);
                    setShowAdd(false);
                }}
            />
        </div>
    );
}