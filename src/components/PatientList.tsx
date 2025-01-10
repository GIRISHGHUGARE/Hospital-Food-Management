"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaBed, FaHospitalAlt, } from 'react-icons/fa'; // Importing icons
import AddPatientForm from '@/components/AddPatientForm';

interface Patient {
    _id: string;
    name: string;
    diseases?: string;
    allergies?: string;
    roomNumber: string;
    bedNumber: string;
    floorNumber: string;
    age: string;
    gender: string;
    contactInfo: string;
    emergencyContact: string;
    otherDetails?: string;
}

const PatientList: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get('/api/patients');
                setPatients(res.data);
            } catch {
                toast.error("Failed to load patients.");
            }
        };
        fetchPatients();
    }, []);

    const deletePatient = async (id: string) => {
        try {
            // Send the ID in the request body as per your backend structure
            await axios.delete('/api/patients', { data: { id } });  // Use `data` to send body in DELETE request
            setPatients(patients.filter(patient => patient._id !== id));  // Remove the patient from the list
            toast.success("Patient deleted.");
        } catch {
            toast.error("Failed to delete patient.");
        }
    };


    const openFormForEdit = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setSelectedPatient(null);
        setIsFormOpen(false);
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
                        className="form-container relative bg-white p-8 rounded-lg shadow-md w-[800px] max-w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                    >
                        {/* Add or Edit Patient Form */}
                        <AddPatientForm closeForm={closeForm} patient={selectedPatient} />
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
                            <div className="flex items-center space-x-2">
                                <FaHospitalAlt className="text-gray-600" /> {/* Room Icon */}
                                <p>Room: {patient.roomNumber}</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <FaBed className="text-gray-600" /> {/* Bed Icon */}
                                <p>Bed: {patient.bedNumber}</p>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => openFormForEdit(patient)} // Open form for editing
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

