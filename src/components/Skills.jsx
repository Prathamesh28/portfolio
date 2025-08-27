import React from 'react';
import './Skills.css';

// We'll define our skills in a clean, categorized structure.
const skillCategories = [
    {
        title: "Machine Learning & Deep Learning",
        skills: ["PyTorch", "TensorFlow", "Transformers", "LLM Fine-tuning", "RAG", "Agentic AI", "Deep Learning"]
    },
    {
        title: "Programming & Data",
        skills: ["Python", "PySpark", "Pandas", "NumPy", "C++", "JavaScript"]
    },
    {
        title: "Tools & Platforms",
        skills: ["Airflow", "GCP", "Vector DBs", "Git", "Docker", "MongoDB", "MySQL"]
    }
];

const Skills = () => {
    return (
        <div className="skills-container">
            <h2>Core Competencies</h2>
            <div className="skills-content">
                {skillCategories.map((category) => (
                    <div key={category.title} className="skill-category">
                        <h3>{category.title}</h3>
                        <div className="skill-grid">
                            {category.skills.map((skill) => (
                                <div key={skill} className="skill-tile">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;