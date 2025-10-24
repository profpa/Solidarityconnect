import React, { useEffect, useState } from 'react';
import { BellIcon } from './Icons';

interface NotificationProps {
    message: string | null;
    onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                handleClose();
            }, 10000); // Auto-dismiss after 10 seconds
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [message]);

    const handleClose = () => {
        setShow(false);
        // Allow time for fade-out animation before calling onClose
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!message) {
        return null;
    }

    return (
        <div 
            className={`fixed top-0 left-0 right-0 max-w-lg mx-auto p-4 z-50 transition-all duration-300 ease-in-out ${show ? 'translate-y-4 opacity-100' : '-translate-y-full opacity-0'}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="bg-blue-600 text-white rounded-lg shadow-2xl p-4 flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <BellIcon />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold">Notification</h4>
                    <p className="text-sm">{message}</p>
                </div>
                <button onClick={handleClose} aria-label="Close notification" className="text-blue-200 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Notification;
