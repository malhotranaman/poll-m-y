import React, { useState, useEffect, useRef } from 'react';
import './ChatTerminal.css';
import { FaArrowUp } from 'react-icons/fa';
import { ImParagraphJustify } from 'react-icons/im';
import SurveyPopup from './SurveyPopup';
import { Book } from '../App';
import { ChatMessage } from '../types/ChatMessage';
import OpenAI from "openai";
import axios from "axios";


interface ChatTerminalProps {
    library: Book[];
}

const ChatTerminal: React.FC<ChatTerminalProps> = ({ library }) => {
    const [message, setMessage] = useState('');
    const [showSurvey, setShowSurvey] = useState(false);
    const [surveyResponses, setSurveyResponses] = useState<string[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    // Ref to hold the chat display element
    const chatDisplayRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };



    const handleSubmit = async () => {
        if (!message.trim()) return;

        // Add user's message to chat history
        const userMessage: ChatMessage = { sender: 'user', text: message };
        setChatHistory((prevHistory) => [...prevHistory, userMessage]);

        // Combine survey questions and responses
        const formattedSurveyResponses = surveyResponses
            .map((response, index) => `Question ${index + 1}: ${response}`)
            .join('\n');

        // Combine the book details from the library
        const formattedLibrary = library
            .map((book) => `Book Title: ${book.title}, Author: ${book.authors?.join(', ')}`)
            .join('\n');

        // Combine message, survey responses, and library books into one query string
        const combinedQuery = `
        ${message}\n
    `;

        try {
            const aiResponseText = await generateAiResponse(combinedQuery);

            // Add AI's response to chat history
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText.toString()};
            setChatHistory((prevHistory) => [...prevHistory, aiMessage]);
        } catch (error) {
            console.error('Error generating AI response:', error);

        } finally {
            setMessage('');
        }
    };

    const generateAiResponse = async (query: string): Promise<string> => {
        try {

            const openai = new OpenAI({
                apiKey: '',
                dangerouslyAllowBrowser: true})

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                max_tokens: 10,
                temperature: 0.85,
                messages: [
                    { role: "system", content: ""},
                    {
                        role: "user",
                        content: query,
                    },
                ],
            });

            // @ts-ignore
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            throw new Error('An error occurred while fetching the response.');
        }
    };

    const handleContext = () => {
        setShowSurvey(true); // Open the survey popup
    };

    const handleCloseSurvey = () => {
        setShowSurvey(false); // Close the survey popup
    };

    const saveSurveyResponses = (questions: string[], responses: string[]) => {
        setSurveyResponses(responses);
        setShowSurvey(false); // Close the survey popup after saving
    };

    // Scroll to the bottom of the chat when a new message is addedv
    useEffect(() => {
        if (chatDisplayRef.current) {
            chatDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [chatHistory]);

    return (
        <div className="chat-terminal">
            <div className="chat-display">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
                        {msg.text}
                    </div>
                ))}
                {/* Dummy element to ensure scrolling works */}
                <div ref={chatDisplayRef}></div>
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Message"
                />
                <button className="chat-input button" onClick={handleSubmit}>
                    <FaArrowUp />
                </button>
                <button className="context button" onClick={handleContext}>
                    <ImParagraphJustify />
                </button>
            </div>
            {showSurvey && (
                <SurveyPopup
                    onClose={handleCloseSurvey}
                    onSubmit={saveSurveyResponses}
                    initialResponses={surveyResponses} // Pass last responses to SurveyPopup
                />
            )}
        </div>
    );
};

export default ChatTerminal;