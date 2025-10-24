
import React, { useState } from 'react';
import { explainPolicy } from '../services/geminiService';

const MANIFESTO_TEXT = `
Solidarity Youth Manifesto - 2023

Economic Empowerment & Employment:
- Reserve up to 50% local youth & women in government and private sector jobs.
- Set up Skill Development and training centres in all talukas.
- Organize Monthly Job Fairs & Yearly Job Mela's.
- Develop a "State Level Government Job Portal", free for all job seekers.
- Fill all state government vacancies (around 2.5 Lakh) within one year.
- Provide proper accommodation and travel for Army and Police recruitment aspirants. Special reservations for backward classes and minorities.
- Frame ease of business policies to attract major companies.
- Revise Karnataka Minimum Wages Act 2023 with at least 50% increment in daily wages.
- Special self-employment scheme with grants from Rs 25,000 to Rs 40,000 for petty businesses (for incomes less than 1.5 Lakhs).
- Establish Start-up Incubators in all major districts.
- Special scheme for interest-free loans up to 1 Crore for 3-7 years for social issue start-ups.
- Special scheme for interest-free loans up to 25 Lakhs for 3-5 years for youth from backward communities and minorities.
- Provide financial assistance and technical mentoring for general start-ups not covered under existing schemes.
- Increase MSME project cost to at least Rs 25 Lakhs and reduce interest rates to 0% under the Women Enterprise Development scheme.
- Conduct all pending recruitment exams within six months and announce results within four months.
- Form special fast track courts to counter recruitment scams.

Sports Empowerment:
- Construct public stadiums, swimming pools, parks in every taluka. Complete stalled sports complexes.
- Promote rural, traditional and regional sports (kho-kho, wrestling, kabaddi, kambala, etc.) from village to state level.
- Formulate a new health plan for sports persons, with a monthly pension for those with physical disabilities.
- Establish Yuvaka Mandala in every village with free sports equipment.
- Increase representation of women in sports. Build secure, women-only stadiums with accommodation.
- Build an international level stadium in Mangalore/Kalaburgi/Raichur.

Art, Literature and Culture:
- Show transparency in grants to cultural associations. Form a cultural review committee.
- Construct theatres in all taluks and mini-theatres in smart cities (Bangalore, Mangalore, etc.).
- Provide special loan facility for youth producing movies/short films, especially with social concerns.
- Special grant in the name of late actor Puneeth Rajkumar for young film talents.
- Release special grants to publish works of young writers.
- Put a new plan in place to save endangered regional folk arts.

Health:
- Provide free universal health care to all citizens. Revise eligibility criteria for health schemes.
- Make all Taluk and District Government Hospitals well-equipped and functional.
- Open a counselling centre in every village health centre for mental depression.
- Take strict measures to eliminate drug addiction. Open rehabilitation and de-addiction centres.
- Deploy a special force to crack down on drug trafficking networks.
- Open free gyms and yoga training centres at the village level.

Agriculture:
- Provide incentives & interest-free loans through special grants for small-scale agriculture.
- Organize information centres and agricultural workshops at ward levels about soil quality, water, etc.
- Fill 40% vacancies in the Horticulture Department.
- Distribute free seeds of fruit, vegetables & flower plants every year at ward level.

Education & Human rights:
- Make education free up to graduation.
- Special arrangements for students whose education is disturbed in foreign countries.
- Resume suspended scholarships for minority students.
- Provide financial assistance for coaching for competitive examinations.
- Build libraries with advanced technologies in every district and provide free coaching.
- Strictly monitor speeches and statements that incite communalism and terrorism. Stop moral policing.
- Involve and encourage youth in environment protection, cleanliness, and social service like blood donation camps.
- Provide 'Mangalya assistance' of up to one lakh for women from lower castes. Restart Shaadi Bhagya Yojana for minorities.
- Reserve 18% of the state budget for youth empowerment and Education.
- Review the National Education Policy and formulate a State Education Policy as per state needs.
- Take action against mob lynching and moral policing as per Supreme Court guidelines.
- Appoint suitable persons and provide more powers and grants to State Human Rights, SC/ST, Women's, Child Rights, and Minority Commissions.
`;


export const AIPolicyExplainer = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsLoading(true);
        setResponse('');
        setError('');

        try {
            const result = await explainPolicy(MANIFESTO_TEXT, question);
            setResponse(result);
        } catch (err) {
            setError('Failed to get a response. Please check your connection or try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">AI Policy Explainer</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ask a question about the Youth Manifesto 2023 and get a simple explanation from our AI assistant.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., What is the plan for jobs?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Thinking...' : 'Ask AI'}
                </button>
            </form>

            {isLoading && (
                <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Generating explanation...</p>
                </div>
            )}
            
            {error && <p className="mt-4 text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}

            {response && (
                 <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
                    <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200">AI's Explanation:</h3>
                    {response}
                </div>
            )}
        </div>
    );
};
