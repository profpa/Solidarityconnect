import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const EditProfile = () => {
    const { user, updateUser } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [skills, setSkills] = useState(user?.skills.join(', ') || '');
    const [interests, setInterests] = useState(user?.interests.join(', ') || '');

    if (!user) {
        return <div>Loading...</div>; // Or a redirect
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
        const updatedInterests = interests.split(',').map(i => i.trim()).filter(Boolean);
        
        updateUser({
            name,
            skills: updatedSkills,
            interests: updatedInterests,
        });
        
        navigate('/profile');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Skills (comma-separated)
                    </label>
                    <textarea
                        id="skills"
                        rows={3}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g., Public Speaking, Event Management"
                    />
                </div>
                 <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Interests (comma-separated)
                    </label>
                    <textarea
                        id="interests"
                        rows={3}
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g., Education, Environmental Work"
                    />
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
