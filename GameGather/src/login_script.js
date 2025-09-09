// パスワード表示切り替え機能
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    if (!passwordInput || !toggleBtn)
        return;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    }
    else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁';
    }
}
// メッセージ表示機能
function showMessage(message) {
    alert(message);
}
// フォームデータ取得
function getFormData() {
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    if (!emailElement || !passwordElement)
        return null;
    return {
        email: emailElement.value.trim(),
        password: passwordElement.value.trim()
    };
}
// ローディング状態管理
function setLoadingState(elements, isLoading) {
    if (isLoading) {
        elements.btnText.style.display = 'none';
        elements.loading.style.display = 'block';
        elements.loginBtn.disabled = true;
    }
    else {
        elements.btnText.style.display = 'block';
        elements.loading.style.display = 'none';
        elements.loginBtn.disabled = false;
    }
}
// ログイン処理のシミュレート
async function simulateLogin(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 実際のAPIコールをここに実装
            console.log('Login attempt:', { email: formData.email });
            resolve(true);
        }, 2000);
    });
}
// メイン処理
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm)
        return;
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = getFormData();
        if (!formData || !formData.email || !formData.password) {
            showMessage('メールアドレスとパスワードを入力してください');
            return;
        }
        // DOM要素を取得
        const btnText = document.querySelector('.btn-text');
        const loading = document.querySelector('.loading');
        const loginBtn = document.querySelector('.login-btn');
        if (!btnText || !loading || !loginBtn)
            return;
        const elements = { btnText, loading, loginBtn };
        try {
            setLoadingState(elements, true);
            const success = await simulateLogin(formData);
            if (success) {
                showMessage('ログインが完了しました！');
            }
            else {
                showMessage('ログインに失敗しました');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            showMessage('エラーが発生しました');
        }
        finally {
            setLoadingState(elements, false);
        }
    });
});
// グローバルに関数を公開（HTMLから呼び出すため）
window.togglePassword = togglePassword;
window.showMessage = showMessage;
export {};
