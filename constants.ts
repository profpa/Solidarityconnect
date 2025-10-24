import { UserProfile, AppEvent, EventType, VolunteerOpportunity, Campaign, Task, NewsPost, ForumTopic, FundraisingCampaign, Transaction, ContributionType, DigitalLibraryDocument } from './types';

export const MOCK_USER: UserProfile = {
  id: 'user-001',
  name: 'Activist One',
  unit: 'Bengaluru Central',
  memberId: 'SYM-KNT-001',
  engagementScore: 1250,
  skills: ['Public Speaking', 'Graphic Design', 'First Aid'],
  interests: ['Environmental Work', 'Education', 'Health Camps'],
  avatarUrl: 'https://picsum.photos/seed/user1/200/200',
  membershipStatus: 'Active',
  role: 'Member',
};

export const MOCK_ADMIN_USER: UserProfile = {
  id: 'admin-001',
  name: 'Admin User',
  unit: 'State Committee',
  memberId: 'SYM-KNT-ADMIN',
  engagementScore: 9999,
  skills: ['Management', 'Finance', 'Strategy'],
  interests: ['Organization Growth', 'Data Analysis'],
  avatarUrl: 'https://picsum.photos/seed/admin/200/200',
  membershipStatus: 'Active',
  role: 'Admin',
};

export const MOCK_ALL_USERS: UserProfile[] = [
    { ...MOCK_USER },
    { id: 'user-002', name: 'Member Two', unit: 'Mysuru District', memberId: 'SYM-KNT-002', engagementScore: 850, skills: ['Event Management'], interests: ['Community Service'], avatarUrl: 'https://picsum.photos/seed/user2/200/200', membershipStatus: 'Active', role: 'Member' },
    { id: 'user-003', name: 'Member Three', unit: 'Bengaluru Central', memberId: 'SYM-KNT-003', engagementScore: 450, skills: ['Social Media'], interests: ['Digital Activism'], avatarUrl: 'https://picsum.photos/seed/user3/200/200', membershipStatus: 'Dues Pending', role: 'Member' },
    { id: 'user-004', name: 'Member Four', unit: 'Mangalore City', memberId: 'SYM-KNT-004', engagementScore: 1100, skills: ['Volunteering'], interests: ['Health Camps'], avatarUrl: 'https://picsum.photos/seed/user4/200/200', membershipStatus: 'Active', role: 'Member' },
    { id: 'user-005', name: 'Member Five', unit: 'Kalaburagi', memberId: 'SYM-KNT-005', engagementScore: 200, skills: ['Content Writing'], interests: ['Education'], avatarUrl: 'https://picsum.photos/seed/user5/200/200', membershipStatus: 'Dues Pending', role: 'Member' },
];

export const MOCK_EVENTS: AppEvent[] = [
  { id: 'evt-1', title: 'Youth Leadership Workshop', date: '2024-08-15', location: 'Bengaluru', type: EventType.Workshop, description: 'A workshop on developing leadership skills for young activists.' },
  { id: 'evt-2', title: 'State-wide Blood Donation Drive', date: '2024-08-20', location: 'All Districts', type: EventType.HealthCamp, description: 'Participate in our annual blood donation camp.' },
  { id: 'evt-3', title: 'Webinar: Understanding the NEP', date: '2024-09-01', location: 'Online', type: EventType.Webinar, description: 'An online session to discuss the new education policy.' },
  { id: 'evt-4', title: 'Annual Sports Meet', date: '2024-09-10', location: 'Mangalore', type: EventType.SportsMeet, description: 'Friendly sports competitions for all members.' },
];

