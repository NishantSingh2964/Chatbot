'use client';
import React from 'react';
import { Message } from '@/app/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DataGrid from '@/app/components/ui/DataGrid';
import { default as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.sender === 'user';
    const timestamp = new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    return (
        <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-purple)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                </div>
            )}

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-purple)] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}

            {/* Message Bubble */}
            <div className={`max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                    className={`rounded-2xl px-4 py-2 ${isUser
                        ? 'bg-[var(--primary-blue)] text-white rounded-br-sm'
                        : 'bg-[var(--card-background)] text-[var(--text-primary)] rounded-bl-sm'
                        }`}
                >
                    <div className={`text-sm leading-relaxed ${isUser ? '' : 'prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5'}`}>
                        {isUser ? (
                            <p className="whitespace-pre-wrap break-words">{message.text}</p>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        // Grid Detection Logic
                                        const isJson = /language-json/.test(className || '');
                                        const isGridExplicit = /:grid/.test(className || '');

                                        if (!inline && (isJson || isGridExplicit)) {
                                            try {
                                                const content = String(children).replace(/\n$/, '');
                                                const parsed = JSON.parse(content);

                                                // Handle varying structures:
                                                // 1. Array: [...]
                                                // 2. Wrapped: { grid: [...] } or { data: [...] }
                                                const data = Array.isArray(parsed) ? parsed : (parsed.grid || parsed.data);

                                                // Check if it's an array of objects
                                                if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
                                                    return <DataGrid data={data} />;
                                                }
                                            } catch (e) {
                                                // Not valid JSON grid, fall back to code block
                                            }
                                        }

                                        return !inline && /language-(\w+)/.exec(className || '') ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={(/language-(\w+)/.exec(className || '') || [])[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
                <span className="text-xs text-[var(--text-light)] mt-1 px-1">
                    {timestamp}
                </span>
            </div>
        </div>
    );
}
