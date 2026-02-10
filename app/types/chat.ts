export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
}

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

export interface ChatState {
    chats: Chat[];
    activeChat: string | null;
}
