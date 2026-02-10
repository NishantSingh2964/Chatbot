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
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-110 ${isUser
                    ? 'bg-[var(--primary-indigo)] text-white border border-white/20'
                    : 'bg-white border border-[var(--border-color)] text-[var(--primary-indigo)]'
                    }`}>
                    {isUser ? (
                        <span className="text-[10px] font-black leading-none">N</span>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )}
                </div>
                <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${isUser
                    ? 'bg-[var(--primary-indigo)] text-white shadow-indigo-500/20'
                    : 'bg-white border border-[var(--border-color)] text-[var(--text-primary)]'
                    }`}>
                    {message.image && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-white/20 shadow-md">
                            <img src={message.image} alt="Attachment" className="max-w-full max-h-[300px] object-cover" />
                        </div>
                    )}
                    <div className={`prose prose-sm max-w-none font-bold ${isUser ? 'prose-invert !text-white' : 'text-[var(--text-primary)]'}`}>
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
                                        <div className="my-4 rounded-xl overflow-hidden shadow-inner bg-slate-900">
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={(/language-(\w+)/.exec(className || '') || [])[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code className={`${className} bg-slate-100 px-1.5 py-0.5 rounded-md text-indigo-600 font-semibold`} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {message.text}
                        </ReactMarkdown>
                    </div>
                    <span className="text-xs text-[var(--text-light)] mt-1 px-1">
                        {timestamp}
                    </span>
                </div>
            </div>
        </div>
    );
}
