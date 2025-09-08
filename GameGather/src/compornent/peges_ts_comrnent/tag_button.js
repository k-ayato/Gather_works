// HTMLドキュメントが完全に読み込まれてから処理を開始
document.addEventListener('DOMContentLoaded', () => {

    // クラス名が 'tag-button' の要素をすべて取得
    const tagButtons = document.querySelectorAll('.tag-button');

    // 取得した各ボタンに対してクリックイベントを設定
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // クリックされたボタンのクラスに 'active' があれば削除、なければ追加する
            button.classList.toggle('active');
        });
    });

});