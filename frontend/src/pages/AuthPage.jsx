import { useState, useEffect } from "react";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import axios from "axios";
import { BACKEND_URL } from "../config/const";

export default function AuthPage() {
	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const toggleMode = () => {
		setError(null);
		setIsRegister(!isRegister);
	};

	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			// Use signInWithPopup for a popup window flow
			const result = await signInWithPopup(auth, provider);
			// The user object is in result.user
			const user = result.user;

			console.log("Google login successful:", user);

			// Get the Firebase ID token
			const idToken = await user.getIdToken();
			console.log("Firebase ID Token:", idToken);

			// Now send the ID token to your backend for verification
			await sendTokenToBackend(idToken);

			// Handle successful login (e.g., redirect to dashboard)
			// navigate('/dashboard'); // Example using React Router
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error("Google login error:", errorCode, errorMessage);
		}
	};

	const handleGitHubLogin = async () => {
		const provider = new GithubAuthProvider();
		try {
			// Use signInWithPopup for a popup window flow
			const result = await signInWithPopup(auth, provider);
			// The user object is in result.user
			const user = result.user;

			console.log("GitHub login successful:", user);

			// Get the Firebase ID token
			const idToken = await user.getIdToken();
			console.log("Firebase ID Token:", idToken);

			// Now send the ID token to your backend for verification
			await sendTokenToBackend(idToken);

			// Handle successful login (e.g., redirect to dashboard)
			// navigate('/dashboard'); // Example using React Router
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error("GitHub login error:", errorCode, errorMessage);
			// ... display error message to user
		}
	};

	const sendTokenToBackend = async (idToken) => {
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${idToken}`
				},
				body: JSON.stringify({ id_token: idToken }), // Match backend expected body
			});

			if (!response.ok) {
				// Handle backend verification error
				const errorData = await response.json();
				throw new Error(errorData.detail || "Backend token verification failed");
			}

			const data = await response.json();
			console.log("Backend token verification successful:", data);
			// Backend has now verified the user. You can proceed with your app logic.
		} catch (error) {
			console.error("Error sending token to backend:", error);
			// Handle error communicating with backend
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const endpoint = isRegister ? "/api/auth/register/email" : "/api/auth/login/email";
			const method = isRegister ? "POST" : "GET";
			if (method === "POST") {
				const res = await axios.post(`${BACKEND_URL}${endpoint}`, { email, password });
				localStorage.setItem("access_token", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				localStorage.setItem("user", JSON.stringify(res.data.user));
			} else {
				const res = await axios.get(`${BACKEND_URL}${endpoint}`, { params: { email, password } });
				localStorage.setItem("access_token", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				localStorage.setItem("user", JSON.stringify(res.data.user));
			}
		} catch (err) {
			setError(err.response?.data?.detail || err.message);
		}
	};

	useEffect(() => {
		const handleRedirectResult = async () => {
			try {
				const result = await signInWithRedirect(auth);
				if (result) {
					// This is the user object after a successful redirect login
					const user = result.user;
					console.log("Redirect login successful:", user);

					// Get the Firebase ID token
					const idToken = await user.getIdToken();
					console.log("Firebase ID Token:", idToken);

					// Send token to backend
					await sendTokenToBackend(idToken);

					// Handle successful login
					// navigate('/dashboard');
				}
			} catch (error) {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Redirect login error:", errorCode, errorMessage);
				// ... display error message to user
			}
		};

		handleRedirectResult();
	}, []);

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
			<h2 className="text-2xl font-semibold text-center mb-4 text-black">{isRegister ? "Register" : "Login"}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{isRegister && (
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-2 border border-black rounded-lg text-gray-700"
						required
					/>
				)}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border border-black rounded-lg text-gray-700"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border border-black rounded-lg text-gray-700"
					required
				/>
				{error && <div className="text-red-500 text-sm">{error}</div>}
				<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
					{isRegister ? "Register" : "Login"}
				</button>
			</form>
			<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
				<p className="mx-4 mb-0 text-center font-semibold text-neutral-600">OR</p>
			</div>
			<div className="flex flex-col gap-2">
				<button
					onClick={() => {
						handleGoogleLogin();
					}}
					className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-black"
				>
					Continue with Google
				</button>
				<button
					onClick={() => {
						handleGitHubLogin();
					}}
					className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-black"
				>
					Continue with GitHub
				</button>
			</div>
			<p className="text-center text-sm mt-4 text-gray-500">
				{isRegister ? "Already have an account?" : "Don't have an account?"}
				<button onClick={toggleMode} className="ml-1 text-blue-500 hover:underline ">
					{isRegister ? "Login" : "Register"}
				</button>
			</p>
		</div>
	);
}
