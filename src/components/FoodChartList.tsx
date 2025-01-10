"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    FaEdit,
    FaTrashAlt,
    FaPlusCircle,
    FaUtensils,
    FaSun,
    FaMoon,
    FaNotesMedical
} from "react-icons/fa";
import AddFoodChartForm from "../app/foodCharts/page"; // Importing the form component

interface FoodChart {
    _id: string;
    patientId: string;
    morningMeal: string;
    eveningMeal: string;
    nightMeal: string;
    instructions: string[];
    ingredients: string[];
    patientName: string; // Add patientName field to store patient's name
}

interface Patient {
    _id: string;
    name: string;
}

const FoodChartList: React.FC = () => {
    const [foodCharts, setFoodCharts] = useState<FoodChart[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]); // Store patients list
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedFoodChart, setSelectedFoodChart] = useState<FoodChart | null>(null);
    const router = useRouter();

    // Fetch food chart list
    useEffect(() => {
        const fetchFoodCharts = async () => {
            try {
                const foodChartRes = await axios.get("/api/foodCharts");
                const patientRes = await axios.get("/api/patients"); // Fetch patients list

                const patientsData: Patient[] = patientRes.data;
                const foodChartsData = foodChartRes.data;

                // Match patientId to patientName
                const updatedFoodCharts = foodChartsData.map((foodChart: FoodChart) => {
                    const patient = patientsData.find((p) => p._id === foodChart.patientId);
                    return {
                        ...foodChart,
                        patientName: patient ? patient.name : "Unknown Patient",
                    };
                });

                setFoodCharts(updatedFoodCharts);
                setPatients(patientsData);
            } catch (error) {
                toast.error("Failed to load food charts.");
            }
        };

        fetchFoodCharts();
    }, []);

    // Delete food chart
    const deleteFoodChart = async (id: string) => {
        try {
            await axios.delete("/api/foodcharts", { data: { id } });
            setFoodCharts(foodCharts.filter((foodChart) => foodChart._id !== id));
            toast.success("Food chart deleted.");
        } catch (error) {
            toast.error("Failed to delete food chart.");
        }
    };

    // Open form to edit food chart
    const openFormForEdit = (foodChart: FoodChart) => {
        setSelectedFoodChart(foodChart);
        setIsFormOpen(true);
    };

    // Close the form
    const closeForm = () => {
        setSelectedFoodChart(null);
        setIsFormOpen(false);
    };

    return (
        <div className="relative">
            {/* Add Food Chart Button */}
            <button
                onClick={() => setIsFormOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center"
            >
                <FaPlusCircle className="mr-2" /> Add New Food Chart
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
                        {/* Add/Edit Food Chart Form */}
                        <AddFoodChartForm closeForm={closeForm} foodChart={selectedFoodChart} />
                    </div>
                </div>
            )}

            {/* Food Chart List */}
            <ul className="mt-4">
                {foodCharts.map((foodChart) => (
                    <li
                        key={foodChart._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg"
                    >
                        <div>
                            {/* Display Patient Info with Icons */}
                            <p className="font-semibold flex items-center space-x-2">
                                <FaNotesMedical className="text-gray-500" />
                                <span>Patient: {foodChart.patientName}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaSun className="text-yellow-500" />
                                <span>Morning Meal: {foodChart.morningMeal}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaUtensils className="text-orange-500" />
                                <span>Evening Meal: {foodChart.eveningMeal}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaMoon className="text-purple-500" />
                                <span>Night Meal: {foodChart.nightMeal}</span>
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            {/* Edit Button */}
                            <button
                                onClick={() => openFormForEdit(foodChart)} // Open form for editing
                                className="text-blue-500 flex items-center space-x-2"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>
                            {/* Delete Button */}
                            <button
                                onClick={() => deleteFoodChart(foodChart._id)}
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

export default FoodChartList;
