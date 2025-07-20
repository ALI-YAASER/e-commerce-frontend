import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import SearchBar from "../component/SearchBar.jsx";

const Profile = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.success) {
                    setUserData(res.data.user);
                }
            } catch (err) {
                toast.error("Failed to load profile");
                console.error(err);
            }
        };

        if (token) {
            fetchProfile();
            setLoading(false);
        }
    }, [token]);

    const handleInputChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (line, value) => {
        setUserData(prev => ({
            ...prev,
            address: { ...prev.address, [line]: value },
        }));
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name || "");
            formData.append("email", userData.email || "");
            formData.append("phone", userData.phone || "");
            formData.append("gender", userData.gender || "");
            formData.append("birthday", userData.birthday || "");
            formData.append("addressLine1", userData.address?.line1 || "");
            formData.append("addressLine2", userData.address?.line2 || "");
            if (selectedImageFile) {
                formData.append("profileImage", selectedImageFile);
            }

            const res = await axios.put(`${backendUrl}/api/user/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserData(res.data.user);
            toast.success("Profile updated");
            setIsEdit(false);
            setSelectedImageFile(null);
        } catch (err) {
            toast.error("Update failed");
            console.error(err);
        }
    };

    const deleteProfileImage = async () => {
        try {
            await axios.delete(`${backendUrl}/api/user/delete-profile-image`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(prev => ({ ...prev, profileImage: '' }));
            toast.success("Image deleted");
        } catch (err) {
            toast.error("Delete failed");
            console.error(err);
        }
    };

    if (loading || !userData) return <p className="p-6 text-center">Loading...</p>;

    const profileImageUrl = selectedImageFile
        ? URL.createObjectURL(selectedImageFile)
        : userData.profileImage || "/default-avatar.png";

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow rounded-lg mt-6">
            {/* صورة البروفايل */}
            <div className="flex items-center gap-4 border-b pb-4">
                <img
                    className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover shadow"
                    src={profileImageUrl}
                    alt="Profile"
                />
                <div className="flex-1">
                    {isEdit ? (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedImageFile(e.target.files[0])}
                                className="block text-sm text-gray-500 mb-2"
                            />
                            <input
                                type="text"
                                value={userData.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
                                placeholder="Your Name"
                            />
                            {userData.profileImage && (
                                <button
                                    onClick={deleteProfileImage}
                                    className="text-xs text-red-500 underline mt-1"
                                >
                                    Delete photo
                                </button>
                            )}
                        </>
                    ) : (
                        <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
                    )}
                </div>
            </div>

            {/* معلومات التواصل */}
            <div>
                <h3 className="text-lg font-medium text-blue-600 mb-2 border-b pb-1">Contact Information</h3>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2">
                    <p className="text-gray-600">Email:</p>
                    <p className="text-blue-700">{userData.email}</p>

                    <p className="text-gray-600">Phone:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            value={userData.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-gray-100 border border-gray-300 p-1 rounded-md"
                        />
                    ) : (
                        <p>{userData.phone}</p>
                    )}

                    <p className="text-gray-600">Address:</p>
                    {isEdit ? (
                        <div className="space-y-1">
                            <input
                                type="text"
                                value={userData.address?.line1 || ""}
                                onChange={(e) => handleAddressChange("line1", e.target.value)}
                                className="bg-gray-100 border border-gray-300 p-1 rounded-md w-full"
                                placeholder="Address Line 1"
                            />
                            <input
                                type="text"
                                value={userData.address?.line2 || ""}
                                onChange={(e) => handleAddressChange("line2", e.target.value)}
                                className="bg-gray-100 border border-gray-300 p-1 rounded-md w-full"
                                placeholder="Address Line 2"
                            />
                        </div>
                    ) : (
                        <p>{userData.address?.line1}<br />{userData.address?.line2}</p>
                    )}
                </div>
            </div>

            {/* معلومات أساسية */}
            <div>
                <h3 className="text-lg font-medium text-blue-600 mb-2 border-b pb-1">Basic Information</h3>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2">
                    <p className="text-gray-600">Gender:</p>
                    {isEdit ? (
                        <select
                            value={userData.gender || ""}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            className="bg-gray-100 border border-gray-300 p-1 rounded-md"
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    ) : (
                        <p>{userData.gender}</p>
                    )}

                    <p className="text-gray-600">Birthday:</p>
                    {isEdit ? (
                        <input
                            type="date"
                            value={userData.birthday ? userData.birthday.substring(0, 10) : ""}
                            onChange={(e) => handleInputChange("birthday", e.target.value)}
                            className="bg-gray-100 border border-gray-300 p-1 rounded-md"
                        />
                    ) : (
                        <p>{new Date(userData.birthday).toLocaleDateString()}</p>
                    )}
                </div>
            </div>

            {/* زر حفظ أو تعديل */}
            <div className="flex justify-end border-t pt-4">
                {isEdit ? (
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
            <SearchBar/>
        </div>

    );
};

export default Profile;
