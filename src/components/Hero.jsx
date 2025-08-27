import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import './Hero.css'; // Make sure the CSS file is imported

const bios = [
    "I'm a Data Scientist @ Walmart with 2+ years of experience in building large-scale deep learning models and end-to-end ML pipelines. I thrive on translating complex data into actionable insights and impactful solutions.",
    "As a machine learning professional, I focus on creating efficient and scalable solutions. My experience includes developing recommendation systems, NLP pipelines, and cost-saving model optimizations.",
    "I build intelligent systems. From fine-tuning LLMs for custom attribute extraction to deploying demographic prediction models, my work is centered on practical, high-impact AI."
];

const Hero = () => {
    const [currentBioIndex, setCurrentBioIndex] = useState(0);

    const handleGenerateBio = () => {
        setCurrentBioIndex((prevIndex) => (prevIndex + 1) % bios.length);
    };

    return (
        <section className="hero">
            <p className="hero-greeting">Hi, my name is</p>
            <h1 className="hero-name">Prathamesh Wagh.</h1>
            <p className="hero-subtitle">
                <ReactTyped
                    strings={["Data Scientist.", "Machine Learning Engineer.", "AI Engineer."]}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                />
            </p>
            <div className="hero-intro">
                <p>{bios[currentBioIndex]}</p>
            </div>
            <button onClick={handleGenerateBio} className="hero-btn">
                Generate New Bio
            </button>
        </section>
    );
};

export default Hero;