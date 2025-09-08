import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./compornent/peges_compornent/chat_page";
import Registration from "./compornent/peges_compornent/registration";
const App = () => (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/chat", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(Registration, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/chat", replace: true }) })] }) }));
export default App;
