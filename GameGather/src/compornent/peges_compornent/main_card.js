import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const GameCard = ({ gameTitle, description, currentMembers, maxMembers, tags, iconPath, }) => {
    const handleJoin = () => {
        // 参加ボタンがクリックされたときの処理を記述
        console.log('参加ボタンがクリックされました');
    };
    return (_jsxs("div", { className: "game-card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "game-title", children: gameTitle }), _jsxs("div", { className: "member-info", children: [_jsx("img", { src: iconPath, alt: "\u30E1\u30F3\u30D0\u30FC\u30A2\u30A4\u30B3\u30F3", width: "24", height: "24" }), _jsxs("span", { className: "member-count", children: [currentMembers, " / ", maxMembers] })] })] }), _jsx("div", { className: "card-body", children: _jsx("p", { className: "description", children: description }) }), _jsxs("div", { className: "card-footer", children: [_jsx("div", { className: "tags", children: tags.map((tag, index) => (_jsx("span", { className: "tag", children: tag }, index))) }), _jsx("button", { className: "join-button", onClick: handleJoin, children: "\u53C2\u52A0\u3059\u308B" })] })] }));
};
export default GameCard;
