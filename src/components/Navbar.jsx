import React from 'react';
import './Navbar.css';

const Navbar = ({ sections, currentSectionIndex, onNavigate }) => {
    
    const formatLabel = (id) => {
        if (id === 'interactive-demo') return 'Demo';
        return id.charAt(0).toUpperCase() + id.slice(1);
    };

    return (
        <header className="navbar-container">
            <div className="navbar-logo">
                <a onClick={() => onNavigate(0)} aria-label="Go to home section">PW</a>
            </div>
            <nav>
                <ol className="navbar-links">
                    {sections.map((sectionId, index) => (
                        <li key={sectionId}>
                            <button
                                className={index === currentSectionIndex ? 'active' : ''}
                                onClick={() => onNavigate(index)}
                            >
                                {formatLabel(sectionId)}
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>
        </header>
    );
};

export default Navbar;