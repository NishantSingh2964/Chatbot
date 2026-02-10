'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import WelcomeScreen from './components/ui/WelcomeScreen';
import SuggestionGrid from './components/ui/SuggestionGrid';
import ChatView from './components/ui/ChatView';
import MessageInput from './components/ui/MessageInput';
import { Chat, Message, ChatState } from './types/chat';
import { loadChatsFromStorage, saveChatsToStorage } from './utils/localStorage';

interface HomeProps { }

export default function Home({ }: HomeProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({ chats: [], activeChat: null });
  const [isTyping, setIsTyping] = useState(false);

  // Load chats from localStorage on mount
  useEffect(() => {
    const loaded = loadChatsFromStorage();
    setChatState(loaded);
  }, []);

  // Save to localStorage whenever chatState changes
  useEffect(() => {
    if (chatState.chats.length > 0 || chatState.activeChat) {
      saveChatsToStorage(chatState);
    }
  }, [chatState]);

  const handleNewChat = () => {
    setChatState(prev => ({ ...prev, activeChat: null }));
  };

  const handleChatSelect = (chatId: string) => {
    setChatState(prev => ({ ...prev, activeChat: chatId }));
  };

  const handleDeleteChat = (chatId: string) => {
    setChatState(prev => {
      const newChats = prev.chats.filter(chat => chat.id !== chatId);
      const newActiveChat = prev.activeChat === chatId ? null : prev.activeChat;
      return { chats: newChats, activeChat: newActiveChat };
    });
  };

  const handleSendMessage = async (text: string, imageData?: string) => {
    const now = Date.now();
    const userMessage: Message = {
      id: `msg-${now}`,
      text,
      sender: 'user',
      timestamp: now,
      image: imageData,
    };

    let updatedChats = [...chatState.chats];
    let currentChatId = chatState.activeChat;

    // If no active chat, create a new one
    if (!currentChatId) {
      const newChat: Chat = {
        id: `chat-${now}`,
        title: text.substring(0, 50),
        messages: [userMessage],
        createdAt: now,
        updatedAt: now,
      };
      updatedChats = [newChat, ...updatedChats];
      currentChatId = newChat.id;
    } else {
      updatedChats = updatedChats.map(chat =>
        chat.id === currentChatId
          ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            updatedAt: now,
          }
          : chat
      );
    }

    setChatState({
      chats: updatedChats,
      activeChat: currentChatId,
    });

    // Call Gemini API
    await callGeminiAPI(currentChatId, updatedChats);
  };

  const callGeminiAPI = async (chatId: string, currentChats: Chat[]) => {
    setIsTyping(true);
    const chat = currentChats.find(c => c.id === chatId);
    if (!chat) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chat.messages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `msg-${Date.now()}`,
        text: data.text,
        sender: 'bot',
        timestamp: Date.now(),
      };

      setChatState(prev => ({
        ...prev,
        chats: prev.chats.map(c =>
          c.id === chatId
            ? {
              ...c,
              messages: [...c.messages, botMessage],
              updatedAt: Date.now(),
            }
            : c
        ),
      }));
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: Date.now(),
      };

      setChatState(prev => ({
        ...prev,
        chats: prev.chats.map(c =>
          c.id === chatId
            ? {
              ...c,
              messages: [...c.messages, errorMessage],
              updatedAt: Date.now(),
            }
            : c
        ),
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    handleSendMessage(suggestion.title);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const activeChat = chatState.chats.find(chat => chat.id === chatState.activeChat);
  const showWelcome = !activeChat;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar
        isOpen={sidebarOpen}
        chats={chatState.chats}
        activeChat={chatState.activeChat}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <Header
        userName="Nishant"
        onToggleSidebar={toggleSidebar}
      />

      <main
        className={`mt-16 h-[calc(100vh-64px-120px)] overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-[72px]'
          }`}
      >
        {showWelcome ? (
          <div className="flex flex-col gap-8 pt-8 min-h-full justify-center">
            <WelcomeScreen userName="Nishant" />
            <SuggestionGrid onSuggestionClick={handleSuggestionClick} />
          </div>
        ) : (
          <ChatView
            messages={activeChat?.messages || []}
            isTyping={isTyping}
          />
        )}
      </main>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
