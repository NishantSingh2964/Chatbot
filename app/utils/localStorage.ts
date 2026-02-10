import { Chat, ChatState } from '../types/chat';

const STORAGE_KEY = 'chatbot_history';

export const loadChatsFromStorage = (): ChatState => {
    if (typeof window === 'undefined') {
        return { chats: [], activeChat: null };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading chats from localStorage:', error);
    }

    return { chats: [], activeChat: null };
};

export const saveChatsToStorage = (state: ChatState): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error saving chats to localStorage:', error);
    }
};

export const clearChatStorage = (): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing chat storage:', error);
    }
};
