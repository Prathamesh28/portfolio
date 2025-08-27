import React from 'react';
// Importing icons for a more visual layout
import { FaTrophy, FaAward, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import './Awards.css';

const Awards = () => {
    return (
        <section id="awards">
            <h2>Awards & Achievements</h2>
            <div className="awards-grid">

                <div className="award-card">
                    <FaTrophy className="award-icon" />
                    <h3>Minsky Award, Cypher 2024</h3>
                    <p>Best AI Implementation for a 1P demographic data prediction model.</p>
                </div>

                <div className="award-card">
                    <FaAward className="award-icon" />
                    <h3>Hackathon Winner</h3>
                    <p>Won the 'Best in Execution' category at the Marketing & Advertising Tech Hackathon 2024.</p>
                </div>

                <div className="award-card">
                    <FaLaptopCode className="award-icon" />
                    <h3>Competitive Programming</h3>
                    <p>Specialist (1537) on Codeforces and 4 Star (1828) on Codechef.</p>
                </div>

                <div className="award-card">
                    <FaChartLine className="award-icon" />
                    <h3>Top Performance</h3>
                    <p>Achieved a Global Rank of 193 in a Codechef Division 2 round.</p>
                </div>

            </div>
        </section>
    );
};

export default Awards;