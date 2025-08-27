import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiCodeforces } from 'react-icons/si';
import './Connect.css';

const Connect = () => {
    return (
        <section id="connect">
            <h2>Get In Touch</h2>
            <p className="connect-text">
                My inbox is always open. Whether you have a question, a project proposal, or just want to say hello, I'll get back to you!
            </p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/prathamesh-wagh-0770811a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://github.com/Prathamesh28" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://codeforces.com/profile/pratham__28" target="_blank" rel="noopener noreferrer" aria-label="CodeForces"><SiCodeforces /></a>
                <a href="mailto:prathamesh.28wagh@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
        </section>
    );
};

export default Connect;