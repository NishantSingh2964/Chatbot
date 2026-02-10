'use client';
import React from 'react';
import { Chat } from '@/app/types/chat';

interface SidebarProps {
  isOpen: boolean;
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export default function Sidebar({
  isOpen,
  chats,
  activeChat,
  onChatSelect,
  onNewChat,
  onDeleteChat,
}: SidebarProps) {
  const getPreviewText = (chat: Chat): string => {
    if (chat.messages.length === 0) return 'New chat';
    const firstMessage = chat.messages[0];
    return firstMessage.text.length > 40
      ? firstMessage.text.substring(0, 40) + '...'
      : firstMessage.text;
  };

  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] transition-all duration-300 z-[90] ${isOpen ? 'w-64' : 'w-[72px]'
        } overflow-hidden shadow-xl`}
    >
      <div className="flex flex-col h-full pt-16">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-3 px-4 py-4 hover:bg-[var(--sidebar-hover)] transition-all duration-200 border-b border-white/5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary-indigo)] transition-colors">
            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span
            className={`text-sm font-semibold text-white/90 whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
              }`}
          >
            New Chat
          </span>
        </button>

        {/* Recent Label */}
        {chats.length > 0 && (
          <div className="px-5 py-4">
            <span
              className={`text-[10px] uppercase tracking-wider font-bold text-white/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            >
              Recent Conversations
            </span>
          </div>
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">
          {chats.length === 0 ? (
            <div className={`px-4 py-8 text-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-xs text-white/30">Your history will appear here</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative mx-1 my-0.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${activeChat === chat.id
                  ? 'bg-white/10 shadow-sm'
                  : 'hover:bg-white/5'
                  }`}
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className={`w-5 h-5 transition-colors ${activeChat === chat.id ? 'text-[var(--primary-indigo)]' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div
                    className={`flex-1 min-w-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <p className={`text-sm truncate ${activeChat === chat.id ? 'text-white font-medium' : 'text-white/70 font-normal'}`}>
                      {getPreviewText(chat)}
                    </p>
                  </div>
                  {/* Delete Button */}
                  {isOpen && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/20 rounded-lg group/del"
                    >
                      <svg className="w-4 h-4 text-white/20 group-hover/del:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-white/5 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/5 transition-colors group">
            <svg className="w-5 h-5 text-white/40 group-hover:text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-sm text-white/60 group-hover:text-white/90 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Help</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/5 transition-colors group">
            <svg className="w-5 h-5 text-white/40 group-hover:text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`text-sm text-white/60 group-hover:text-white/90 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
