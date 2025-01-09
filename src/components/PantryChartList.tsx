"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons from react-icons

interface PantryStaff {
    _id: string;
    staffName: string;
    contactInfo: string;
    location: string;
}

const PantryStaffList: React.FC = () => {
    const [staff, setStaff] = useState<PantryStaff[]>([]);
    const router = useRouter();

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

    const deleteStaff = async (id: string) => {
        try {
            await axios.delete(`/api/pantry-staff/${id}`);
            setStaff(staff.filter(staffMember => staffMember._id !== id));
            toast.success("Pantry staff deleted.");
        } catch (error) {
            toast.error("Failed to delete pantry staff.");
        }
    };

    return (
        <div>
            <button
                onClick={() => router.push('/admin/pantry-staff/create')}
                className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center"
            >
                Add Pantry Staff
            </button>
            <ul className="mt-4">
                {staff.map(staffMember => (
                    <li key={staffMember._id} className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg">
                        <div>
                            <h3 className="font-semibold">{staffMember.staffName}</h3>
                            <p>Contact: {staffMember.contactInfo}</p>
                            <p>Location: {staffMember.location}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push(`/admin/pantry-staff/edit/${staffMember._id}`)}
                                className="text-blue-500 flex items-center space-x-2"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>
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
