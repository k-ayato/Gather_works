import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import "./chat_page.css";
const dummyParticipants = [
    { name: "Alice", img: "https://placehold.jp/40x40.png" },
    { name: "Bob", img: "https://placehold.jp/40x40.png" },
    { name: "Carol", img: "https://placehold.jp/40x40.png" },
];
const ChatPage = () => {
    const [userName, setUserName] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [participants, setParticipants] = useState(dummyParticipants);
    const messagesEndRef = useRef(null);
    // チャット欄を常に最新にスクロール
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // 名前決定時に自分を参加者に追加
    const handleSetName = (e) => {
        e.preventDefault();
        if (!nameInput.trim())
            return;
        setUserName(nameInput.trim());
        if (!participants.find((p) => p.name === nameInput.trim())) {
            setParticipants([
                ...participants,
                { name: nameInput.trim(), img: "https://placehold.jp/40x40.png" },
            ]);
        }
    };
    // メッセージ送信
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || !userName)
            return;
        setMessages([...messages, { user: userName, text: input }]);
        setInput("");
    };
    // 名前未設定なら名前入力画面
    if (!userName) {
        return (_jsx("div", { className: "container", style: { justifyContent: "center", alignItems: "center", display: "flex", height: "100vh" }, children: _jsxs("form", { onSubmit: handleSetName, style: { background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }, children: [_jsx("h2", { style: { marginBottom: 16 }, children: "\u30E6\u30FC\u30B6\u30FC\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" }), _jsx("input", { className: "input-name", placeholder: "\u4F8B: \u3042\u306A\u305F\u306E\u540D\u524D", value: nameInput, onChange: (e) => setNameInput(e.target.value), autoFocus: true, style: { marginBottom: 16 } }), _jsx("button", { className: "send", type: "submit", style: { marginLeft: 8 }, children: "\u6C7A\u5B9A" })] }) }));
    }
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "layout", children: [_jsxs("div", { className: "tab-space", children: [_jsx("h3", { children: "\u30BF\u30D6" }), _jsxs("ul", { children: [_jsx("li", { children: "\u30EB\u30FC\u30E0\u60C5\u5831" }), _jsx("li", { children: "\u30D5\u30A1\u30A4\u30EB" }), _jsx("li", { children: "\u8A2D\u5B9A" })] })] }), _jsxs("div", { className: "chat-container", children: [_jsx("div", { className: "name", children: _jsx("span", { children: "\u30C1\u30E3\u30C3\u30C8\u30EB\u30FC\u30E0\u540D" }) }), _jsx("div", { className: "conversation", children: _jsxs("div", { className: "conversation-container", id: "messages", style: { height: "60vh", overflowY: "auto" }, children: [messages.map((msg, idx) => (_jsxs("div", { className: "message", style: {
                                            background: msg.user === userName ? "#cce5ff" : "#e6f7ff",
                                            alignSelf: msg.user === userName ? "flex-end" : "flex-start",
                                            textAlign: msg.user === userName ? "right" : "left",
                                            marginLeft: msg.user === userName ? "auto" : undefined,
                                            marginRight: msg.user === userName ? 0 : undefined,
                                        }, children: [_jsx("strong", { style: { color: msg.user === userName ? "#2196f3" : "#333" }, children: msg.user }), ": ", msg.text] }, idx))), _jsx("div", { ref: messagesEndRef })] }) }), _jsxs("form", { id: "message-form", className: "conversation-compose", onSubmit: handleSubmit, autoComplete: "off", children: [_jsx("input", { id: "message-input", className: "input-msg", name: "input", placeholder: "\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B", autoComplete: "off", value: input, onChange: (e) => setInput(e.target.value), disabled: !userName }), _jsx("button", { className: "send", type: "submit", "aria-label": "\u30E1\u30C3\u30BB\u30FC\u30B8\u9001\u4FE1", disabled: !input.trim(), children: _jsx("i", { className: "fa fa-paper-plane" }) })] })] }), _jsxs("div", { className: "profile-container", children: [_jsx("h3", { children: "\u53C2\u52A0\u8005" }), _jsx("ul", { id: "participants", className: "participant-list", children: participants.map((p, idx) => (_jsxs("li", { children: [_jsx("img", { src: p.img, alt: p.name }), p.name, p.name === userName && _jsx("span", { style: { color: "#2196f3", marginLeft: 4 }, children: "(\u3042\u306A\u305F)" })] }, idx))) })] })] }) }));
};
export default ChatPage;
