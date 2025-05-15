import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import AuthPage from "./pages/AuthPage";
import Chatbox from "./pages/Chatbox";

export default function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

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
