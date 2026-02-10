'use client';
import React from 'react';

interface HeaderProps {
    userName: string;
    onToggleSidebar: () => void;
}

export default function Header({ userName, onToggleSidebar }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--background)] border-b border-[var(--border-color)] flex items-center justify-between px-6 z-[100]">
            <button
                onClick={onToggleSidebar}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--hover-background)] transition-colors"
            >
                <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-purple)] flex items-center justify-center text-white shadow-md cursor-pointer hover:shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
        </header>
    );
}
