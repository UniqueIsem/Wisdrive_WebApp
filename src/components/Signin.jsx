import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Signin() {
    const [email, setEmail] = useState("");
    const { loading, loginWithMagicLink } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginWithMagicLink(email);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md w-3/4 max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Inicia Sesión</h2>

            <label htmlFor="email" className="block text-gray-600 mb-2">
                Correo electronico
            </label>
            <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-indigo-500 text-black"
                placeholder="youremail@site.com"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
}

export default Signin;