export const MOCK_VOLUNTEER_OPPS: VolunteerOpportunity[] = [
  { id: 'vol-1', title: 'Ramazan Kit Distribution', project: 'Community Outreach', skillsNeeded: ['Packing', 'Logistics'], date: '2025-03-20', location: 'Bijapur' },
  { id: 'vol-2', title: 'Tree Plantation Drive', project: 'Green Karnataka', skillsNeeded: ['Gardening'], date: '2024-09-05', location: 'Mysuru' },
  { id: 'vol-3', title: 'Social Media Poster Design', project: 'Digital Campaign', skillsNeeded: ['Graphic Design', 'Canva'], date: 'Ongoing', location: 'Remote' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
    { id: 'cmp-1', title: 'Voter ID Enrollment Drive', goal: 'Enroll 10,000 new voters', progress: 65, description: 'Help young citizens get their voter IDs and participate in democracy.' },
    { id: 'cmp-2', title: 'Anti-Drug Awareness', goal: 'Reach 50,000 youth online', progress: 80, description: 'A digital campaign to spread awareness about the dangers of drug abuse.' },
];

export const MOCK_TASKS: Task[] = [
    { id: 'tsk-1', campaignId: 'cmp-1', description: 'Conduct door-to-door survey in your area', completed: false },
    { id: 'tsk-2', campaignId: 'cmp-1', description: 'Set up an enrollment booth at the local college', completed: true },
    { id: 'tsk-3', campaignId: 'cmp-2', description: 'Share the official campaign video on social media', completed: false },
    { id: 'tsk-4', campaignId: 'cmp-2', description: 'Design an infographic about drug abuse statistics', completed: false },
];

export const MOCK_NEWS: NewsPost[] = [
    { id: 'news-1', title: 'Solidarity Concludes Successful State-Level Leaders Meet', snippet: 'Over 200 youth leaders from across Karnataka participated in the two-day event in Bangalore, focusing on personality development and future strategies.', author: 'State Committee', date: '2023-08-21', imageUrl: 'https://picsum.photos/seed/news1/400/200' },
    { id: 'news-2', title: 'Manipur Violence Protest Sees Huge Turnout', snippet: 'Members gathered in Bangalore to stand in solidarity with the people of Manipur, demanding justice and immediate action.', author: 'SYM Karnataka', date: '2023-07-27', imageUrl: 'https://picsum.photos/seed/news2/400/200' },
];

export const MOCK_FORUMS: ForumTopic[] = [
    { id: 'forum-1', title: 'Youth Entrepreneurship Ideas', description: 'Share and discuss business ideas that can empower our communities.', posts: 42, lastPost: '2 hours ago' },
    { id: 'forum-2', title: 'Book Club: "The Constitution of India"', description: 'Weekly discussions on the fundamental rights and duties of citizens.', posts: 112, lastPost: 'Yesterday' },
    { id: 'forum-3', title: 'Environmental Action Planning', description: 'Let\'s organize local clean-up and plantation drives.', posts: 78, lastPost: '5 hours ago' },
];

export const MOCK_FUNDRAISERS: FundraisingCampaign[] = [
    {
        id: 'fund-1',
        title: 'Ramazan Food Kit Drive',
        description: 'Provide essential food kits to families in need during the holy month of Ramazan.',
        goalAmount: 500000,
        currentAmount: 375000,
    },
    {
        id: 'fund-2',
        title: 'Winter Blanket Distribution',
        description: 'Help us provide warm blankets to the homeless during the cold winter nights.',
        goalAmount: 200000,
        currentAmount: 80000,
    },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'txn-1', date: '2024-07-25', amount: 50, type: ContributionType.Membership, description: 'Monthly Membership Dues' },
    { id: 'txn-2', date: '2024-07-15', amount: 1000, type: ContributionType.Donation, description: 'Donation: Ramazan Food Kit Drive' },
    { id: 'txn-3', date: '2024-06-25', amount: 50, type: ContributionType.Membership, description: 'Monthly Membership Dues' },
    { id: 'txn-4', date: '2024-06-10', amount: 200, type: ContributionType.Event, description: 'Fee: Leadership Workshop' },
];

export const MOCK_ALL_TRANSACTIONS: Transaction[] = [
    ...MOCK_TRANSACTIONS,
    { id: 'txn-5', date: '2024-07-28', amount: 50, type: ContributionType.Membership, description: 'Membership Dues - Member Two' },
    { id: 'txn-6', date: '2024-07-20', amount: 500, type: ContributionType.Donation, description: 'Donation: Winter Blanket - Member Four' },
    { id: 'txn-7', date: '2024-07-10', amount: 50, type: ContributionType.Membership, description: 'Membership Dues - Member Four' },
    { id: 'txn-8', date: '2024-05-25', amount: 50, type: ContributionType.Membership, description: 'Membership Dues - Member Three (Arrears)' },
];

export const MOCK_DOCUMENTS: DigitalLibraryDocument[] = [
    { id: 'doc-1', title: 'Organization Constitution', fileName: 'constitution.pdf' },
    { id: 'doc-2', title: 'Youth Manifesto 2023', fileName: 'manifesto_2023.pdf' },
];
