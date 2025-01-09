"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons from react-icons

interface FoodChart {
    _id: string;
    patientId: string;
    morningMeal: string;
    eveningMeal: string;
    nightMeal: string;
}

const FoodChartList: React.FC = () => {
    const [foodCharts, setFoodCharts] = useState<FoodChart[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchFoodCharts = async () => {
            try {
                const res = await axios.get('/api/foodCharts');
                setFoodCharts(res.data);
            } catch (error) {
                toast.error("Failed to load food charts.");
            }
        };
        fetchFoodCharts();
    }, []);

    const deleteFoodChart = async (id: string) => {
        try {
            await axios.delete(`/api/food-charts/${id}`);
            setFoodCharts(foodCharts.filter(chart => chart._id !== id));
            toast.success("Food chart deleted.");
        } catch (error) {
            toast.error("Failed to delete food chart.");
        }
    };

    return (
        <div>
            <button
                onClick={() => router.push('/admin/food-chart/create')}
                className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center"
            >
                Create Food Chart
            </button>
            <ul className="mt-4">
                {foodCharts.map(chart => (
                    <li key={chart._id} className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg">
                        <div>
                            <h3 className="font-semibold">Patient: {chart.patientId}</h3>
                            <p>Morning: {chart.morningMeal}</p>
                            <p>Evening: {chart.eveningMeal}</p>
                            <p>Night: {chart.nightMeal}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push(`/admin/food-chart/edit/${chart._id}`)}
                                className="text-blue-500 flex items-center space-x-2"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>
                            <button
                                onClick={() => deleteFoodChart(chart._id)}
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
