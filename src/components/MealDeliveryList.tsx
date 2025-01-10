"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaUtensils, FaBed, FaClock, FaStickyNote } from "react-icons/fa";

interface Delivery {
    _id: string;
    patientId: string;
    mealBox: string;
    deliveryTime: Date;
    delivered: boolean;
    deliveryNotes: string;
    patientName: string; // Add patientName field
    bedNumber: string; // Add bed field
    roomNumber: string; // Add room field
}

interface Patient {
    _id: string;
    name: string;
    bedNumber: string;
    roomNumber: string;
}

const MealDeliveryList: React.FC = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch deliveries
                const deliveryRes = await axios.get("/api/deliveries");
                const deliveriesData = deliveryRes.data;

                // Fetch patients
                const patientRes = await axios.get("/api/patients");
                const patientsData = patientRes.data;

                // Map patient details to deliveries
                const updatedDeliveries = deliveriesData.map((delivery: Delivery) => {
                    const patient = patientsData.find((p: Patient) => p._id === delivery.patientId);
                    return {
                        ...delivery,
                        patientName: patient ? patient.name : "Unknown Patient",
                        bedNumber: patient ? patient.bedNumber : "Unknown Bed",
                        roomNumber: patient ? patient.roomNumber : "Unknown Room",
                    };
                });

                setDeliveries(updatedDeliveries);
            } catch {
                toast.error("Failed to load deliveries or patients.");
            }
        };
        fetchData();
    }, []);

    const updateDeliveryStatus = async (id: string, status: boolean) => {
        try {
            await axios.patch(`/api/deliveries/${id}`, { delivered: status });
            setDeliveries(deliveries.map(delivery =>
                delivery._id === id ? { ...delivery, delivered: status } : delivery
            ));
            toast.success("Delivery status updated.");
        } catch {
            toast.error("Failed to update delivery status.");
        }
    };

    return (
        <div>
            <ul className="mt-4">
                {deliveries.map(delivery => (
                    <li key={delivery._id} className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg">
                        <div>
                            {/* Patient Details */}
                            <h3 className="font-semibold flex items-center space-x-2">
                                <FaUtensils className="text-gray-500" />
                                <span>Meal Box: {delivery.mealBox}</span>
                            </h3>
                            <p className="flex items-center space-x-2">
                                <FaBed className="text-gray-500" />
                                <span><strong>Patient Name:</strong> {delivery.patientName}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaBed className="text-gray-500" />
                                <span><strong>Bed:</strong> {delivery.bedNumber}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaBed className="text-gray-500" />
                                <span><strong>Room:</strong> {delivery.roomNumber}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaClock className="text-gray-500" />
                                <span><strong>Delivery Time:</strong> {new Date(delivery.deliveryTime).toLocaleString()}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FaStickyNote className="text-gray-500" />
                                <span><strong>Notes:</strong> {delivery.deliveryNotes}</span>
                            </p>
                            <p className={`font-bold ${delivery.delivered ? "text-green-500" : "text-red-500"}`}>
                                <strong>Status:</strong> {delivery.delivered ? "Delivered" : "Pending"}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            {/* Mark as Delivered or Undelivered */}
                            <button
                                onClick={() => updateDeliveryStatus(delivery._id, !delivery.delivered)}
                                className={`flex items-center space-x-2 ${delivery.delivered ? "text-red-500" : "text-green-500"}`}
                            >
                                {delivery.delivered ? <FaTimesCircle /> : <FaCheckCircle />}
                                <span>Mark as {delivery.delivered ? "Undelivered" : "Delivered"}</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealDeliveryList;
