// Suggestion Grid Component
'use client';
import React from 'react';
import SuggestionCard from './SuggestionCard';
import { EditIcon, LightbulbIcon, MessageIcon, CodeIcon } from '../icons/Icons';

interface Suggestion {
    id: string;
    title: string;
    icon: React.ReactNode;
    prompt?: string;
}

const defaultSuggestions: Suggestion[] = [
    {
        id: '1', // Added id to match interface
        title: 'Show me a data grid', // Mapped text to title
        icon: '📊' as unknown as React.ReactNode, // Cast string to React.ReactNode
        prompt: 'Generate a dummy sales report for 5 products with columns: Product, Category, Price, and Stock. Output the data as a JSON list of objects. Do not write python code.'
    },
    {
        id: '2', // Added id to match interface
        title: 'Create an image', // Mapped text to title
        icon: '🎨' as unknown as React.ReactNode, // Cast string to React.ReactNode
        prompt: 'Generate an image of a futuristic city with flying cars'
    },
    {
        id: '3',
        title: 'Brainstorm team bonding activities for our work retreat',
        icon: <MessageIcon />
    },
    {
        id: '4',
        title: 'Improve the readability of the given code',
        icon: <CodeIcon />
    }
];

interface SuggestionGridProps {
    suggestions?: Suggestion[];
    onSuggestionClick?: (suggestion: Suggestion) => void;
}

export default function SuggestionGrid({
    suggestions = defaultSuggestions,
    onSuggestionClick
}: SuggestionGridProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-w-[900px] mx-auto px-8 max-md:grid-cols-1">
            {suggestions.map((suggestion) => (
                <SuggestionCard
                    key={suggestion.id}
                    title={suggestion.title}
                    icon={suggestion.icon}
                    onClick={() => onSuggestionClick?.(suggestion)}
                />
            ))}
        </div>
    );
}
