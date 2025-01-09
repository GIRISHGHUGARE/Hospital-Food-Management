"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons

interface Delivery {
    _id: string;
    patientId: string;
    mealBox: string;
    deliveryTime: Date;
    delivered: boolean;
    deliveryNotes: string;
}

const MealDeliveryList: React.FC = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const res = await axios.get('/api/deliveries');
                setDeliveries(res.data);
            } catch (error) {
                toast.error("Failed to load deliveries.");
            }
        };
        fetchDeliveries();
    }, []);

    const updateDeliveryStatus = async (id: string, status: boolean) => {
        try {
            await axios.patch(`/api/deliveries/${id}`, { delivered: status });
            setDeliveries(deliveries.map(delivery =>
                delivery._id === id ? { ...delivery, delivered: status } : delivery
            ));
            toast.success("Delivery status updated.");
        } catch (error) {
            toast.error("Failed to update delivery status.");
        }
    };

    return (
        <div>
            <ul className="mt-4">
                {deliveries.map(delivery => (
                    <li key={delivery._id} className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg">
                        <div>
                            <h3 className="font-semibold">Meal Box: {delivery.mealBox}</h3>
                            <p>Patient ID: {delivery.patientId}</p>
                            <p>Delivery Time: {new Date(delivery.deliveryTime).toLocaleString()}</p>
                            <p>Status: {delivery.delivered ? "Delivered" : "Pending"}</p>
                            <p>Notes: {delivery.deliveryNotes}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => updateDeliveryStatus(delivery._id, !delivery.delivered)}
                                className={`flex items-center space-x-2 ${delivery.delivered ? 'text-red-500' : 'text-green-500'}`}
                            >
                                {delivery.delivered ? <FaTimesCircle /> : <FaCheckCircle />}
                                <span>Mark as {delivery.delivered ? 'Undelivered' : 'Delivered'}</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealDeliveryList;
