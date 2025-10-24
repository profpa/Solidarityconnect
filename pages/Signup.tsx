import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import AuthLayout from '../components/AuthLayout';
import { TargetIcon, SpinnerIcon } from '../components/Icons';

const Signup = () => {
    const { login } = useAppContext();
    const [address, setAddress] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this data to a backend to create a user
        // For now, we'll just log the user in with mock data
        login();
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLocating(true);
        setLocationError('');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // In a real app, this would be converted to a street address via a reverse geocoding API.
                const formattedAddress = `Approx. location (Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)})`;
                setAddress(formattedAddress);
                setIsLocating(false);
            },
            (error) => {
                setLocationError('Unable to retrieve location. Please grant permission or enter manually.');
                setIsLocating(false);
                console.error('Geolocation error:', error);
            }
        );
    };

    return (
        <AuthLayout title="Create a New Account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input type="text" id="firstName" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input type="text" id="lastName" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="text"
                            id="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 pr-10"
                            placeholder="Enter address or use location"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button 
                                type="button" 
                                onClick={handleGetLocation} 
                                disabled={isLocating} 
                                className="p-1 text-gray-400 hover:text-blue-500 disabled:cursor-not-allowed disabled:text-gray-300 transition-colors"
                                aria-label="Use current location"
                            >
                                {isLocating ? <SpinnerIcon /> : <TargetIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    {locationError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{locationError}</p>}
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input type="password" id="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sign Up
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    Log In
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Signup;