import React, { useEffect, useState } from 'react';
import styles from './main_page.module.css';
import { useNavigate } from 'react-router-dom';
import GameCardList from './main_cardList';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // ログインチェック
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <aside className={styles.mainPage_leftBar}>
        <div className={styles.mainPage_logoContainer}>
          <img className={styles.mainPage_logo} src="/assets/logo/logo.svg" alt="Game Gather ロゴ" />
        </div>
        <ul>
          <li className={styles.mainPage_row} onClick={() => navigate('/')}> <img className={styles.mainPage_icon} src="/assets/icons/home_hoso.svg" alt="" /> <span className={styles.mainPage_link}>ホーム</span> </li>
          <li className={styles.mainPage_row} onClick={() => navigate('/tournament')}> <img className={styles.mainPage_icon} src="/assets/icons/taikai.svg" alt="大会検索" /> <span className={styles.mainPage_link}>大会を探す</span> </li>
          <li className={styles.mainPage_row} onClick={() => navigate('/recruit')}> <img className={styles.mainPage_icon} src="/assets/icons/sarch_icon.svg" alt="" /> <span className={styles.mainPage_link}>募集を探す</span> </li>
          <li className={styles.mainPage_row} onClick={() => navigate('/chat')}> <img className={styles.mainPage_icon} src="/assets/icons/messege_icon.svg" alt="" /> <span className={styles.mainPage_link}>チャット</span> </li>
        </ul>
        <div className={styles.mainPage_leftsideLow}>
          <ul>
            <li className={styles.mainPage_row}> <img className={styles.mainPage_icon} src="/assets/icons/set_icon.svg" alt="" /> <span className={styles.mainPage_link}>設定</span> </li>
            <li className={styles.mainPage_row}> <img className={styles.mainPage_icon} src="/assets/icons/man_icon.svg" alt="" /> <span className={styles.mainPage_link}>プロフィール</span> </li>
          </ul>
        </div>
      </aside>
      <main className={styles.mainPage_center}>
        <GameCardList />
        {/* APIから取得した募集一覧 */}
        {posts.map(post => (
          <div key={post.id} className="game-card">
            <div className="card-header">
              <h3 className="game-title">{post.title}</h3>
            </div>
            <div className="card-body">
              <p className="description">{post.content}</p>
            </div>
            <div className="card-footer">
              <button className="join-button" onClick={() => navigate('/chat')}>参加する</button>
            </div>
          </div>
        ))}
      </main>
      <aside className={styles.mainPage_rightBar}>
        <div className={styles.mainPage_filterContainer}>
          <div className={styles.mainPage_filterTabs}>
            <button className={styles.mainPage_tabButton}>すべて</button>
            <button className={styles.mainPage_tabButton}>人気</button>
            <button className={styles.mainPage_tabButton}>新着</button>
          </div>
          <div>
            <h4>ゲームで絞り込む</h4>
            <input type="text" placeholder="ゲームタイトルを入力..." />
          </div>
          <div>
            <h4>空き人数で絞り込む</h4>
            <select>
              <option value="">指定しない</option>
              <option value="1">1人以上</option>
              <option value="2">2人以上</option>
              <option value="3">3人以上</option>
              <option value="4">4人以上</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={() => navigate('/recruit')}>新たに募集する</button>
        </div>
      </aside>
    </div>
  );
};

export default MainPage;
