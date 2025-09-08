// ...existing code...
import React, { useState } from "react";
import "./registration.css";

function scorePassword(pw: string) {
	let score = 0;
	if (pw.length >= 8) score += 1;
	if (/[0-9]/.test(pw)) score += 1;
	if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
	if (/[^A-Za-z0-9]/.test(pw)) score += 1;
	if (pw.length >= 12) score += 1;
	return Math.min(score, 5);
}

function validateEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Registration: React.FC = () => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [terms, setTerms] = useState(false);
	const [showPwd, setShowPwd] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [formMessage, setFormMessage] = useState("");
	const [formMessageClass, setFormMessageClass] = useState("");

	// エラー
	const [fullnameError, setFullnameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [termsError, setTermsError] = useState("");

	const passwordScore = scorePassword(password);
	const pwdBarPct = (passwordScore / 5) * 100;
	let pwdBarColor = "linear-gradient(90deg,#fca5a5,#f87171)";
	if (passwordScore === 3) pwdBarColor = "linear-gradient(90deg,#fbbf24,#f97316)";
	if (passwordScore >= 4) pwdBarColor = "linear-gradient(90deg,#34d399,#10b981)";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormMessage("");
		setFormMessageClass("");
		let ok = true;
		if (fullname.trim().length < 2) {
			setFullnameError("氏名を入力してください（2文字以上）。");
			ok = false;
		} else setFullnameError("");
		if (!validateEmail(email)) {
			setEmailError("有効なメールアドレスを入力してください。");
			ok = false;
		} else setEmailError("");
		if (scorePassword(password) < 2) {
			setPasswordError("より強いパスワードを設定してください。");
			ok = false;
		} else setPasswordError("");
		if (passwordConfirm !== password) {
			setConfirmError("パスワードが一致しません。");
			ok = false;
		} else setConfirmError("");
		if (!terms) {
			setTermsError("利用規約に同意してください。");
			ok = false;
		} else setTermsError("");
		if (!ok) return;
		setSubmitting(true);
		try {
			await new Promise((res) => setTimeout(res, 500));
			setFormMessage("アカウントを作成しました。確認メールを送信しました（ダミー）。");
			setFormMessageClass("success");
			setFullname("");
			setEmail("");
			setPassword("");
			setPasswordConfirm("");
			setTerms(false);
		} catch {
			setFormMessage("ネットワークエラーが発生しました。");
			setFormMessageClass("error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="wrap">
			<div className="card">
				<section className="hero">
					<h1>新規登録</h1>
					<p>無料で始められます。メールアドレスとパスワードを設定して、利用規約に同意してください。</p>
					<ul className="muted" aria-hidden="true">
						<li>パスワードは8文字以上、数字と英字を含めることを推奨します。</li>
						<li>パスワードの安全性はページ右側でチェックされます。</li>
					</ul>
				</section>
				<section className="form-area">
					<form onSubmit={handleSubmit} noValidate>
						<div>
							<label htmlFor="fullname">氏名</label>
							<div className="input">
								<input
									id="fullname"
									name="fullname"
									type="text"
									autoComplete="name"
									placeholder="山田 太郎"
									required
									value={fullname}
									onChange={e => setFullname(e.target.value)}
									onBlur={() => {
										if (fullname.trim().length < 2) setFullnameError("氏名を入力してください（2文字以上）。");
										else setFullnameError("");
									}}
								/>
							</div>
							<div className="error" aria-live="polite">{fullnameError}</div>
						</div>

						<div>
							<label htmlFor="email">メールアドレス</label>
							<div className="input">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									placeholder="you@example.com"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
									onBlur={() => {
										if (!validateEmail(email)) setEmailError("有効なメールアドレスを入力してください。");
										else setEmailError("");
									}}
								/>
							</div>
							<div className="error" aria-live="polite">{emailError}</div>
						</div>

						<div className="row">
							<div>
								<label htmlFor="password">パスワード</label>
								<div className="input">
									<input
										id="password"
										name="password"
										type={showPwd ? "text" : "password"}
										autoComplete="new-password"
										placeholder="パスワードを入力"
										required
										value={password}
										onChange={e => { setPassword(e.target.value); setPasswordError(""); }}
									/>
									<button
										type="button"
										aria-label="パスワード表示切替"
										onClick={() => setShowPwd(s => !s)}
										tabIndex={-1}
									>{showPwd ? "🙈" : "👁️"}</button>
								</div>
								<div style={{ marginTop: 8 }} className="password-meter" aria-hidden="true">
									<i style={{ width: `${pwdBarPct}%`, background: pwdBarColor, display: "block", height: "100%", transition: "width 220ms linear" }} />
								</div>
								<div className="muted" id="passwordHint">8文字以上、英字・数字を含めます。</div>
								<div className="error" aria-live="polite">{passwordError}</div>
							</div>
							<div>
								<label htmlFor="passwordConfirm">パスワード（確認）</label>
								<div className="input">
									<input
										id="passwordConfirm"
										name="passwordConfirm"
										type={showPwd ? "text" : "password"}
										autoComplete="new-password"
										placeholder="再入力"
										required
										value={passwordConfirm}
										onChange={e => setPasswordConfirm(e.target.value)}
									/>
								</div>
								<div className="error" aria-live="polite">{confirmError}</div>
							</div>
						</div>

						<div>
							<label className="inline" htmlFor="terms">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									checked={terms}
									onChange={e => setTerms(e.target.checked)}
								/>
								<span>利用規約に同意する</span>
							</label>
							<div className="error" aria-live="polite">{termsError}</div>
						</div>

						<div>
							<button className="btn" type="submit" disabled={submitting}>
								{submitting ? "作成中..." : "アカウントを作成"}
							</button>
							<div className={`footer ${formMessageClass}`} aria-live="polite">{formMessage}</div>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default Registration;