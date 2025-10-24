import React, { useState, useMemo } from 'react';
import { MOCK_ALL_USERS } from '../constants';
import { useAppContext } from '../App';
import Modal from '../components/Modal';
import { PlusCircleIcon } from '../components/Icons';
import { AppEvent, DigitalLibraryDocument, EventType, FundraisingCampaign, UserProfile } from '../types';

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

// Form Components for Modals
const EventForm = ({ onClose }: { onClose: () => void }) => {
    const { addEvent } = useAppContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEvent: AppEvent = {
            id: `evt-${Date.now()}`,
            title: formData.get('title') as string,
            date: formData.get('date') as string,
            location: formData.get('location') as string,
            type: formData.get('type') as EventType,
            description: formData.get('description') as string,
        };
        addEvent(newEvent);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold">Create New Event</h3>
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input name="date" type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input name="location" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">Type</label>
                <select name="type" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                    {Object.values(EventType).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea name="description" rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</button>
            </div>
        </form>
    );
};

const FundraiserForm = ({ onClose }: { onClose: () => void }) => {
    const { addFundraiser } = useAppContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newFundraiser: FundraisingCampaign = {
            id: `fund-${Date.now()}`,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            goalAmount: Number(formData.get('goalAmount')),
            currentAmount: 0,
        };
        addFundraiser(newFundraiser);
        onClose();
    };
    
     return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold">Create New Fundraiser</h3>
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
             <div>
                <label className="block text-sm font-medium">Goal Amount (₹)</label>
                <input name="goalAmount" type="number" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea name="description" rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</button>
            </div>
        </form>
    );
};

const DocumentForm = ({ onClose }: { onClose: () => void }) => {
    const { addDocument } = useAppContext();
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newDoc: DigitalLibraryDocument = {
            id: `doc-${Date.now()}`,
            title: formData.get('title') as string,
            fileName: formData.get('fileName') as string,
        };
        addDocument(newDoc);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold">Add New Document</h3>
            <div>
                <label className="block text-sm font-medium">Document Title</label>
                <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
             <div>
                <label className="block text-sm font-medium">File Name (e.g., manifesto.pdf)</label>
                <input name="fileName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add</button>
            </div>
        </form>
    );
};

const ManagementSection = ({ title, children, onAdd }: { title: string, children: React.ReactNode, onAdd: () => void }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
            <button onClick={onAdd} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
                <PlusCircleIcon className="w-6 h-6" />
                <span>Create New</span>
            </button>
        </div>
        <Card className="p-0">
           {children}
        </Card>
    </div>
);

const MemberManagement = () => {
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Dues Pending'>('All');

    const filteredUsers = useMemo(() => {
        if (statusFilter === 'All') return MOCK_ALL_USERS;
        return MOCK_ALL_USERS.filter(user => user.membershipStatus === statusFilter);
    }, [statusFilter]);

    const FilterButton = ({ label, value }: { label: string, value: 'All' | 'Active' | 'Dues Pending' }) => {
        const isActive = statusFilter === value;
        return (
            <button
                onClick={() => setStatusFilter(value)}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
                {label}
            </button>
        );
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Member Management</h2>
            <Card>
                <div className="flex items-center space-x-2 mb-4 pb-4 border-b dark:border-gray-700">
                    <FilterButton label="All Members" value="All" />
                    <FilterButton label="Active" value="Active" />
                    <FilterButton label="Dues Pending" value="Dues Pending" />
                </div>
                <div className="overflow-x-auto">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                            <li key={user.id} className="p-3 grid grid-cols-3 gap-4 items-center">
                                <div className="col-span-2 sm:col-span-1">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.unit}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.membershipStatus === 'Active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                                    }`}>
                                        {user.membershipStatus}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-gray-800 dark:text-gray-200">{user.engagementScore}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};


const Admin = () => {
    const { events, fundraisers, documents, setNotification } = useAppContext();
    const [modalOpen, setModalOpen] = useState<'event' | 'fundraiser' | 'document' | null>(null);

    return (
        <div className="space-y-8">
            <MemberManagement />
            
            <ManagementSection title="Event Management" onAdd={() => setModalOpen('event')}>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {events.slice(0,3).map(event => (
                        <li key={event.id} className="p-4">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.date} &bull; {event.location}</p>
                        </li>
                    ))}
                </ul>
            </ManagementSection>
            
            <ManagementSection title="Fundraiser Management" onAdd={() => setModalOpen('fundraiser')}>
                 <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {fundraisers.slice(0,3).map(f => (
                        <li key={f.id} className="p-4">
                            <p className="font-semibold">{f.title}</p>
                            <p className="text-sm text-gray-500">Goal: ₹{f.goalAmount.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </ManagementSection>

            <ManagementSection title="Digital Library" onAdd={() => setModalOpen('document')}>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {documents.slice(0,3).map(doc => (
                        <li key={doc.id} className="p-4">
                            <p className="font-semibold">{doc.title}</p>
                        </li>
                    ))}
                </ul>
            </ManagementSection>

            {/* Modals */}
            <Modal isOpen={modalOpen === 'event'} onClose={() => setModalOpen(null)} title="Event">
                <EventForm onClose={() => setModalOpen(null)} />
            </Modal>
             <Modal isOpen={modalOpen === 'fundraiser'} onClose={() => setModalOpen(null)} title="Fundraiser">
                <FundraiserForm onClose={() => setModalOpen(null)} />
            </Modal>
             <Modal isOpen={modalOpen === 'document'} onClose={() => setModalOpen(null)} title="Document">
                <DocumentForm onClose={() => setModalOpen(null)} />
            </Modal>
        </div>
    );
};

export default Admin;