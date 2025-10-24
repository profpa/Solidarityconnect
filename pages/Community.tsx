import React, { useState, useMemo } from 'react';
import { MOCK_NEWS, MOCK_FORUMS } from '../constants';
import { NewsPost, ForumTopic } from '../types';
import { SearchIcon } from '../components/Icons';

const NewsCard = ({ post }: { post: NewsPost }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover" />
        <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.snippet}</p>
            <p className="text-xs text-gray-500 mt-3">{post.author} &bull; {post.date}</p>
        </div>
    </div>
);

const ForumCard = ({ topic }: { topic: ForumTopic }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <h4 className="font-bold text-blue-600 dark:text-blue-400">{topic.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{topic.description}</p>
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
            <span>{topic.posts} posts</span>
            <span>Last post: {topic.lastPost}</span>
        </div>
    </div>
);

const Community = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNews = useMemo(() => {
        if (!searchTerm) return MOCK_NEWS;
        const lowercasedTerm = searchTerm.toLowerCase();
        return MOCK_NEWS.filter(post =>
            post.title.toLowerCase().includes(lowercasedTerm) ||
            post.snippet.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    const filteredForums = useMemo(() => {
        if (!searchTerm) return MOCK_FORUMS;
        const lowercasedTerm = searchTerm.toLowerCase();
        return MOCK_FORUMS.filter(topic =>
            topic.title.toLowerCase().includes(lowercasedTerm) ||
            topic.description.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    return (
        <div className="space-y-8">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon />
                </span>
                <input
                    type="text"
                    placeholder="Search news and forums..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search news and forums"
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Official Newsfeed</h2>
                {filteredNews.length > 0 ? (
                    <div className="space-y-6">
                        {filteredNews.map(post => <NewsCard key={post.id} post={post} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No news posts found matching your search.</p>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Discussion Forums</h2>
                {filteredForums.length > 0 ? (
                    <div className="space-y-4">
                        {filteredForums.map(topic => <ForumCard key={topic.id} topic={topic} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No forums found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default Community;