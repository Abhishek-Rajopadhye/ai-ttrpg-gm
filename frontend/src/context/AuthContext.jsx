import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	// Optionally, load user from localStorage/sessionStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("user_id");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		// Optionally, redirect to login page
	};

	return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
