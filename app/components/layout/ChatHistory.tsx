'use client';
import React from 'react';
import { Chat } from '@/app/types/chat';

interface ChatHistoryProps {
    chats: Chat[];
    activeChat: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat: () => void;
    onDeleteChat: (chatId: string) => void;
}

export default function ChatHistory({
    chats,
    activeChat,
    onChatSelect,
    onNewChat,
    onDeleteChat,
}: ChatHistoryProps) {
    const getPreviewText = (chat: Chat): string => {
        if (chat.messages.length === 0) return 'New chat';
        const firstMessage = chat.messages[0];
        return firstMessage.text.length > 50
            ? firstMessage.text.substring(0, 50) + '...'
            : firstMessage.text;
    };

    const getRelativeTime = (timestamp: number): string => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <div className="flex flex-col h-full">
            {/* New Chat Button */}
            <button
                onClick={onNewChat}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--hover-background)] transition-colors border-b border-[var(--border-color)]"
            >
                <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">New Chat</span>
            </button>

            {/* Recent Label */}
            {chats.length > 0 && (
                <div className="px-4 py-2 border-b border-[var(--border-color)]">
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Recent</span>
                </div>
            )}

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {chats.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                        <p className="text-sm text-[var(--text-light)]">No chats yet</p>
                    </div>
                ) : (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`group relative px-4 py-3 cursor-pointer transition-colors ${activeChat === chat.id
                                    ? 'bg-[var(--background-secondary)]'
                                    : 'hover:bg-[var(--hover-background)]'
                                }`}
                            onClick={() => onChatSelect(chat.id)}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--text-primary)] truncate font-normal">
                                        {getPreviewText(chat)}
                                    </p>
                                    <p className="text-xs text-[var(--text-light)] mt-0.5">
                                        {getRelativeTime(chat.updatedAt)}
                                    </p>
                                </div>
                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChat(chat.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[var(--background)] rounded"
                                >
                                    <svg className="w-4 h-4 text-[var(--text-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-[var(--border-color)]">
                <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[var(--hover-background)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-[var(--text-secondary)]">Help</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[var(--hover-background)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm text-[var(--text-secondary)]">Activity</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[var(--hover-background)] transition-colors">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-[var(--text-secondary)]">Settings</span>
                </button>
            </div>
        </div>
    );
}
