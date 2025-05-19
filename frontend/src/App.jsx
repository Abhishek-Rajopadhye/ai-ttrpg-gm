import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}