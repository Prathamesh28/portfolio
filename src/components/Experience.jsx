import React from 'react';
import './Experience.css';

const Experience = () => {
    return (
        <div className="section-content-wrapper">
            <h2>Work Experience</h2>
            <div className="job">
                <h3><span className="job-title">Data Scientist</span> @ Walmart Global Tech</h3>
                <p className="job-date">Bengaluru | July 2023 - Present</p>
                <ul>
                    <li>
                        <strong>Two-Tower Deep Learning Model:</strong> Achieved a <strong>+9% CTR uplift</strong> during A/B testing by architecting a large-scale model for audience targeting, processing over 20B+ interactions for 300M+ users.
                    </li>
                    <li>
                        <strong>Optimized Embedding Efficiency:</strong> Slashed computation costs by <strong>60%</strong> and storage cost by <strong>65%</strong> by deploying an AutoEncoder for dimensionality reduction (384D→128D).
                    </li>
                    <li>
                        <strong>Automated Sentiment Analysis:</strong> Built an end-to-end NLP pipeline with BERTopic, LLaMA2 and Airflow to automatically extract user sentiment from ad feedback and serve into a real-time dashboard.
                    </li>
                    <li>
                        <strong>Enabled Self-Serve AI:</strong> Fine-tuned an LLM for custom ad attribute extraction, enabling automated recommendations on a self-serve advertiser UI.
                    </li>
                </ul>
            </div>
            <div className="job">
                <h3><span className="job-title">Software Development Engineer Intern</span> @ Myntra</h3>
                <p className="job-date">Bengaluru | May 2022 - July 2022</p>
                <ul>
                    <li>Redesigned Help Center configuration using OOD principles, reducing config size by 60%.</li>
                    <li>Improved the retrieval algorithm's time complexity from O(N) to O(log N).</li>
                </ul>
            </div>
        </div>
    );
};

export default Experience;