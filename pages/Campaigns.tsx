
import React, { useState } from 'react';
import { MOCK_CAMPAIGNS, MOCK_TASKS } from '../constants';
import { Campaign, Task } from '../types';

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
    const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS.filter(t => t.campaignId === campaign.id));

    const handleToggleTask = (taskId: string) => {
        setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{campaign.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{campaign.goal}</p>
                <div className="mt-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700 dark:text-white">Progress</span>
                        <span className="text-sm font-medium text-blue-700 dark:text-white">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Your Tasks:</h4>
                    <ul className="space-y-3 mt-2">
                        {tasks.map(task => (
                             <li key={task.id} className="flex items-center">
                                <input
                                    id={`task-${task.id}`}
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label 
                                    htmlFor={`task-${task.id}`} 
                                    className={`ml-3 text-sm font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-300'}`}
                                >
                                    {task.description}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const Campaigns = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Active Campaigns</h2>
            <div className="space-y-6">
                {MOCK_CAMPAIGNS.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} />)}
            </div>
        </div>
    );
};

export default Campaigns;
