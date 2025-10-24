import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import useTitle from '../hooks/useTitle';
import Loader from '../components/Loader';

const Profile = () => {
    const { user, loading, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    useTitle('My Profile');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(displayName, photoURL);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>
            <div className="flex flex-col items-center">
                <img src={user?.photoURL || 'https://i.ibb.co/615w0K2/user.png'} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
                {isEditing ? (
                    <form onSubmit={handleUpdate} className="w-full">
                        <div className="mb-4">
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">Photo URL</label>
                            <input
                                type="text"
                                id="photoURL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">{user?.displayName || 'No display name'}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-outline mt-4">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
