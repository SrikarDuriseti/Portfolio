
import React, { useState, useEffect, useRef } from 'react';
import { startChat, streamChatResponse } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon } from './IconComponents';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface AIAssistantProps {
    resumeContext: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeContext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            startChat(resumeContext);
            setMessages([{ sender: 'ai', text: "Hello! I'm Srikar's AI assistant. Ask me anything about his resume." }]);
        }
    }, [isOpen, resumeContext]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiMessage: Message = { sender: 'ai', text: "" };
        setMessages(prev => [...prev, aiMessage]);

        try {
            const stream = await streamChatResponse(input);
            let currentText = '';
            for await (const chunk of stream) {
                currentText += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { sender: 'ai', text: currentText };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!process.env.API_KEY) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-110 z-50 animate-pulse"
                aria-label="Open AI Assistant"
            >
                <ChatIcon />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-blue-950 border border-blue-700 w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl flex flex-col">
                        <header className="flex justify-between items-center p-4 border-b border-blue-700">
                            <h2 className="text-xl font-bold gradient-text">AI Assistant</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                               <CloseIcon/>
                            </button>
                        </header>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-gray-200'}`}>
                                       {msg.text}
                                       {isLoading && msg.sender === 'ai' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-amber-300 ml-1 animate-ping"></span>}
                                    </div>
                                </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                        
                        <footer className="p-4 border-t border-blue-700">
                            <div className="flex items-center bg-blue-900/70 rounded-lg">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about my experience..."
                                    className="w-full bg-transparent p-3 text-white focus:outline-none"
                                    disabled={isLoading}
                                />
                                <button onClick={handleSend} disabled={isLoading} className="p-3 text-amber-400 hover:text-amber-300 disabled:text-gray-600">
                                    <SendIcon/>
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;