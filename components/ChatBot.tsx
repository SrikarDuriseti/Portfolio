import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from './IconComponents';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // FAQ data with questions and answers
    const faqData = {
        'what is your experience': 'I have 4+ years of experience across aerospace, analytics, and AI domains. Currently working as a Data Analytics Engineer at Quadrant Technologies LLC.',
        'what are your skills': 'My key skills include Python, SQL, Azure OpenAI, Power BI, Machine Learning, Data Engineering, and cloud technologies like Microsoft Azure.',
        'what projects have you worked on': 'I\'ve worked on projects like Data Analysis Business 360 using PowerBI, Speech Emotion Recognition with 92.9% accuracy, Employee Attrition prediction, and AI-powered grant reviewer systems.',
        'tell me about your education': 'I have a Master of Science in Data Science from University of North Texas (2022-2024) and a Bachelor of Technology in Aerospace Engineering from Amrita University (2016-2020).',
        'what is your current role': 'I\'m currently a Data Analytics Engineer at Quadrant Technologies LLC, where I develop AI chatbots, implement semantic indexing, and create automated visualization workflows.',
        'where have you worked': 'I\'ve worked at Quadrant Technologies LLC as Data Analytics Engineer, Outlier AI as Freelance AI Trainer, and Varsity Education Management as Institutional Research Analyst.',
        'what tools do you use': 'I work with tools like Power BI, Tableau, Azure Data Factory, Python, SQL, Alteryx, Apache Airflow, and various AI/ML frameworks.',
        'how can i contact you': 'You can reach me at srikar.duriseti@gmail.com, call me at 940-843-3664, or connect with me on LinkedIn at linkedin.com/in/srikar-duriseti/',
        'what is your background': 'I\'m a Data Enthusiast with expertise in delivering business insights, building scalable data pipelines, and deploying AI-powered solutions with LLM integration.',
        'hello': 'Hello! I\'m Srikar\'s portfolio assistant. I can answer questions about his experience, skills, projects, and background. What would you like to know?',
        'hi': 'Hi there! I\'m here to help you learn more about Srikar\'s professional background. Feel free to ask about his experience, skills, or projects!',
        'help': 'I can answer questions about:\n• Experience and work history\n• Technical skills and tools\n• Projects and achievements\n• Education background\n• Contact information\n\nJust ask me anything!'
    };

    const quickQuestions = [
        "What is your experience?",
        "What are your key skills?",
        "Tell me about your projects",
        "What is your education?",
        "How can I contact you?"
    ];

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ 
                sender: 'bot', 
                text: "Hello! I'm Srikar's portfolio assistant. I can answer questions about his experience, skills, projects, and background. What would you like to know?" 
            }]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const findBestMatch = (userInput: string): string => {
        const input = userInput.toLowerCase().trim();
        
        // Direct matches
        if (faqData[input as keyof typeof faqData]) {
            return faqData[input as keyof typeof faqData];
        }

        // Keyword matching
        const keywords = {
            experience: ['experience', 'work', 'job', 'career', 'employment'],
            skills: ['skill', 'technology', 'tech', 'programming', 'tools', 'software'],
            projects: ['project', 'portfolio', 'work', 'built', 'developed'],
            education: ['education', 'degree', 'university', 'college', 'study'],
            contact: ['contact', 'email', 'phone', 'reach', 'linkedin'],
            background: ['background', 'about', 'who', 'bio', 'profile'],
            tools: ['tool', 'software', 'platform', 'technology', 'framework']
        };

        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => input.includes(word))) {
                switch (category) {
                    case 'experience':
                        return faqData['what is your experience'];
                    case 'skills':
                    case 'tools':
                        return faqData['what are your skills'];
                    case 'projects':
                        return faqData['what projects have you worked on'];
                    case 'education':
                        return faqData['tell me about your education'];
                    case 'contact':
                        return faqData['how can i contact you'];
                    case 'background':
                        return faqData['what is your background'];
                }
            }
        }

        return "I'm not sure about that specific question. I can help you with information about Srikar's experience, skills, projects, education, or contact details. Try asking something like 'What is your experience?' or 'Tell me about your skills.'";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        const botResponse = findBestMatch(input);
        const botMessage: Message = { sender: 'bot', text: botResponse };
        
        setTimeout(() => {
            setMessages(prev => [...prev, botMessage]);
        }, 500);

        setInput('');
    };

    const handleQuickQuestion = (question: string) => {
        const userMessage: Message = { sender: 'user', text: question };
        setMessages(prev => [...prev, userMessage]);
        
        const botResponse = findBestMatch(question);
        const botMessage: Message = { sender: 'bot', text: botResponse };
        
        setTimeout(() => {
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-110 z-50 animate-pulse"
                aria-label="Open Chat Assistant"
            >
                <ChatIcon />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-blue-950 border border-blue-700 w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl flex flex-col">
                        <header className="flex justify-between items-center p-4 border-b border-blue-700">
                            <h2 className="text-xl font-bold gradient-text">Portfolio Assistant</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                               <CloseIcon/>
                            </button>
                        </header>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-md p-3 rounded-lg whitespace-pre-line ${
                                        msg.sender === 'user' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-800 text-gray-200'
                                    }`}>
                                       {msg.text}
                                    </div>
                                </div>
                            ))}
                            
                            {messages.length === 1 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <p className="text-gray-400 text-sm mb-2 w-full">Quick questions:</p>
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            className="bg-blue-800 hover:bg-blue-700 text-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                             <div ref={messagesEndRef} />
                        </div>
                        
                        <footer className="p-4 border-t border-blue-700">
                            <div className="flex items-center bg-blue-900/70 rounded-lg">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about experience, skills, projects..."
                                    className="w-full bg-transparent p-3 text-white focus:outline-none placeholder-gray-400"
                                />
                                <button onClick={handleSend} className="p-3 text-amber-400 hover:text-amber-300">
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

export default ChatBot;