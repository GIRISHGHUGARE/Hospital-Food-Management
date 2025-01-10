"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUser, FaPhoneAlt, FaLocationArrow } from "react-icons/fa"; // Import necessary icons

interface AddPantryStaffFormProps {
    closeForm: () => void;
    staff: PantryStaff | null; // Optional staff prop for editing
}

interface PantryStaff {
    _id: string;
    staffName: string;
    contactInfo: string;
    location: string;
    assignedTasks: string[]; // Use string[] to store task IDs
    availability?: boolean;
    role?: "Preparation" | "Inventory" | "Delivery";
}

interface Delivery {
    mealBox: string;
}

const AddPantryStaffForm: React.FC<AddPantryStaffFormProps> = ({ closeForm, staff }) => {
    const router = useRouter();
    const [availableTasks, setAvailableTasks] = useState<string[]>([]);
    const [formData, setFormData] = useState<PantryStaff>({
        _id: "",
        staffName: "",
        contactInfo: "",
        location: "",
        assignedTasks: [],
        availability: true,
        role: "Preparation", // Default role
    });
    const [loading, setLoading] = useState(false);

    // Prefill form if editing
    useEffect(() => {
        if (staff) {
            setFormData(staff);
        }
    }, [staff]);

    // Fetch available tasks
    useEffect(() => {
        axios
            .get("/api/deliveries")
            .then((response) => {
                const deliveries: Delivery[] = response.data; // Use the Delivery type
                console.log("Deliveries:", deliveries); // Log to verify structure
                const mealBoxes = deliveries.map((delivery) => delivery.mealBox);
                setAvailableTasks(mealBoxes);
            })
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const isChecked = (e.target as HTMLInputElement).checked; // Narrow type to HTMLInputElement for checkboxes
            setFormData({
                ...formData,
                [name]: isChecked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { ...formData }; // Includes assignedTasks
            let response;
            if (staff) {
                response = await axios.put(`/api/pantry`, payload);
            } else {
                response = await axios.post("/api/pantry", payload);
            }

            if (response.status === 200 || response.status === 201) {
                toast.success(staff ? "Pantry staff updated successfully" : "Pantry staff added successfully");
                closeForm();
                router.push("/dashboard");
            }
        } catch {
            toast.error(staff ? "Failed to update pantry staff" : "Failed to add pantry staff");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">{staff ? "Edit Pantry Staff" : "Add New Pantry Staff"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    {/* Staff ID (non-editable) */}
                    {staff && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={staff._id}
                                disabled
                                className="border p-2 w-full rounded bg-gray-200"
                            />
                        </div>
                    )}

                    {/* Staff Name Input */}
                    <div className="flex items-center">
                        <FaUser className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="staffName"
                            placeholder="Staff Name"
                            value={formData.staffName}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Contact Info Input */}
                    <div className="flex items-center">
                        <FaPhoneAlt className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="contactInfo"
                            placeholder="Contact Information"
                            value={formData.contactInfo}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center">
                        <FaLocationArrow className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Availability Checkbox */}
                    <div className="flex items-center">
                        <label className="mr-2">Available:</label>
                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                            className="rounded"
                        />
                    </div>

                    {/* Role Dropdown */}
                    <div className="flex items-center">
                        <label className="mr-2">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                            required
                            className="border p-2 w-full rounded"
                        >
                            <option value="Preparation">Preparation</option>
                            <option value="Inventory">Inventory</option>
                            <option value="Delivery">Delivery</option>
                        </select>
                    </div>

                    {/* Assign Tasks */}
                    <div className="flex items-center">
                        <label className="mr-2">Assign Tasks:</label>
                        <select
                            name="assignedTasks"
                            value={formData.assignedTasks}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    assignedTasks: Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    ),
                                })
                            }
                            multiple
                            className="border p-2 w-full rounded"
                        >
                            {availableTasks.map((task) => (
                                <option key={task} value={task}>
                                    {task}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 ${loading ? "opacity-50" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : staff ? "Save Changes" : "Add Staff"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPantryStaffForm;
