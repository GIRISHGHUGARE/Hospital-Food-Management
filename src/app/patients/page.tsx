"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUser, FaDisease, FaBed, FaPhoneAlt, FaUsers, FaHospitalAlt, FaInfoCircle } from 'react-icons/fa'; // Importing necessary icons

interface AddPatientFormProps {
    closeForm: () => void;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ closeForm }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
        otherDetails: ''
    });
    const [loading, setLoading] = useState(false);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            const response = await axios.post('/api/patients', formData);

            if (response.status === 201) {
                toast.success('Patient added successfully');
                closeForm(); // Close the form after successful submission
                router.push('/admin/dashboard'); // Redirect to dashboard after success
            }
        } catch (error) {
            toast.error('Failed to add patient');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    {/* Name Input */}
                    <div className="flex items-center">
                        <FaUser className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Patient Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Diseases Input */}
                    <div className="flex items-center">
                        <FaDisease className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="diseases"
                            placeholder="Diseases (Optional)"
                            value={formData.diseases}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Allergies Input */}
                    <div className="flex items-center">
                        <FaUsers className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="allergies"
                            placeholder="Allergies (Optional)"
                            value={formData.allergies}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Room Number Input */}
                    <div className="flex items-center">
                        <FaHospitalAlt className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="roomNumber"
                            placeholder="Room Number"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Bed Number Input */}
                    <div className="flex items-center">
                        <FaBed className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="bedNumber"
                            placeholder="Bed Number"
                            value={formData.bedNumber}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Floor Number Input */}
                    <div className="flex items-center">
                        <FaHospitalAlt className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="floorNumber"
                            placeholder="Floor Number"
                            value={formData.floorNumber}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Age Input */}
                    <div className="flex items-center">
                        <FaInfoCircle className="text-gray-600 mr-2" />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Gender Select */}
                    <div className="flex items-center">
                        <FaUsers className="text-gray-600 mr-2" />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
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

                    {/* Emergency Contact Input */}
                    <div className="flex items-center">
                        <FaPhoneAlt className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            name="emergencyContact"
                            placeholder="Emergency Contact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Other Details Textarea */}
                    <div className="flex items-center">
                        <FaInfoCircle className="text-gray-600 mr-2" />
                        <textarea
                            name="otherDetails"
                            placeholder="Other Details (Optional)"
                            value={formData.otherDetails}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 ${loading ? 'opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Adding Patient...' : 'Add Patient'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPatientForm;
