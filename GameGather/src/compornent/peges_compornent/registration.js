import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ...existing code...
import React, { useState } from "react";
import "./registration.css";
function scorePassword(pw) {
    let score = 0;
    if (pw.length >= 8)
        score += 1;
    if (/[0-9]/.test(pw))
        score += 1;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw))
        score += 1;
    if (/[^A-Za-z0-9]/.test(pw))
        score += 1;
    if (pw.length >= 12)
        score += 1;
    return Math.min(score, 5);
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const Registration = () => {
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
    if (passwordScore === 3)
        pwdBarColor = "linear-gradient(90deg,#fbbf24,#f97316)";
    if (passwordScore >= 4)
        pwdBarColor = "linear-gradient(90deg,#34d399,#10b981)";
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage("");
        setFormMessageClass("");
        let ok = true;
        if (fullname.trim().length < 2) {
            setFullnameError("氏名を入力してください（2文字以上）。");
            ok = false;
        }
        else
            setFullnameError("");
        if (!validateEmail(email)) {
            setEmailError("有効なメールアドレスを入力してください。");
            ok = false;
        }
        else
            setEmailError("");
        if (scorePassword(password) < 2) {
            setPasswordError("より強いパスワードを設定してください。");
            ok = false;
        }
        else
            setPasswordError("");
        if (passwordConfirm !== password) {
            setConfirmError("パスワードが一致しません。");
            ok = false;
        }
        else
            setConfirmError("");
        if (!terms) {
            setTermsError("利用規約に同意してください。");
            ok = false;
        }
        else
            setTermsError("");
        if (!ok)
            return;
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
        }
        catch {
            setFormMessage("ネットワークエラーが発生しました。");
            setFormMessageClass("error");
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsx("div", { className: "wrap", children: _jsxs("div", { className: "card", children: [_jsxs("section", { className: "hero", children: [_jsx("h1", { children: "\u65B0\u898F\u767B\u9332" }), _jsx("p", { children: "\u7121\u6599\u3067\u59CB\u3081\u3089\u308C\u307E\u3059\u3002\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3068\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u8A2D\u5B9A\u3057\u3066\u3001\u5229\u7528\u898F\u7D04\u306B\u540C\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002" }), _jsxs("ul", { className: "muted", "aria-hidden": "true", children: [_jsx("li", { children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u306F8\u6587\u5B57\u4EE5\u4E0A\u3001\u6570\u5B57\u3068\u82F1\u5B57\u3092\u542B\u3081\u308B\u3053\u3068\u3092\u63A8\u5968\u3057\u307E\u3059\u3002" }), _jsx("li", { children: "\u30D1\u30B9\u30EF\u30FC\u30C9\u306E\u5B89\u5168\u6027\u306F\u30DA\u30FC\u30B8\u53F3\u5074\u3067\u30C1\u30A7\u30C3\u30AF\u3055\u308C\u307E\u3059\u3002" })] })] }), _jsx("section", { className: "form-area", children: _jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "fullname", children: "\u6C0F\u540D" }), _jsx("div", { className: "input", children: _jsx("input", { id: "fullname", name: "fullname", type: "text", autoComplete: "name", placeholder: "\u5C71\u7530 \u592A\u90CE", required: true, value: fullname, onChange: e => setFullname(e.target.value), onBlur: () => {
                                                if (fullname.trim().length < 2)
                                                    setFullnameError("氏名を入力してください（2文字以上）。");
                                                else
                                                    setFullnameError("");
                                            } }) }), _jsx("div", { className: "error", "aria-live": "polite", children: fullnameError })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), _jsx("div", { className: "input", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", placeholder: "you@example.com", required: true, value: email, onChange: e => setEmail(e.target.value), onBlur: () => {
                                                if (!validateEmail(email))
                                                    setEmailError("有効なメールアドレスを入力してください。");
                                                else
                                                    setEmailError("");
                                            } }) }), _jsx("div", { className: "error", "aria-live": "polite", children: emailError })] }), _jsxs("div", { className: "row", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), _jsxs("div", { className: "input", children: [_jsx("input", { id: "password", name: "password", type: showPwd ? "text" : "password", autoComplete: "new-password", placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5165\u529B", required: true, value: password, onChange: e => { setPassword(e.target.value); setPasswordError(""); } }), _jsx("button", { type: "button", "aria-label": "\u30D1\u30B9\u30EF\u30FC\u30C9\u8868\u793A\u5207\u66FF", onClick: () => setShowPwd(s => !s), tabIndex: -1, children: showPwd ? "🙈" : "👁️" })] }), _jsx("div", { style: { marginTop: 8 }, className: "password-meter", "aria-hidden": "true", children: _jsx("i", { style: { width: `${pwdBarPct}%`, background: pwdBarColor, display: "block", height: "100%", transition: "width 220ms linear" } }) }), _jsx("div", { className: "muted", id: "passwordHint", children: "8\u6587\u5B57\u4EE5\u4E0A\u3001\u82F1\u5B57\u30FB\u6570\u5B57\u3092\u542B\u3081\u307E\u3059\u3002" }), _jsx("div", { className: "error", "aria-live": "polite", children: passwordError })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "passwordConfirm", children: "\u30D1\u30B9\u30EF\u30FC\u30C9\uFF08\u78BA\u8A8D\uFF09" }), _jsx("div", { className: "input", children: _jsx("input", { id: "passwordConfirm", name: "passwordConfirm", type: showPwd ? "text" : "password", autoComplete: "new-password", placeholder: "\u518D\u5165\u529B", required: true, value: passwordConfirm, onChange: e => setPasswordConfirm(e.target.value) }) }), _jsx("div", { className: "error", "aria-live": "polite", children: confirmError })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "inline", htmlFor: "terms", children: [_jsx("input", { id: "terms", name: "terms", type: "checkbox", checked: terms, onChange: e => setTerms(e.target.checked) }), _jsx("span", { children: "\u5229\u7528\u898F\u7D04\u306B\u540C\u610F\u3059\u308B" })] }), _jsx("div", { className: "error", "aria-live": "polite", children: termsError })] }), _jsxs("div", { children: [_jsx("button", { className: "btn", type: "submit", disabled: submitting, children: submitting ? "作成中..." : "アカウントを作成" }), _jsx("div", { className: `footer ${formMessageClass}`, "aria-live": "polite", children: formMessage })] })] }) })] }) }));
};
export default Registration;
