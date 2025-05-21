/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config/const";

function RowSection({ title, items, onAdd, loading, emptyLabel }) {
    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <Button color="blue" size="xs" onClick={onAdd} className="flex items-center gap-1">
                    <FaPlus /> Add
                </Button>
            </div>
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-24">
                        <Spinner size="lg" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-gray-100 italic px-2 py-6">{emptyLabel}</div>
                ) : (
                    <div className="flex gap-4">
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                className="min-w-[220px] max-w-xs flex-shrink-0"
                            >
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default function HomePage() {
    const user_id = localStorage.getItem("user_id");
    const [campaigns, setCampaigns] = useState([]);
    const [worlds, setWorlds] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState({
        campaigns: true,
        worlds: true,
        characters: true,
        items: true,
    });

    useEffect(() => {
        // Fetch campaigns
        const fetchCampaigns = async () => {
            setLoading((l) => ({ ...l, campaigns: true }));
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get(`${BACKEND_URL}/api/campaign/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCampaigns(res.data);
            } catch {
                setCampaigns([]);
            } finally {
                setLoading((l) => ({ ...l, campaigns: false }));
            }
        };

        // Fetch worlds
        const fetchWorlds = async () => {
            setLoading((l) => ({ ...l, worlds: true }));
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get(`${BACKEND_URL}/api/world/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWorlds(res.data);
            } catch {
                setWorlds([]);
            } finally {
                setLoading((l) => ({ ...l, worlds: false }));
            }
        };

        // Fetch characters
        const fetchCharacters = async () => {
            setLoading((l) => ({ ...l, characters: true }));
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get(`${BACKEND_URL}/api/character/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCharacters(res.data);
            } catch {
                setCharacters([]);
            } finally {
                setLoading((l) => ({ ...l, characters: false }));
            }
        };

        // Fetch items
        const fetchItems = async () => {
            setLoading((l) => ({ ...l, items: true }));
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get(`${BACKEND_URL}/api/item/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setItems(res.data);
            } catch {
                setItems([]);
            } finally {
                setLoading((l) => ({ ...l, items: false }));
            }
        };

        fetchCampaigns();
        fetchWorlds();
        fetchCharacters();
        fetchItems();
    }, []);

    return (
        <div className="max-w-screen mx-auto p-6 bg-gray-100 dark:bg-gray-600 text-black dark:text-white">
            <RowSection
                title="Campaigns"
                items={campaigns}
                loading={loading.campaigns}
                emptyLabel="No campaigns available."
                onAdd={() => alert("Add Campaign (not implemented)")}
            />
            <RowSection
                title="Worlds"
                items={worlds}
                loading={loading.worlds}
                emptyLabel="No worlds available."
                onAdd={() => alert("Add World (not implemented)")}
            />
            <RowSection
                title="Characters"
                items={characters}
                loading={loading.characters}
                emptyLabel="No characters available."
                onAdd={() => alert("Add Character (not implemented)")}
            />
            <RowSection
                title="Items"
                items={items}
                loading={loading.items}
                emptyLabel="No items available."
                onAdd={() => alert("Add Item (not implemented)")}
            />
        </div>
    );
}