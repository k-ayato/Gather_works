

import React, { useState, useRef, useEffect } from "react";
import "./tornament_gather_page.css";

// React版アイコンスライダー
const ICONS = [
  { src: "/assets/game_icons/FGO.jpg", alt: "FGO" },
  { src: "/assets/game_icons/monsuto.jpg", alt: "モンスト" },
  { src: "/assets/game_icons/pazudora.jpg", alt: "パズドラ" },
  { src: "/assets/game_icons/pokepoke.jpg", alt: "ポケポケ" },
  { src: "/assets/game_icons/tsumutsumu.jpg", alt: "ツムツム" },
];

const IconSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTranslateX, setStartTranslateX] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [selected, setSelected] = useState(0);

  // 初期表示で中央にスナップ
  useEffect(() => {
    goToSlide(selected, 'auto');
    // eslint-disable-next-line
  }, []);

  // ドラッグ開始
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    sliderRef.current?.classList.add('active');
    setStartX(e.pageX);
    setStartTranslateX(currentTranslateX);
    if (wrapperRef.current) wrapperRef.current.style.transition = 'none';
  };
  // ドラッグ中
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const moveX = e.pageX - startX;
    const newTranslate = startTranslateX + moveX;
    setCurrentTranslateX(newTranslate);
    if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(${newTranslate}px)`;
  };
  // ドラッグ終了
  const handleMouseUp = () => {
    if (!isDown) return;
    setIsDown(false);
    sliderRef.current?.classList.remove('active');
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transition = 'transform 0.4s ease';
    // スナップ
    const iconEls = wrapperRef.current.querySelectorAll<HTMLImageElement>('.icons');
    if (!iconEls.length) return;
    const iconW = iconEls[0].offsetWidth + getMargin(iconEls[0]) + getGap(wrapperRef.current);
    const newIndex = Math.round(-currentTranslateX / iconW);
    const bounded = Math.max(0, Math.min(iconEls.length - 1, newIndex));
    goToSlide(bounded, 'smooth');
  };
  // コンテナ外に出たらドラッグ終了
  const handleMouseLeave = () => {
    if (isDown) handleMouseUp();
  };
  // クリックで中央にスナップ
  const handleIconClick = (idx: number) => {
    goToSlide(idx, 'smooth');
  };
  // 中央にスナップ
  function goToSlide(idx: number, behavior: 'smooth' | 'auto') {
    if (!sliderRef.current || !wrapperRef.current) return;
    const iconEls = wrapperRef.current.querySelectorAll<HTMLImageElement>('.icons');
    if (!iconEls.length) return;
    const sliderCenter = sliderRef.current.clientWidth / 2;
    const iconCenter = iconEls[idx].clientWidth / 2;
    const target = sliderCenter - (iconEls[idx].offsetLeft + iconCenter);
    wrapperRef.current.style.transition = behavior === 'smooth' ? 'transform 0.4s ease' : 'none';
    wrapperRef.current.style.transform = `translateX(${target}px)`;
    setCurrentTranslateX(target);
    setSelected(idx);
  }
  // ユーティリティ
  function getMargin(el: HTMLElement) {
    const style = window.getComputedStyle(el);
    return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }
  function getGap(wrapper: HTMLElement) {
    return parseFloat(window.getComputedStyle(wrapper).gap) || 0;
  }

  return (
    <div
      className="icons_slider"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ userSelect: isDown ? 'none' : undefined }}
    >
      <div className="icons_wrapper" ref={wrapperRef}>
        {ICONS.map((icon, idx) => (
          <img
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            className={"icons" + (selected === idx ? " selected" : "")}
            data-value={idx + 1}
            draggable={false}
            onClick={() => handleIconClick(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

const TAGS = [
  "初心者", "中級者", "上級者", "気軽に", "ガチンコ", "ライブ配信", "通話あり", "周回", "初心者歓迎", "PC限定", "CS限定", "男子禁制"
];

export const TornamentGatherPage: React.FC = () => {
  const [quest, setQuest] = useState("");
  const [number, setNumber] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState<string[]>([TAGS[0]]);
  const [message, setMessage] = useState("");

  const handleTagClick = (tag: string) => {
    setTags(tags =>
      tags.includes(tag)
        ? tags.filter(t => t !== tag)
        : [...tags, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const data = { quest, number, date, time, tags };
    try {
      const res = await fetch("http://localhost:5000/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.result === "success") {
        setMessage("トーナメント募集を登録しました");
        setQuest(""); setNumber(1); setDate(""); setTime(""); setTags([TAGS[0]]);
      } else {
        setMessage("登録に失敗しました: " + (result.error || ""));
      }
    } catch (err) {
      setMessage("通信エラー");
    }
  };

  return (
    <div className="container">
      <div className="left-column">
        <div className="left_top-column">
          <img src="/assets/icons/home_hoso.svg" height="30px" className="home_icon" />
          <img src="/assets/icons/sarch_icon.svg" height="30px" className="sarch_icon" />
          <img src="/assets/icons/messege_icon.svg" height="30px" className="messege_icon" />
        </div>
        <div className="left_bottom-column">
          <img src="/assets/icons/man_icon.svg" height="80px" className="profile_icon" />
          <img src="/assets/icons/set_icon.svg" height="30px" className="setting_icon" />
        </div>
      </div>
      <div className="center-column">
        <IconSlider />
        <form className="condition_containar" onSubmit={handleSubmit}>
          <label htmlFor="quest">クエスト</label>
          <input type="text" name="quest" value={quest} onChange={e => setQuest(e.target.value)} required />
          <label htmlFor="number">人数</label>
          <input type="number" min={1} max={30} step={1} name="number" value={number} onChange={e => setNumber(Number(e.target.value))} required />
          <div className="col">
            <label htmlFor="date">日付</label>
            <input type="date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} required />
            <label htmlFor="event-time">時間</label>
            <input type="time" id="event-time" name="event-time" value={time} onChange={e => setTime(e.target.value)} required />
          </div>
          <label htmlFor="tag">タグ</label>
          <div className="tag-container">
            {TAGS.map(tag => (
              <button
                type="button"
                key={tag}
                className={"tag-button" + (tags.includes(tag) ? " active" : "")}
                onClick={() => handleTagClick(tag)}
              >{tag}</button>
            ))}
          </div>
          <div className="buttun">
            <button type="submit">募集</button>
          </div>
          {message && <div style={{marginTop:8, color: message.includes("成功") ? "green" : "red"}}>{message}</div>}
        </form>
      </div>
      <div className="right-column"></div>
    </div>
  );
};

export default TornamentGatherPage;
