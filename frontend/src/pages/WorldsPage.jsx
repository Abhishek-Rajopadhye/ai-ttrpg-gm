import { useState } from "react";
import WorldList from "../components/WorldList";
import { Card, Button, Modal, ModalHeader, ModalBody, Label, TextInput, Textarea, Spinner, FloatingLabel } from "flowbite-react";
import axios from "axios";
import { BACKEND_URL } from "../config/const";

export default function WorldsPage() {
    const user_id = localStorage.getItem("user_id");
    const [showAdd, setShowAdd] = useState(false);
    const [worlds, setWorlds] = useState([]);
    const [addName, setAddName] = useState("");
    const [addType, setAddType] = useState("");
    const [addDescription, setAddDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    // Handler to add a new world to the list
    const handleWorldAdded = (newWorld) => {
        setWorlds((prev) => [...prev, newWorld]);
    };

    // Handler to update a world in the list
    const handleWorldUpdated = (updatedWorld) => {
        setWorlds((prev) => prev.map((w) => (w.id === updatedWorld.id ? updatedWorld : w)));
    };

    // Handler to remove a world from the list
    const handleWorldDeleted = (deletedId) => {
        setWorlds((prev) => prev.filter((w) => w.id !== deletedId));
    };

    const handleAddWorld = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaveError("");
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.post(
                `${BACKEND_URL}/api/world`,
                {
                    name: addName,
                    type: addType,
                    description: addDescription,
					by_user: user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            handleWorldAdded(res.data);
            setShowAdd(false);
            setAddName("");
            setAddType("");
            setAddDescription("");
        } catch (err) {
            setSaveError(
                err.response?.data?.detail || "Failed to add world. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen max-w-3xl mx-auto">
            <Card className="p-0">
                <div className="flex justify-between items-center mb-6 px-6 pt-6">
                    <h2 className="text-2xl text-black dark:text-white font-bold">Your Worlds</h2>
                    <Button color="blue" onClick={() => setShowAdd(true)}>
                        Add World
                    </Button>
                </div>
                <div className="px-6 pb-6">
                    <WorldList
                        worlds={worlds}
                        setWorlds={setWorlds}
                        onWorldUpdated={handleWorldUpdated}
                        onWorldDeleted={handleWorldDeleted}
                    />
                </div>
            </Card>
            <Modal show={showAdd} size="md" onClose={() => setShowAdd(false)}>
                <ModalHeader>Add New World</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleAddWorld} className="space-y-4">
                        <div>
                            <FloatingLabel variant="outlined" label="Name"
                                id="addName"
                                value={addName}
                                onChange={e => setAddName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <FloatingLabel variant="outlined" label="Type"
                                id="addType"
                                value={addType}
                                onChange={e => setAddType(e.target.value)}
                            />
                        </div>
                        <div>
                            <FloatingLabel variant="outlined" label="Description"
                                id="addDescription"
                                value={addDescription}
                                onChange={e => setAddDescription(e.target.value)}
                                rows={2}
                            />
                        </div>
                        {saveError && <div className="text-red-600">{saveError}</div>}
                        <div className="flex justify-end">
                            <Button color="gray" type="button" onClick={() => setShowAdd(false)} className="mr-2">
                                Cancel
                            </Button>
                            <Button color="blue" type="submit" disabled={saving}>
                                {saving ? <Spinner size="sm" /> : "Add"}
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}