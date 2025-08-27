import React, { useEffect, useRef } from 'react';
import './Transition.css';

const Transition = ({ isTransitioning, onAnimationComplete }) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        if (isTransitioning) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const layerDefinitions = [4, 6, 6, 4];
            const nodes = [];
            const connections = [];

            const layerSpacing = canvas.width / (layerDefinitions.length + 1);
            layerDefinitions.forEach((numNodes, layerIndex) => {
                const layerNodes = [];
                const nodeSpacing = canvas.height / (numNodes + 1);
                for (let i = 0; i < numNodes; i++) {
                    const x = layerSpacing * (layerIndex + 1);
                    const y = nodeSpacing * (i + 1);
                    layerNodes.push({ x, y });
                }
                nodes.push(layerNodes);
            });

            for (let i = 0; i < nodes.length - 1; i++) {
                for (const node1 of nodes[i]) {
                    for (const node2 of nodes[i + 1]) {
                        connections.push({ from: node1, to: node2 });
                    }
                }
            }

            const animationDuration = 1200;
            let startTime = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const activeLayer = Math.floor(progress * (layerDefinitions.length - 1));

                ctx.strokeStyle = 'rgba(136, 146, 176, 0.1)';
                ctx.lineWidth = 0.5;
                connections.forEach(conn => {
                    ctx.beginPath();
                    ctx.moveTo(conn.from.x, conn.from.y);
                    ctx.lineTo(conn.to.x, conn.to.y);
                    ctx.stroke();
                });

                ctx.strokeStyle = '#64ffda';
                ctx.lineWidth = 1;
                for (let i = 0; i < nodes.length - 1; i++) {
                    if (i === activeLayer) {
                         for (const node1 of nodes[i]) {
                            for (const node2 of nodes[i + 1]) {
                                ctx.beginPath();
                                ctx.moveTo(node1.x, node1.y);
                                ctx.lineTo(node2.x, node2.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
                
                nodes.forEach((layer, layerIndex) => {
                    layer.forEach(node => {
                        const isActive = layerIndex <= activeLayer;
                        ctx.beginPath();
                        // CHANGED: Increased node radius from 5 to 7 for better visibility.
                        ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
                        ctx.fillStyle = isActive ? '#64ffda' : 'rgba(136, 146, 176, 0.2)';
                        ctx.fill();
                    });
                });
                
                if (progress < 1) {
                    animationFrameId.current = requestAnimationFrame(animate);
                }
            };

            animate(performance.now());

            setTimeout(() => {
                cancelAnimationFrame(animationFrameId.current);
                onAnimationComplete();
            }, animationDuration);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isTransitioning, onAnimationComplete]);
    
    if (!isTransitioning) return null;

    return (
        <div className="transition-overlay">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Transition;