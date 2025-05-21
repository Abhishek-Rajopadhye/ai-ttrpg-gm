import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Chatbox from "./pages/Chatbox";
import HomePage from "./pages/HomePage";
import WorldsPage from "./pages/WorldsPage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { appTheme } from "./styles/AppTheme";
import {
	Navbar,
	NavbarBrand,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Avatar,
	ThemeProvider,
	DarkThemeToggle,
	Button,
} from "flowbite-react";
import { useContext, Fragment } from "react";
import { HiMenu } from "react-icons/hi";

function AppContent() {
	const { user, logout } = useContext(AuthContext);

	const location = useLocation();
	const path = location.pathname;

	// Set page titles based on route
	const pageTitles = {
		"/chat": "AI TTRPG Session",
		"/home": "Home",
		"/worlds": "Worlds",
	};
	const title = pageTitles[path] || "AI TTRPG";

	// Only show menu button on non-auth pages and on mobile
	const showMenuButton = path !== "/auth";
	const onMenuClick = () => {}; // Placeholder, implement sidebar toggle if needed

	return (
		<Fragment>
			<div className="h-screen flex flex-col">
				{path !== "/auth" && (
					<Navbar fluid className="bg-blue-700 dark:bg-gray-900 shadow fixed z-10 h-17 w-screen">
						<div className="flex items-center gap-3">
							{showMenuButton && (
								<Button
									className="md:hidden bg-blue-700 dark:bg-gray-900 text-white p-2 shadow"
									onClick={onMenuClick}
									aria-label="Open sidebar"
									style={{ zIndex: 60 }}
								>
									<HiMenu size={24} />
								</Button>
							)}
							<NavbarBrand href="/home">
								<span className="self-center whitespace-nowrap text-2xl font-bold text-white dark:text-white">
									{title || "AI TTRPG"}
								</span>
							</NavbarBrand>
						</div>
						<div className="flex items-center gap-4">
							<Dropdown
								arrowIcon={false}
								inline
								label={<Avatar alt="User settings" img={user?.photoURL || undefined} rounded />}
							>
								<DropdownHeader>
									<span className="block text-sm">{user?.displayName || "User"}</span>
									<span className="block truncate text-sm font-medium">{user?.email}</span>
								</DropdownHeader>
								<DropdownItem href="/chat">Chat</DropdownItem>
								<DropdownItem href="/worlds">Worlds</DropdownItem>
								<DropdownDivider />
								<DropdownItem onClick={logout}>Sign out</DropdownItem>
							</Dropdown>
						</div>
					</Navbar>
				)}
				<div className="relative mt-17 flex-2 items-center gap-3">
					<Routes>
						<Route path="/auth" element={<AuthPage />} />
						<Route path="/chat" element={<Chatbox />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/worlds" element={<WorldsPage />} />
						<Route path="/*" element={<Navigate to={user ? "/auth" : "/home"} />} />
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<Router>
				<ThemeProvider theme={appTheme}>
					<AppContent />
				</ThemeProvider>
			</Router>
		</AuthProvider>
	);
}
