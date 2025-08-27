import React, { useRef, useEffect, useState, useCallback } from 'react';
import './InteractiveDemo.css';

// --- Helper Functions can remain the same ---
const createPoint = (x, y, label) => ({ x, y, label });
const createCluster = (n, centerX, centerY, label, spread = 50) => {
    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * spread;
        points.push(createPoint(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle), label));
    }
    return points;
};

const InteractiveDemo = () => {
    const canvasRef = useRef(null);
    const [isTraining, setIsTraining] = useState(false);
    const [metrics, setMetrics] = useState({ epoch: 0, loss: 0.69, accuracy: 50 });
    const animationFrameId = useRef(null);

    // ... all the existing logic (useRef, useCallback, useEffects) remains the same ...
    const dataPoints = useRef([
        ...createCluster(50, 100, 100, 0),
        ...createCluster(50, 250, 250, 1)
    ]).current;

    const draw = useCallback((ctx, angle, offset) => {
        const { width, height } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);

        dataPoints.forEach(p => {
            ctx.fillStyle = p.label === 0 ? 'rgba(100, 255, 218, 0.7)' : 'rgba(247, 129, 102, 0.7)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });

        ctx.strokeStyle = '#ccd6f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const x1 = 0;
        const y1 = (-Math.cos(angle) * x1 + offset) / Math.sin(angle);
        const x2 = width;
        const y2 = (-Math.cos(angle) * x2 + offset) / Math.sin(angle);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }, [dataPoints]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const initialAngle = 1.8;
        const initialOffset = 250;
        draw(ctx, initialAngle, initialOffset);
    }, [draw]);

    useEffect(() => {
        if (isTraining) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let frame = 0;
            const totalFrames = 180;

            const angle = { current: 1.8 };
            const offset = { current: 250 };
            const targetAngle = Math.PI / 4;
            const targetOffset = 175;

            const animate = () => {
                if (frame >= totalFrames) {
                    setIsTraining(false);
                    draw(ctx, targetAngle, targetOffset);
                    return;
                }

                const progress = frame / totalFrames;
                angle.current += (targetAngle - angle.current) * 0.05;
                offset.current += (targetOffset - offset.current) * 0.05;

                const loss = 0.69 * (1 - progress) + 0.02;
                const accuracy = 50 + 48 * progress;
                setMetrics({
                    epoch: Math.floor(progress * 100),
                    loss: loss.toFixed(2),
                    accuracy: Math.round(accuracy)
                });
                
                draw(ctx, angle.current, offset.current);
                frame++;
                animationFrameId.current = requestAnimationFrame(animate);
            };
            animate();
        }
        
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isTraining, draw]);


    return (
        // The JSX is now simpler, without the scroll wrapper
        <div className="demo-container">
            <div className="canvas-wrapper">
                <canvas ref={canvasRef} width="350" height="350"></canvas>
            </div>
            <div className="controls">
                <h2>Interactive Demo</h2>
                <h3>Train a Simple Classifier</h3>
                <p>Click the button to train a model to separate the two data clusters. Watch the metrics improve as the decision boundary adjusts.</p>
                <div className="metrics">
                    <div>Epoch: <span>{metrics.epoch}</span></div>
                    <div>Loss: <span>{metrics.loss}</span></div>
                    <div>Accuracy: <span>{metrics.accuracy}%</span></div>
                </div>
                <button onClick={() => !isTraining && setIsTraining(true)} disabled={isTraining}>
                    {isTraining ? 'Training...' : 'Train Model'}
                </button>
            </div>
        </div>
    );
};

export default InteractiveDemo;