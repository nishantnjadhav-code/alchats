import axios from 'axios';More actions
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const CreateData = () => {
    const { user } = useContext(AuthContext);

    const [biodata, setBiodata] = useState({
        biodataType: '',
        name: '',
        profileImage: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        age: '',
        occupation: '',
        race: '',
        fatherName: '',
        motherName: '',
        permanentDivision: '',
        presentDivision: '',
        relationshipStatus: '',
        contactEmail: user?.email || '', // Set user's email here
        mobileNumber: '',
    });

    // Function to calculate age from the date of birth
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        // Adjust age if the birthday hasn't occurred yet this year
        if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the date of birth is changed, calculate the age
        if (name === 'dateOfBirth') {
            const age = calculateAge(value);
            setBiodata({
                ...biodata,
                [name]: value,
                age: age, // Update the age dynamically
            });
        } else {
            setBiodata({
                ...biodata,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/biodata', biodata);
            const response = await axios.post('https://find-partner-server.vercel.app/biodata', biodata);

            if (response.status === 201) {
                Swal.fire("Success", "Your biodata has beeen created successfully", "success");
@@ -72,33 +72,32 @@
                Swal.fire("error", "Find some error!");
            }
        } catch (error) {
            console.error('Error submitting biodata:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 mt-10">
        <div className="container mx-auto p-6 ">
            <h2 className="text-2xl font-semibold mb-6">Create or Edit Biodata</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Biodata Type */}
                <div>
                    <label className="block font-medium">Biodata Type</label>
                    <select
                        name="biodataType"
                        value={biodata.biodataType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Name */}
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"