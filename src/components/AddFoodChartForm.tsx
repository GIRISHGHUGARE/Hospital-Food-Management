"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface AddFoodChartFormProps {
    closeForm: () => void;
    foodChart?: FoodChart | null;
}

interface FoodChart {
    _id: string;
    patientId: string;
    morningMeal: string;
    eveningMeal: string;
    nightMeal: string;
    instructions: string[];
    ingredients: string[];
}

interface Patient {
    _id: string;
    name: string;
}

const AddFoodChartForm: React.FC<AddFoodChartFormProps> = ({ closeForm, foodChart }) => {
    const [formData, setFormData] = useState<FoodChart>({
        _id: "",
        patientId: "",
        morningMeal: "",
        eveningMeal: "",
        nightMeal: "",
        instructions: [],
        ingredients: [],
    });

    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get("/api/patients");
                setPatients(res.data);
            } catch {
                toast.error("Failed to load patients.");
            }
        };
        fetchPatients();

        if (foodChart) {
            setFormData(foodChart);
        }
    }, [foodChart]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, patientId: e.target.value });
    };

    const handleListChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: "instructions" | "ingredients"
    ) => {
        const newList = [...formData[field]];
        newList[index] = e.target.value;
        setFormData({ ...formData, [field]: newList });
    };

    const addNewField = (field: "instructions" | "ingredients") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeField = (index: number, field: "instructions" | "ingredients") => {
        const newList = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newList });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            if (foodChart) {
                response = await axios.put(`/api/foodCharts`, formData);
            } else {
                response = await axios.post("/api/foodCharts", formData);
            }

            if (response.status === 200 || response.status === 201) {
                toast.success(
                    foodChart ? "Food chart updated successfully" : "Food chart added successfully"
                );
                closeForm();
            }
        } catch {
            toast.error(foodChart ? "Failed to update food chart" : "Failed to add food chart");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
                {foodChart ? "Edit Food Chart" : "Add New Food Chart"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handlePatientChange}
                        required
                        className="border p-2 w-full rounded"
                    >
                        <option value="" disabled>
                            Select Patient
                        </option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="morningMeal"
                        placeholder="Morning Meal"
                        value={formData.morningMeal}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="eveningMeal"
                        placeholder="Evening Meal"
                        value={formData.eveningMeal}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="nightMeal"
                        placeholder="Night Meal"
                        value={formData.nightMeal}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />
                    {formData.instructions.map((instruction, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={instruction}
                                onChange={(e) => handleListChange(e, index, "instructions")}
                                placeholder="Instruction"
                                className="border p-2 w-full rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeField(index, "instructions")}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewField("instructions")}
                        className="bg-green-500 text-white py-1 px-4 rounded mt-2"
                    >
                        Add Instruction
                    </button>
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 ${loading ? "opacity-50" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : foodChart ? "Save Changes" : "Add Food Chart"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFoodChartForm;
