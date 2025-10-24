
import React from 'react';
import { useAppContext } from '../App';
import { QrCodeIcon } from '../components/Icons';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const DigitalIdCard = () => {
  const { user } = useAppContext();
  if (!user) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white">
      <div className="flex items-center space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white/50" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm opacity-90">{user.unit}</p>
          <p className="text-xs font-mono bg-black/20 px-2 py-1 rounded-md inline-block mt-2">{user.memberId}</p>
        </div>
        <div className="hidden sm:block">
            <QrCodeIcon />
        </div>
      </div>
    </Card>
  );
};

const EngagementScore = () => {
    const { user } = useAppContext();
    if (!user) return null;

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">My Engagement</h3>
            <div className="flex items-center justify-center text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{user.engagementScore}</p>
                <p className="ml-2 text-gray-500">Points</p>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Keep up the great work!</p>
        </Card>
    );
};

const SkillsAndInterests = () => {
    const { user } = useAppContext();
    if (!user) return null;

    const SkillPill = ({ text }: { text: string }) => (
        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
            {text}
        </span>
    );

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Skills & Interests</h3>
            <div>
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">My Skills</h4>
                <div className="flex flex-wrap">
                    {user.skills.map(skill => <SkillPill key={skill} text={skill} />)}
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">My Interests</h4>
                 <div className="flex flex-wrap">
                    {user.interests.map(interest => <SkillPill key={interest} text={interest} />)}
                </div>
            </div>
        </Card>
    );
};


const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DigitalIdCard />
      <EngagementScore />
      <SkillsAndInterests />
    </div>
  );
};

export default Dashboard;
