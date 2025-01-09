"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Importing icons
import AddPatientForm from '@/app/patients/page';

interface Patient {
    _id: string;
    name: string;
    roomNumber: string;
    bedNumber: string;
}

const PatientList: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get('/api/patients');
                setPatients(res.data);
            } catch (error) {
                toast.error("Failed to load patients.");
            }
        };
        fetchPatients();
    }, []);

    const deletePatient = async (id: string) => {
        try {
            await axios.delete(`/api/patients/${id}`);
            setPatients(patients.filter(patient => patient._id !== id));
            toast.success("Patient deleted.");
        } catch (error) {
            toast.error("Failed to delete patient.");
        }
    };

    const closeForm = () => {
        setIsFormOpen(false); // Close the form
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsFormOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center"
            >
                <FaPlusCircle className="mr-2" /> Add New Patient
            </button>

            {/* Background Blur and AddPatientForm */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                    onClick={closeForm}
                >
                    <div
                        className="form-container relative bg-white p-8 rounded-lg shadow-md w-96 max-w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                    >
                        <button
                            onClick={closeForm}
                            className="absolute top-2 right-2 text-gray-600"
                        >
                            X
                        </button>

                        {/* Add New Patient Form */}
                        <AddPatientForm closeForm={closeForm} />
                    </div>
                </div>

            )}

            {/* Patient List */}
            <ul className="mt-4">
                {patients.map(patient => (
                    <li
                        key={patient._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg"
                    >
                        <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p>Room: {patient.roomNumber}</p>
                            <p>Bed: {patient.bedNumber}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push(`/admin/patient/edit/${patient._id}`)}
                                className="text-blue-500 flex items-center space-x-2"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>
                            <button
                                onClick={() => deletePatient(patient._id)}
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

export default PatientList;
