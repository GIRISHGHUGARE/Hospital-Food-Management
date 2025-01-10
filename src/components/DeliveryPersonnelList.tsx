import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

interface Personnel {
    _id: string;
    name: string;
    contact: string;
    assignedTasks: string[];
}

interface ApiResponse {
    _id: string;
    staffName: string;
    contactInfo: string;
    assignedTasks?: string[];
}

const DeliveryPersonnelList: React.FC = () => {
    const [personnel, setPersonnel] = useState<Personnel[]>([]);
    const [newPersonnel, setNewPersonnel] = useState({ name: "", contact: "" });

    // Fetch pantry staff data from the API
    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await axios.get<ApiResponse[]>("/api/pantry");
                setPersonnel(
                    response.data.map((item) => ({
                        _id: item._id,
                        name: item.staffName,
                        contact: item.contactInfo,
                        assignedTasks: item.assignedTasks || [],
                    }))
                );
            } catch {
                toast.error("Failed to fetch pantry staff.");
            }
        };

        fetchPersonnel();
    }, []);

    // Add a new pantry staff member
    const addPersonnel = async () => {
        if (!newPersonnel.name || !newPersonnel.contact) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post<ApiResponse>("/api/pantry", {
                staffName: newPersonnel.name,
                contactInfo: newPersonnel.contact,
                location: "Default Location", // Replace with actual input if needed
                role: "Preparation", // Default role, can be dynamic
            });

            setPersonnel([
                ...personnel,
                {
                    _id: response.data._id,
                    name: response.data.staffName,
                    contact: response.data.contactInfo,
                    assignedTasks: response.data.assignedTasks || [],
                },
            ]);
            setNewPersonnel({ name: "", contact: "" });
            toast.success("Pantry staff added.");
        } catch {
            toast.error("Failed to add pantry staff.");
        }
    };

    // Delete a pantry staff member
    const deletePersonnel = async (id: string) => {
        try {
            await axios.delete("/api/pantry", { data: { id } });
            setPersonnel(personnel.filter((p) => p._id !== id));
            toast.success("Pantry staff removed.");
        } catch {
            toast.error("Failed to remove pantry staff.");
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Pantry Staff</h3>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newPersonnel.name}
                    onChange={(e) => setNewPersonnel({ ...newPersonnel, name: e.target.value })}
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={newPersonnel.contact}
                    onChange={(e) => setNewPersonnel({ ...newPersonnel, contact: e.target.value })}
                    className="p-2 border rounded mr-2"
                />
                <button onClick={addPersonnel} className="bg-blue-600 text-white p-2 rounded">
                    <FaPlusCircle />
                </button>
            </div>
            <ul>
                {personnel.map((p) => (
                    <li
                        key={p._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg"
                    >
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <p>Contact: {p.contact}</p>
                            <p>Assigned Tasks: {p.assignedTasks.length}</p>
                        </div>
                        <button
                            onClick={() => deletePersonnel(p._id)}
                            className="text-red-500 flex items-center space-x-2"
                        >
                            <FaTrashAlt /> <span>Remove</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeliveryPersonnelList;
