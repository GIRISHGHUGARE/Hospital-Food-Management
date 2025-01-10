"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    FaEdit,
    FaTrashAlt,
    FaPlusCircle,
    FaPhoneAlt,
    FaLocationArrow,
    FaTasks,
} from "react-icons/fa"; // Added Task Icon
import AddPantryStaffForm from "../app/pantry/page"; // Importing the form component

interface Task {
    _id: string;
    mealBox: string;
    preparationStatus: string;
    deliveryTime: Date;
    delivered: boolean;
}

interface PantryStaff {
    _id: string;
    staffName: string;
    contactInfo: string;
    location: string;
    assignedTasks: string[]; // Task Array
}

const PantryStaffList: React.FC = () => {
    const [staff, setStaff] = useState<PantryStaff[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<PantryStaff | null>(null);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]); // For task assignment
    const [assigningTask, setAssigningTask] = useState<string | null>(null); // Track staff being assigned a task
    const router = useRouter();

    // Fetch pantry staff list
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await axios.get("/api/pantry");
                setStaff(res.data);
            } catch (error) {
                toast.error("Failed to load pantry staff.");
            }
        };
        fetchStaff();
    }, []);

    // Delete pantry staff
    const deleteStaff = async (id: string) => {
        try {
            await axios.delete("/api/pantry", { data: { id } });
            setStaff(staff.filter((staffMember) => staffMember._id !== id));
            toast.success("Pantry staff deleted.");
        } catch (error) {
            toast.error("Failed to delete pantry staff.");
        }
    };

    // Open form to edit pantry staff
    const openFormForEdit = (staffMember: PantryStaff) => {
        setSelectedStaff(staffMember);
        setIsFormOpen(true);
    };

    // Close the form
    const closeForm = () => {
        setSelectedStaff(null);
        setIsFormOpen(false);
    };

    // Fetch tasks to assign
    const fetchTasks = async () => {
        try {
            const [deliveriesRes, foodChartsRes] = await Promise.all([
                axios.get("/api/deliveries"),
                axios.get("/api/foodCharts")
            ]);

            const deliveries = deliveriesRes.data || [];
            const foodCharts = foodChartsRes.data || [];

            // Assuming both are arrays
            setSelectedTasks([...deliveries, ...foodCharts]);
        } catch (error) {
            toast.error("Failed to load tasks or food charts.");
        }
    };


    // Assign task to staff
    const assignTask = async (staffId: string, taskId: string) => {
        try {
            const updatedTasks = [...(staff.find((st) => st._id === staffId)?.assignedTasks || []), taskId];
            const res = await axios.put("/api/pantry", {
                _id: staffId,
                assignedTasks: updatedTasks,
            });
            setStaff(staff.map((st) => (st._id === staffId ? res.data : st)));
            setAssigningTask(null);
            toast.success("Task assigned successfully.");
        } catch (error) {
            console.error("Error assigning task:", error); // Add this
            toast.error("Failed to assign task.");
        }
    };


    return (
        <div className="relative">
            {/* Add Pantry Staff Button */}
            <button
                onClick={() => setIsFormOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center"
            >
                <FaPlusCircle className="mr-2" /> Add New Pantry Staff
            </button>

            {/* Form Modal with Background Blur */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                    onClick={closeForm}
                >
                    <div
                        className="form-container relative bg-white p-8 rounded-lg shadow-md w-[800px] max-w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                    >
                        <AddPantryStaffForm closeForm={closeForm} staff={selectedStaff} />
                    </div>
                </div>
            )}

            {/* Pantry Staff List */}
            <ul className="mt-4">
                {staff.map((staffMember) => (
                    <li
                        key={staffMember._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg"
                    >
                        <div>
                            <h3 className="font-semibold">{staffMember.staffName}</h3>
                            <div className="flex items-center space-x-2">
                                <FaPhoneAlt className="text-gray-600" /> {/* Contact Icon */}
                                <p>Contact: {staffMember.contactInfo}</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <FaLocationArrow className="text-gray-600" /> {/* Location Icon */}
                                <p>Location: {staffMember.location}</p>
                            </div>
                            <div className="mt-2">
                                <strong>Assigned Tasks:</strong> {staffMember.assignedTasks.length > 0 ? staffMember.assignedTasks.join(", ") : "None"}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {/* Assign Task Button */}
                            <button
                                onClick={() => {
                                    fetchTasks();
                                    setAssigningTask(staffMember._id);
                                }}
                                className="text-green-500 flex items-center space-x-2"
                            >
                                <FaTasks /> <span>Assign Task</span>
                            </button>

                            {/* Task Assignment Dropdown */}
                            {assigningTask === staffMember._id && (
                                <select
                                    onChange={(e) => assignTask(staffMember._id, e.target.value)}
                                    className="bg-gray-100 p-2 rounded-lg mt-2"
                                >
                                    <option value="">Select a Task</option>
                                    {selectedTasks.map((task) => (
                                        <option key={task._id} value={task._id}>
                                            {task.mealBox} - {task.preparationStatus}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* Edit Button */}
                            <button
                                onClick={() => openFormForEdit(staffMember)} // Open form for editing
                                className="text-blue-500 flex items-center space-x-2"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteStaff(staffMember._id)}
                                className="text-red-500 flex items-center space-x-2"
                            >
                                <FaTrashAlt /> <span>Delete</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PantryStaffList;
