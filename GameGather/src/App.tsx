import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  // アイテム追加
  const addItem = async () => {
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    });
    setInput('');
    fetchItems();
  };

  // アイテム一覧取得
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setItems(data.items.map((item: any) => item.name));
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={addItem}>追加</button>
        <button onClick={fetchItems}>一覧取得</button>
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
