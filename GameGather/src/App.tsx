import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./compornent/peges_compornent/chat_page";
import Registration from "./compornent/peges_compornent/registration";
import TornamentGatherPage from "./compornent/peges_compornent/tornament_gather_page";


const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/chat" element={<ChatPage />} />
			<Route path="/register" element={<Registration />} />
			<Route path="/tournament" element={<TornamentGatherPage />} />
			<Route path="*" element={<Navigate to="/chat" replace />} />
		</Routes>
	</BrowserRouter>
);

export default App;