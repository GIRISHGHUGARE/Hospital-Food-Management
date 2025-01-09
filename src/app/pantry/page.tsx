"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUser, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa'; // Import necessary icons

interface AddPantryStaffFormProps {
    closeForm: () => void;
    staff: PantryStaff | null; // Optional staff prop for editing
}

interface PantryStaff {
    _id: string;
    staffName: string;
    contactInfo: string;
    location: string;
}

const AddPantryStaffForm: React.FC<AddPantryStaffFormProps> = ({ closeForm, staff }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<PantryStaff>({
        _id: '',
        staffName: '',
        contactInfo: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);

    // Prefill form if editing
    useEffect(() => {
        if (staff) {
            setFormData(staff);
        }
    }, [staff]);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            if (staff) {
                // Editing an existing staff (PUT request)
                response = await axios.put(`/api/pantry`, formData);
            } else {
                // Adding a new staff (POST request)
                response = await axios.post('/api/pantry', formData);
            }

            if (response.status === 200 || response.status === 201) {
                toast.success(staff ? 'Pantry staff updated successfully' : 'Pantry staff added successfully');
                closeForm(); // Close the form after successful submission
                router.push('/dashboard'); // Redirect to pantry staff list after success
            }
        } catch (error) {
            toast.error(staff ? 'Failed to update pantry staff' : 'Failed to add pantry staff');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">{staff ? 'Edit Pantry Staff' : 'Add New Pantry Staff'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    {/* Staff ID (non-editable) */}
                    {staff && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={staff._id}
                                disabled
                                className="border p-2 w-full rounded bg-gray-200"
                            />
                        </div>
                    )}

                    {/* Staff Name Input */}
                    <div className="flex items-center">
                        <FaUser className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="staffName"
                            placeholder="Staff Name"
                            value={formData.staffName}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Contact Info Input */}
                    <div className="flex items-center">
                        <FaPhoneAlt className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="contactInfo"
                            placeholder="Contact Information"
                            value={formData.contactInfo}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center">
                        <FaLocationArrow className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 ${loading ? 'opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : staff ? 'Save Changes' : 'Add Staff'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPantryStaffForm;
