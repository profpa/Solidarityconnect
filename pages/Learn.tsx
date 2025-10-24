import React from 'react';
import { AIPolicyExplainer } from '../components/AIPolicyExplainer';
import { useAppContext } from '../App';

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
        {children}
    </div>
);

const DigitalLibrary = () => {
    const { documents } = useAppContext();
    
    return (
        <SectionCard title="Digital Library">
            <ul className="space-y-3">
                {documents.map(doc => (
                    <li key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">{doc.title}</span>
                        <button className="text-blue-600 hover:underline">View</button>
                    </li>
                ))}
            </ul>
        </SectionCard>
    );
};

const MicroCourses = () => (
    <SectionCard title="Micro-Learning Courses">
        <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Solidarity 101</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Onboarding for new members.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>
             <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Activist Skills: Public Speaking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn to deliver impactful speeches.</p>
                 <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
            </div>
        </div>
    </SectionCard>
);

const Learn = () => {
    return (
        <div className="space-y-6">
            <AIPolicyExplainer />
            <DigitalLibrary />
            <MicroCourses />
        </div>
    );
};

export default Learn;
