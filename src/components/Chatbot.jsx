import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import './Chatbot.css';

const questions = [
    {
        question: "What was his impact at Walmart?",
        answer: "At Walmart, he developed a Two-Tower deep learning model that boosted CTR by 9% and an AutoEncoder that cut computation costs by 60%. He also built an end-to-end LLM pipeline for analyzing user feedback."
    },
    {
        question: "What are his key technical skills?",
        answer: "His main areas are Machine Learning, Deep Learning, LLM Fine-tuning, and RAG. He is proficient in Python, PySpark, PyTorch, and tools like Airflow and GCP."
    },
    {
        question: "Tell me about his AI Agent project.",
        answer: "He created an Autonomous AI Research Agent that uses 5 specialized AI agents to automate literature reviews and experiment planning. It leverages LangChain and FAISS for retrieval-augmented generation (RAG)."
    }
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hello! I am an AI assistant. Ask a question to learn about Prathamesh.' }
    ]);
    const chatBodyRef = useRef(null);

    // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleQuestionClick = (question, answer) => {
        const userMessage = { from: 'user', text: question };
        const botMessage = { from: 'bot', text: answer };
        setMessages([...messages, userMessage, botMessage]);
    };

    return (
        <>
            <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaRobot />}
            </button>
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">AI Assistant</div>
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, index) => (
                        <p key={index} className={`chat-message ${msg.from}`}>
                            {msg.text}
                        </p>
                    ))}
                </div>
                <div className="chat-questions">
                    {questions.map((q, index) => (
                        <button key={index} onClick={() => handleQuestionClick(q.question, q.answer)}>
                            {q.question}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Chatbot;