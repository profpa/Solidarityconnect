import React, { useState } from 'react';
import { useAppContext } from '../App';
import { MOCK_VOLUNTEER_OPPS } from '../constants';
import { AppEvent, VolunteerOpportunity } from '../types';

const EventCard = ({ event }: { event: AppEvent }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                        {event.type}
                    </span>
                    <h3 className="text-xl font-bold mt-2 text-gray-800 dark:text-gray-200">{event.title}</h3>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{event.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">{event.description}</p>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                RSVP
            </button>
        </div>
    </div>
);

const VolunteerCard = ({ opp }: { opp: VolunteerOpportunity }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="p-5">
            <p className="text-xs text-gray-500 dark:text-gray-400">{opp.project}</p>
            <h3 className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-200">{opp.title}</h3>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">{opp.date} &bull; {opp.location}</p>
            <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Skills Needed:</h4>
                <div className="flex flex-wrap">
                    {opp.skillsNeeded.map(skill => (
                        <span key={skill} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-300 mr-2 mb-1">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                I'm Interested
            </button>
        </div>
    </div>
);


const Events = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'volunteer'>('events');
    const { events } = useAppContext();

    return (
        <div>
            <div className="mb-6 flex border-b border-gray-300 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('events')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'events' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Upcoming Events
                </button>
                <button
                    onClick={() => setActiveTab('volunteer')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'volunteer' ? 'border-b-2 border-green-600 text-green-600 dark:text-green-400' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Volunteer
                </button>
            </div>

            <div className="space-y-6">
                {activeTab === 'events' && events.map(event => <EventCard key={event.id} event={event} />)}
                {activeTab === 'volunteer' && MOCK_VOLUNTEER_OPPS.map(opp => <VolunteerCard key={opp.id} opp={opp} />)}
            </div>
        </div>
    );
};

export default Events;
