import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./compornent/peges_compornent/chat_page";
import Registration from "./compornent/peges_compornent/registration";
import MainPage from "./compornent/peges_compornent/MainPage";

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/chat" element={<ChatPage />} />
			<Route path="/register" element={<Registration />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default App;