// 型定義
interface LoginFormData {
    email: string;
    password: string;
}

interface LoginElements {
    btnText: HTMLElement;
    loading: HTMLElement;
    loginBtn: HTMLButtonElement;
}

// パスワード表示切り替え機能
function togglePassword(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleBtn = document.querySelector('.password-toggle') as HTMLElement;
    
    if (!passwordInput || !toggleBtn) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁';
    }
}

// メッセージ表示機能
function showMessage(message: string): void {
    alert(message);
}

// フォームデータ取得
function getFormData(): LoginFormData | null {
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const passwordElement = document.getElementById('password') as HTMLInputElement;
    
    if (!emailElement || !passwordElement) return null;
    
    return {
        email: emailElement.value.trim(),
        password: passwordElement.value.trim()
    };
}

// ローディング状態管理
function setLoadingState(elements: LoginElements, isLoading: boolean): void {
    if (isLoading) {
        elements.btnText.style.display = 'none';
        elements.loading.style.display = 'block';
        elements.loginBtn.disabled = true;
    } else {
        elements.btnText.style.display = 'block';
        elements.loading.style.display = 'none';
        elements.loginBtn.disabled = false;
    }
}

// ログイン処理のシミュレート
async function simulateLogin(formData: LoginFormData): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 実際のAPIコールをここに実装
            console.log('Login attempt:', { email: formData.email });
            resolve(true);
        }, 2000);
    });
}

// メイン処理
document.addEventListener('DOMContentLoaded', (): void => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', async (e: Event): Promise<void> => {
        e.preventDefault();
        
        const formData = getFormData();
        
        if (!formData || !formData.email || !formData.password) {
            showMessage('メールアドレスとパスワードを入力してください');
            return;
        }
        
        // DOM要素を取得
        const btnText = document.querySelector('.btn-text') as HTMLElement;
        const loading = document.querySelector('.loading') as HTMLElement;
        const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
        
        if (!btnText || !loading || !loginBtn) return;
        
        const elements: LoginElements = { btnText, loading, loginBtn };
        
        try {
            setLoadingState(elements, true);
            
            const success = await simulateLogin(formData);
            
            if (success) {
                showMessage('ログインが完了しました！');
            } else {
                showMessage('ログインに失敗しました');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('エラーが発生しました');
        } finally {
            setLoadingState(elements, false);
        }
    });
});

// グローバルに関数を公開（HTMLから呼び出すため）
(window as any).togglePassword = togglePassword;
(window as any).showMessage = showMessage;