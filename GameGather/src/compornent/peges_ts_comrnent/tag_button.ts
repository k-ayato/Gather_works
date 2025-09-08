// DOM内のすべての .tag-button 要素を取得する
const tagButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.tag-button');

// 各ボタンに対して処理を行う
tagButtons.forEach(button => {
    // クリックイベントリスナーを追加
    button.addEventListener('click', () => {
        // button要素のクラスリストに対して 'active' クラスの有無を切り替える
        button.classList.toggle('active');

        // （任意）現在アクティブなタグをコンソールに出力
        logActiveTags();
    });
});

// （任意）現在アクティブなタグをコンソールに出力する関数
function logActiveTags(): void {
    const activeTags = document.querySelectorAll('.tag-button.active');
    const activeTagNames = Array.from(activeTags).map(tag => tag.textContent);
    console.clear(); // コンソールをクリア
    console.log('アクティブなタグ:', activeTagNames);
}

// 初期状態でアクティブなタグをログに出力
logActiveTags();