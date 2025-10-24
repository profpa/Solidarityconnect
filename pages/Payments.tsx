import React from 'react';
import { useAppContext } from '../App';
import { MOCK_TRANSACTIONS } from '../constants';
import { FundraisingCampaign, Transaction, ContributionType } from '../types';
import { CalendarIcon, GiftIcon, TicketIcon } from '../components/Icons';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const MembershipStatusCard = () => {
    const { user } = useAppContext();
    if (!user) return null;

    const isActive = user.membershipStatus === 'Active';

    return (
        <Card className={isActive ? 'bg-green-50 dark:bg-green-900/50' : 'bg-amber-50 dark:bg-amber-900/50'}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Membership Dues</h3>
                    <p className={`text-sm font-bold mt-1 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        Status: {user.membershipStatus}
                    </p>
                </div>
                {isActive ? (
                    <div className="text-green-500">
                        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                ) : (
                    <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Pay Dues
                    </button>
                )}
            </div>
        </Card>
    );
};

const FundraisingCard = ({ campaign }: { campaign: FundraisingCampaign }) => {
    const progress = Math.round((campaign.currentAmount / campaign.goalAmount) * 100);
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{campaign.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4">{campaign.description}</p>
            <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatter.format(campaign.currentAmount)} raised</span>
                <span className="text-sm font-medium text-gray-500">{formatter.format(campaign.goalAmount)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Donate Now
            </button>
        </Card>
    );
};

const TransactionHistory = () => {
    const getIcon = (type: ContributionType) => {
        const props = { className: 'w-6 h-6 mr-4 text-gray-400' };
        switch (type) {
            case ContributionType.Membership: return <CalendarIcon {...props} />;
            case ContributionType.Donation: return <GiftIcon {...props} />;
            case ContributionType.Event: return <TicketIcon {...props} />;
            default: return null;
        }
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Contribution History</h2>
            <Card className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_TRANSACTIONS.map(tx => (
                        <li key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex items-center">
                                {getIcon(tx.type)}
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{tx.description}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</p>
                                </div>
                            </div>
                            <p className="font-bold text-gray-700 dark:text-gray-300">
                                ₹{tx.amount.toLocaleString('en-IN')}
                            </p>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const ActiveFundraisers = () => {
    const { fundraisers } = useAppContext();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Active Fundraisers</h2>
            <div className="space-y-6">
                {fundraisers.map(campaign => <FundraisingCard key={campaign.id} campaign={campaign} />)}
            </div>
        </div>
    );
};


const Payments = () => {
  return (
    <div className="space-y-8">
      <MembershipStatusCard />
      <ActiveFundraisers />
      <TransactionHistory />
    </div>
  );
};

export default Payments;
