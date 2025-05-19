import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiMenu } from "react-icons/hi";

export default function TopBar({ title, onMenuClick, showMenuButton }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar fluid rounded className="bg-blue-700 dark:bg-gray-900 shadow">
            <div className="flex items-center gap-3">
                {showMenuButton && (
                    <button
                        className="md:hidden bg-blue-700 dark:bg-gray-900 text-white p-2 rounded shadow"
                        onClick={onMenuClick}
                        aria-label="Open sidebar"
                        style={{ zIndex: 60 }}
                    >
                        <HiMenu size={24} />
                    </button>
                )}
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-2xl font-bold text-white dark:text-white">
                        {title || "AI TTRPG"}
                    </span>
                </Navbar.Brand>
            </div>
            <div className="flex items-center gap-4">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img={user?.photoURL || undefined}
                            rounded
                            className="ring-2 ring-blue-400"
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user?.displayName || "User"}</span>
                        <span className="block truncate text-sm font-medium">{user?.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item href="/chat">Chat</Dropdown.Item>
                    <Dropdown.Item href="/worlds">Worlds</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                </Dropdown>
            </div>
        </Navbar>
    );
}