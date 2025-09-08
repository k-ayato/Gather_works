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
    # 投稿テーブル
    c.execute('''CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )''')
    # ユーザーテーブル
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')
    # 大会募集テーブル
    c.execute('''CREATE TABLE IF NOT EXISTS tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quest TEXT NOT NULL,
        number INTEGER NOT NULL,
        date TEXT,
        event_time TEXT,
        tags TEXT
    )''')
# 大会募集一覧取得API
@app.route('/api/tournaments', methods=['GET'])
def get_tournaments():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT id, quest, number, date, event_time, tags FROM tournaments ORDER BY id DESC')
    tournaments = [
        {
            'id': row[0],
            'quest': row[1],
            'number': row[2],
            'date': row[3],
            'event_time': row[4],
            'tags': row[5]
        }
        for row in c.fetchall()
    ]
    conn.close()
    return jsonify(tournaments)

# 大会募集新規登録API
@app.route('/api/tournaments', methods=['POST'])
def create_tournament():
    data = request.json
    quest = data.get('quest')
    number = data.get('number')
    date = data.get('date')
    event_time = data.get('event_time')
    tags = data.get('tags')
    if not quest or not number:
        return jsonify({'error': 'クエスト名と人数は必須です'}), 400
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO tournaments (quest, number, date, event_time, tags) VALUES (?, ?, ?, ?, ?)',
              (quest, number, date, event_time, tags))
    conn.commit()
    tournament_id = c.lastrowid
    conn.close()
    return jsonify({'result': 'success', 'tournament': {
        'id': tournament_id,
        'quest': quest,
        'number': number,
        'date': date,
        'event_time': event_time,
        'tags': tags
    }}), 201
    # テストユーザーがなければ追加
    c.execute('SELECT * FROM users WHERE email=?', ('test@test.com',))
    if not c.fetchone():
        c.execute('INSERT INTO users (email, password) VALUES (?, ?)', ('test@test.com', 'test'))
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

# 新規ユーザー登録API
@app.route('/api/register', methods=['POST'])
def register():
    # クライアントからJSONでメールアドレス・パスワードを受け取る
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # 入力チェック：どちらかが空ならエラー
    if not email or not password:
        return jsonify({'success': False, 'error': 'メールアドレスとパスワードは必須です'}), 400
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # 既存メールアドレスがDBにあるか確認
    c.execute('SELECT * FROM users WHERE email=?', (email,))
    if c.fetchone():
        conn.close()
        # 既に登録済みの場合はエラー
        return jsonify({'success': False, 'error': 'このメールアドレスは既に登録されています'}), 409
    # 新規ユーザーをDBに登録
    c.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, password))
    conn.commit()
    conn.close()
    # 登録成功
    return jsonify({'success': True}), 201

# パスワードリセット受付API
@app.route('/api/reset_password', methods=['POST'])
def reset_password():
    # クライアントからJSONでメールアドレスを受け取る
    data = request.json
    email = data.get('email')
    # 入力チェック：空ならエラー
    if not email:
        return jsonify({'success': False, 'error': 'メールアドレスは必須です'}), 400
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # DBから該当メールアドレスのユーザーを検索
    c.execute('SELECT * FROM users WHERE email=?', (email,))
    user = c.fetchone()
    conn.close()
    if user:
        # 本来はここでパスワードリセットメール送信処理を行う
        # 今回は仮実装として成功メッセージのみ返却
        return jsonify({'success': True, 'message': 'パスワードリセットメールを送信しました'}), 200
    else:
        # 該当メールアドレスが未登録の場合はエラー
        return jsonify({'success': False, 'error': '該当するメールアドレスは登録されていません'}), 404

# ログインAPI（仮実装）
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # DB認証: usersテーブルから該当ユーザーを検索
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE email=? AND password=?', (email, password))
    user = c.fetchone()
    conn.close()
    if user:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'メールアドレスまたはパスワードが違います'}), 401

if __name__ == '__main__':
    app.run(debug=True)
