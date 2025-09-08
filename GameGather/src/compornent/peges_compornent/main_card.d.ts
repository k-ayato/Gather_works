import React from 'react';
interface GameCardProps {
    id: string;
    gameTitle: string;
    description: string;
    currentMembers: number;
    maxMembers: number;
    tags: string[];
    iconPath: string;
}
declare const GameCard: React.FC<GameCardProps>;
export default GameCard;
