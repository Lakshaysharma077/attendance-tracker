import React from 'react';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
    return (
        <div className="stats-card">
            <div className="icon">{icon}</div>
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
};

export default StatsCard;