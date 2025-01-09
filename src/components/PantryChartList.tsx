"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa'; // Importing icons
import AddPantryStaffForm from '../app/pantry/page'; // Importing the form component

interface PantryStaff {
    _id: string;
    staffName: string;
    contactInfo: string;
    location: string;
}

const PantryStaffList: React.FC = () => {
    const [staff, setStaff] = useState<PantryStaff[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<PantryStaff | null>(null);
    const router = useRouter();

    // Fetch pantry staff list
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await axios.get('/api/pantry');
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
            await axios.delete('/api/pantry', { data: { id } });
            setStaff(staff.filter(staffMember => staffMember._id !== id));
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
                        {/* Add/Edit Pantry Staff Form */}
                        <AddPantryStaffForm closeForm={closeForm} staff={selectedStaff} />
                    </div>
                </div>
            )}

            {/* Pantry Staff List */}
            <ul className="mt-4">
                {staff.map(staffMember => (
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
                        </div>

                        <div className="flex space-x-4">
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
