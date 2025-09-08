from flask import Flask, request, jsonify
import sqlite3
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# DB初期化（テーブルがなければ作成）
DB_PATH = os.path.join(os.path.dirname(__file__), 'posts.db')
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()

init_db()

# アイテム追加API
@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'name is required'}), 400
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('INSERT INTO items (name) VALUES (?)', (name,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Item added'}), 201

# アイテム取得API
@app.route('/items', methods=['GET'])
def get_items():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('SELECT id, name FROM items')
    items = [{'id': row[0], 'name': row[1]} for row in cur.fetchall()]
    conn.close()
    return jsonify({'items': items})


from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import sqlite3
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

# DB初期化
DB_PATH = os.path.join(os.path.dirname(__file__), 'posts.db')
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()
init_db()

# index.htmlを配信
@app.route('/')
def serve_index():
    return send_from_directory(os.path.dirname(__file__), 'index.html')

# 環境変数からSupabaseのURLとサービスロールキーを取得
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

# ヘルスチェック
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

# ユーザー情報取得API
@app.route('/api/user', methods=['GET'])
def get_user():
    access_token = request.headers.get('Authorization')
    if not access_token or not access_token.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401
    token = access_token.split(' ')[1]
    url = f"{SUPABASE_URL}/auth/v1/user"
    headers = {
        "Authorization": f"Bearer {token}",
        "apikey": SUPABASE_SERVICE_ROLE_KEY
    }
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        return jsonify(resp.json())
    return jsonify({'error': 'Failed to fetch user'}), resp.status_code

# 投稿一覧取得API（DB連携）
@app.route('/api/posts', methods=['GET'])
def get_posts():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT id, title, content FROM posts ORDER BY id DESC')
    posts = [{'id': row[0], 'title': row[1], 'content': row[2]} for row in c.fetchall()]
    conn.close()
    return jsonify(posts)

# 投稿作成API（DB保存）
@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    if not title or not content:
        return jsonify({'error': 'title and content required'}), 400
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO posts (title, content) VALUES (?, ?)', (title, content))
    conn.commit()
    post_id = c.lastrowid
    conn.close()
    return jsonify({'result': 'success', 'post': {'id': post_id, 'title': title, 'content': content}}), 201

if __name__ == '__main__':
    app.run(debug=True)
