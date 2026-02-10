'use client';
import React from 'react';

interface HeaderProps {
    userName: string;
    onToggleSidebar: () => void;
}

export default function Header({ userName, onToggleSidebar }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between px-6 z-[100] shadow-sm">
            <button
                onClick={onToggleSidebar}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--hover-background)] transition-all duration-200"
            >
                <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="w-10 h-10 rounded-xl bg-[var(--primary-indigo)] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-300 border-2 border-white group">
                <span className="text-base font-black tracking-tighter drop-shadow-md group-hover:scale-110 transition-transform">N</span>
            </div>
        </header>
    );
}
