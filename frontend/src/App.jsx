import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Chatbox from "./pages/Chatbox";
import HomePage from "./pages/HomePage";
import WorldsPage from "./pages/WorldsPage";
import { AuthProvider } from "./context/AuthContext";
import TopBar from "./components/TopBar";

function AppContent() {
    const location = useLocation();
    const hideTopBar = location.pathname === "/auth";

    return (
        <>
            {!hideTopBar && <TopBar />}
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/chat" element={<Chatbox />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/worlds" element={<WorldsPage />} />
                <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}