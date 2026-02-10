// Message Input Component
'use client';
import React, { useState } from 'react';
import { ImageIcon, MicIcon } from '../icons/Icons';

interface MessageInputProps {
    onSendMessage?: (message: string) => void;
    placeholder?: string;
}

export default function MessageInput({
    onSendMessage,
    placeholder = "Ask anything..."
}: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage?.(message);
            setMessage('');
        }
    };

    return (
        <div className="fixed bottom-0 left-[72px] right-0 bg-[var(--background)] p-6 px-8 border-t border-[var(--border-color)]">
            <form className="max-w-[900px] mx-auto relative bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-3xl px-6 py-3 flex items-center gap-3 transition-all duration-200 focus-within:border-[var(--primary-blue)] focus-within:shadow-[0_0_0_3px_rgba(66,133,244,0.1)]" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="flex-1 border-none bg-transparent text-base text-[var(--text-primary)] outline-none py-2 placeholder:text-[var(--text-light)]"
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center gap-2">
                    <button type="button" className="w-9 h-9 rounded-lg border-none bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--hover-background)] hover:text-[var(--text-primary)]" aria-label="Upload image">
                        <ImageIcon />
                    </button>
                    <button type="button" className="w-9 h-9 rounded-lg border-none bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--hover-background)] hover:text-[var(--text-primary)]" aria-label="Voice input">
                        <MicIcon />
                    </button>
                </div>
            </form>
            <p className="text-center text-xs text-[var(--text-light)] mt-3 max-w-[900px] mx-auto">
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
            </p>
        </div>
    );
}
