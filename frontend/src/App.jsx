import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import AuthPage from "./pages/AuthPage";
import Chatbox from "./pages/Chatbox";

import { AuthProvider, AuthContext } from "./context/AuthContext";

function AppRoutes() {
	const { user, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [setUser]);

	if (loading) return <div className="p-4 text-center">Loading...</div>;

	return (
		<Router>
			<Routes>
				<Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/chat" />} />
				<Route path="/chat" element={user ? <Chatbox /> : <Navigate to="/auth" />} />
				<Route path="*" element={<Navigate to={user ? "/chat" : "/auth"} />} />
			</Routes>
		</Router>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
}
