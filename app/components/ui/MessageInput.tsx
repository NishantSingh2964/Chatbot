// Message Input Component
'use client';
import React, { useState, useRef } from 'react';
import { ImageIcon, SendIcon } from '../icons/Icons';

interface MessageInputProps {
    onSendMessage: (message: string, image?: string) => void;
    placeholder?: string;
}

export default function MessageInput({
    onSendMessage,
    placeholder = "Ask anything..."
}: MessageInputProps) {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() || selectedImage) {
            onSendMessage(message, previewUrl || undefined);
            setMessage('');
            handleRemoveImage();
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            // Reset file input value so the same file can be selected again
            e.target.value = '';
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedImage(null);
        setPreviewUrl(null);
    };

    return (
        <div className="fixed bottom-0 left-[72px] right-0 bg-[var(--background)] p-6 px-8 border-t border-[var(--border-color)] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
            <form className="max-w-[900px] mx-auto relative bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-3xl px-6 py-4 flex flex-col gap-3 transition-all duration-300 focus-within:border-[var(--primary-indigo)] focus-within:shadow-[0_8px_32px_rgba(99,102,241,0.08)]" onSubmit={handleSubmit}>
                {previewUrl && (
                    <div className="relative w-20 h-20 mb-2 group">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl border border-[var(--border-color)] shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <input
                        type="text"
                        className="flex-1 border-none bg-transparent text-base text-[var(--text-primary)] outline-none py-1 placeholder:text-[var(--text-light)] font-medium"
                        placeholder={placeholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="w-10 h-10 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--hover-background)] hover:text-[var(--text-primary)]"
                            aria-label="Upload image"
                        >
                            <ImageIcon />
                        </button>
                        <button
                            type="submit"
                            disabled={!message.trim() && !selectedImage}
                            className={`w-10 h-10 rounded-xl border-none flex items-center justify-center transition-all duration-300 ${(message.trim() || selectedImage)
                                ? 'bg-[var(--primary-indigo)] text-white cursor-pointer shadow-lg shadow-indigo-500/20 transform hover:scale-105 active:scale-95'
                                : 'bg-[var(--hover-background)] text-[var(--text-light)] cursor-not-allowed opacity-50'
                                }`}
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </form>
            <p className="text-center text-xs text-[var(--text-light)] mt-3 max-w-[900px] mx-auto">
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
            </p>
        </div>
    );
}
