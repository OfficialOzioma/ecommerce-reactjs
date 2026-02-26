import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const storedEmail = localStorage.getItem("currentUserEmail");
    const [user, setUser] = useState(storedEmail ? { email: storedEmail } : null);

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find(u => u.email === email)) {
            return { success: false, message: "User already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);
        setUser({ email });

        return { success: true, message: "Account created successfully" };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("currentUserEmail", email);
            setUser({ email });
            return { success: true, message: "Login successful" };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}