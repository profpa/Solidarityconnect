import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { LogOutIcon, PencilIcon } from '../components/Icons';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const ProfileHeader = () => {
    const { user } = useAppContext();
    if (!user) return null;

    return (
        <div className="flex flex-col items-center text-center">
            <img src={user.avatarUrl} alt={user.name} className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg" />
            <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-200">{user.name}</h1>
            <p className="text-md text-gray-500 dark:text-gray-400">{user.unit}</p>
            <p className="text-sm font-mono bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-md inline-block mt-2">{user.memberId}</p>
        </div>
    );
}

const ProfileStats = () => {
    const { user } = useAppContext();
    if (!user) return null;
    
    const isActive = user.membershipStatus === 'Active';

    return (
        <Card>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Engagement</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.engagementScore}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Membership</p>
                    <p className={`text-2xl font-bold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {user.membershipStatus}
                    </p>
                </div>
            </div>
        </Card>
    );
}

const SkillsAndInterests = () => {
    const { user } = useAppContext();
    if (!user) return null;

    const Pill = ({ text }: { text: string }) => (
        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
            {text}
        </span>
    );

    return (
        <Card>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">My Skills</h3>
                <div className="flex flex-wrap">
                    {user.skills.map(skill => <Pill key={skill} text={skill} />)}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">My Interests</h3>
                 <div className="flex flex-wrap">
                    {user.interests.map(interest => <Pill key={interest} text={interest} />)}
                </div>
            </div>
        </Card>
    );
};


const Profile = () => {
    const { logout } = useAppContext();

    return (
        <div className="space-y-6">
            <ProfileHeader />
            <ProfileStats />
            <SkillsAndInterests />
            <Link 
                to="/profile/edit"
                className="w-full flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg transition-colors"
            >
                <PencilIcon className="w-5 h-5" />
                <span>Edit Profile</span>
            </Link>
            <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                <LogOutIcon className="w-5 h-5" />
                <span>Log Out</span>
            </button>
        </div>
    );
};

export default Profile;
