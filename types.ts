export interface UserProfile {
  id: string;
  name: string;
  unit: string;
  memberId: string;
  engagementScore: number;
  skills: string[];
  interests: string[];
  avatarUrl: string;
  membershipStatus: 'Active' | 'Dues Pending';
  role: 'Admin' | 'Member';
}

export enum EventType {
  Workshop = 'Workshop',
  Protest = 'Protest',
  HealthCamp = 'Health Camp',
  Webinar = 'Webinar',
  SportsMeet = 'Sports Meet',
  FoodDrive = 'Food Drive',
}

export interface AppEvent {
  id:string;
  title: string;
  date: string;
  location: string;
  type: EventType;
  description: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  project: string;
  skillsNeeded: string[];
  date: string;
  location: string;
}

export interface Campaign {
  id: string;
  title: string;
  goal: string;
  progress: number; // Percentage from 0 to 100
  description: string;
}

export interface Task {
  id: string;
  campaignId: string;
  description: string;
  completed: boolean;
}

export interface NewsPost {
    id: string;
    title: string;
    snippet: string;
    author: string;
    date: string;
    imageUrl: string;
}

export interface ForumTopic {
    id: string;
    title: string;
    description: string;
    posts: number;
    lastPost: string;
}

export enum ContributionType {
    Membership = 'Membership Dues',
    Donation = 'Donation',
    Event = 'Event Fee',
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: ContributionType;
    description: string;
}

export interface FundraisingCampaign {
    id: string;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
}

export interface DigitalLibraryDocument {
  id: string;
  title: string;
  fileName: string;
}
