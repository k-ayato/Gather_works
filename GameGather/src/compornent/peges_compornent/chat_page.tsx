import React, { useState, useRef, useEffect } from "react";
import "./chat_page.css";

type Message = {
  user: string;
  text: string;
};

type Participant = {
  name: string;
  img: string;
};

const dummyParticipants: Participant[] = [
  { name: "Alice", img: "https://placehold.jp/40x40.png" },
  { name: "Bob", img: "https://placehold.jp/40x40.png" },
  { name: "Carol", img: "https://placehold.jp/40x40.png" },
];

const ChatPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState<Participant[]>(dummyParticipants);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // チャット欄を常に最新にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 名前決定時に自分を参加者に追加
  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUserName(nameInput.trim());
    if (!participants.find((p) => p.name === nameInput.trim())) {
      setParticipants([
        ...participants,
        { name: nameInput.trim(), img: "https://placehold.jp/40x40.png" },
      ]);
    }
  };

  // メッセージ送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userName) return;
    setMessages([...messages, { user: userName, text: input }]);
    setInput("");
  };

  // 名前未設定なら名前入力画面
  if (!userName) {
    return (
      <div className="container" style={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100vh" }}>
        <form onSubmit={handleSetName} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
          <h2 style={{ marginBottom: 16 }}>ユーザー名を入力してください</h2>
          <input
            className="input-name"
            placeholder="例: あなたの名前"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            autoFocus
            style={{ marginBottom: 16 }}
          />
          <button className="send" type="submit" style={{ marginLeft: 8 }}>
            決定
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="layout">
        {/* 左:タブスペース */}
        <div className="tab-space">
          <h3>タブ</h3>
          <ul>
            <li>ルーム情報</li>
            <li>ファイル</li>
            <li>設定</li>
          </ul>
        </div>

        {/* 中央:チャット欄 */}
        <div className="chat-container">
          <div className="name">
            <span>チャットルーム名</span>
          </div>
          <div className="conversation">
            <div className="conversation-container" id="messages" style={{ height: "60vh", overflowY: "auto" }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="message"
                  style={{
                    background: msg.user === userName ? "#cce5ff" : "#e6f7ff",
                    alignSelf: msg.user === userName ? "flex-end" : "flex-start",
                    textAlign: msg.user === userName ? "right" : "left",
                    marginLeft: msg.user === userName ? "auto" : undefined,
                    marginRight: msg.user === userName ? 0 : undefined,
                  }}
                >
                  <strong style={{ color: msg.user === userName ? "#2196f3" : "#333" }}>
                    {msg.user}
                  </strong>
                  : {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form
            id="message-form"
            className="conversation-compose"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <input
              id="message-input"
              className="input-msg"
              name="input"
              placeholder="メッセージを入力"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!userName}
            />
            <button className="send" type="submit" aria-label="メッセージ送信" disabled={!input.trim()}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>

        {/* 右:プロフィール欄 */}
        <div className="profile-container">
          <h3>参加者</h3>
          <ul id="participants" className="participant-list">
            {participants.map((p, idx) => (
              <li key={idx}>
                <img src={p.img} alt={p.name} />
                {p.name}
                {p.name === userName && <span style={{ color: "#2196f3", marginLeft: 4 }}>(あなた)</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;