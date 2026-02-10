'use client';
import React, { useEffect, useRef } from 'react';
import { Message } from '@/app/types/chat';
import ChatMessage from './ChatMessage';

interface ChatViewProps {
    messages: Message[];
    isTyping?: boolean;
}

export default function ChatView({ messages, isTyping = false }: ChatViewProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [messages, isTyping]);

    return (
        <div className="h-full overflow-y-auto px-6 py-4 scroll-smooth">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-[var(--text-light)] text-sm">
                        No messages yet. Start the conversation!
                    </p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto">
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message}
                        />
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-purple)] flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <div className="bg-[var(--card-background)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                                <div className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
}
