import React from 'react';
import { TargetIcon } from './Icons';

const AuthLayout = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <TargetIcon className="w-16 h-16 mx-auto text-blue-600" />
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Solidarity Connect</h1>
                <h2 className="mt-2 text-xl text-gray-600 dark:text-gray-400">{title}</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;
