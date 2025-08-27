import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    return (
        <section id="projects">
            <h2>Projects</h2>
            <div className="project-grid">
                <div className="project-card">
                    <div className="project-header">
                        <h3>Autonomous AI Research Agent</h3>
                        <div className="project-links">
                            <a href="https://github.com/Prathamesh28/researchAssist" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                            {/* Replace '#' with the actual demo link */}
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Demo"><FaExternalLinkAlt /></a>
                        </div>
                    </div>
                    <p>An Agentic AI system with 5 specialized agents for autonomous literature review, experiment planning, and starter code generation using RAG-enhanced LLaMA.</p>
                    <div className="project-tech-list">
                        <span>Python</span>
                        <span>LangChain</span>
                        <span>FAISS</span>
                        <span>Streamlit</span>
                    </div>
                </div>

                <div className="project-card">
                     <div className="project-header">
                        <h3>WindHack</h3>
                        <div className="project-links">
                            <a href="https://github.com/Prathamesh28/WindHack" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                        </div>
                    </div>
                    <p>Predicted wind turbine power output using time-series forecasting and gradient boosting models, accurate for up to 72 hours.</p>
                     <div className="project-tech-list">
                        <span>Python</span>
                        <span>PyTorch</span>
                        <span>CatBoost</span>
                        <span>Flask</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;