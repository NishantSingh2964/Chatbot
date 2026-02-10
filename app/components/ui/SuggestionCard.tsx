// Suggestion Card Component
'use client';
import React from 'react';

interface SuggestionCardProps {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export default function SuggestionCard({ title, icon, onClick }: SuggestionCardProps) {
    return (
        <button className="bg-[var(--card-background)] border border-transparent rounded-2xl p-6 min-h-[140px] flex flex-col justify-between cursor-pointer transition-all duration-200 text-left w-full hover:bg-[#e8f0fe] hover:border-[var(--primary-blue)] hover:shadow-md hover:-translate-y-0.5" onClick={onClick}>
            <p className="text-sm leading-relaxed text-[var(--text-primary)] m-0 font-normal">{title}</p>
            <div className="flex items-center justify-end text-[var(--text-secondary)] mt-4">{icon}</div>
        </button>
    );
}
