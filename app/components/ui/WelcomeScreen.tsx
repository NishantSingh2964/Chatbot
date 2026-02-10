// Welcome Screen Component
'use client';
import React from 'react';

interface WelcomeScreenProps {
    userName?: string;
}

export default function WelcomeScreen({ userName = "Nishant" }: WelcomeScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center px-8 max-w-[800px] mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-normal leading-tight mb-4 text-[var(--text-secondary)]">
                    Hello, <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-purple)] bg-clip-text text-transparent font-medium">{userName}</span>.
                </h1>
                <p className="text-5xl font-normal text-[var(--text-light)]">How can I help you today?</p>
            </div>
        </div>
    );
}
