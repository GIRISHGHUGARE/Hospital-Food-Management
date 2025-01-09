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
    const [patients, setPatients] = useState<Patient[]>([]); // Store patients list
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch deliveries
                const deliveryRes = await axios.get('/api/deliveries');
                const deliveriesData = deliveryRes.data;

                // Fetch patients
                const patientRes = await axios.get('/api/patients');
                const patientsData = patientRes.data;

                // Map patient details to deliveries
                const updatedDeliveries = deliveriesData.map((delivery: Delivery) => {
                    const patient = patientsData.find((p: Patient) => p._id === delivery.patientId);
                    return {
                        ...delivery,
                        patientName: patient ? patient.name : 'Unknown Patient',
                        bedNumber: patient ? patient.bedNumber : 'Unknown Bed',
                        roomNumber: patient ? patient.roomNumber : 'Unknown Room',
                    };
                });

                setDeliveries(updatedDeliveries);
                setPatients(patientsData);
            } catch (error) {
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
                            {/* Patient Details */}
                            <h3 className="font-semibold">Meal Box: {delivery.mealBox}</h3>
                            <p><strong>Patient Name:</strong> {delivery.patientName}</p>
                            <p><strong>Bed:</strong> {delivery.bedNumber}</p>
                            <p><strong>Room:</strong> {delivery.roomNumber}</p>
                            <p><strong>Delivery Time:</strong> {new Date(delivery.deliveryTime).toLocaleString()}</p>
                            <p><strong>Status:</strong> {delivery.delivered ? "Delivered" : "Pending"}</p>
                            <p><strong>Notes:</strong> {delivery.deliveryNotes}</p>
                        </div>
                        <div className="flex space-x-4">
                            {/* Mark as Delivered or Undelivered */}
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
