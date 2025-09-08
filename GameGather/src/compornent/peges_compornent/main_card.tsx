import React from 'react';

// カードのデータ構造を定義する型
interface GameCardProps {
id: string; // データの識別子
gameTitle: string;
description: string;
currentMembers: number;
maxMembers: number;
tags: string[];
iconPath: string; // アイコン画像のパス
}

const GameCard: React.FC<GameCardProps> = ({
gameTitle,
description,
currentMembers,
maxMembers,
tags,
iconPath,
}) => {
const handleJoin = () => {
    // 参加ボタンがクリックされたときの処理を記述
    console.log('参加ボタンがクリックされました');
};

return (
    <div className="game-card">
    <div className="card-header">
        <h3 className="game-title">{gameTitle}</h3>
        <div className="member-info">
        <img src={iconPath} alt="メンバーアイコン" width="24" height="24" />
        <span className="member-count">
            {currentMembers} / {maxMembers}
        </span>
        </div>
    </div>
    <div className="card-body">
        <p className="description">{description}</p>
    </div>
    <div className="card-footer">
        <div className="tags">
        {tags.map((tag, index) => (
            <span key={index} className="tag">
            {tag}
            </span>
        ))}
        </div>
        <button className="join-button" onClick={handleJoin}>
        参加する
        </button>
    </div>
    </div>
);
};

export default GameCard;