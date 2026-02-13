"use client"

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<'email' | 'password', string>>>({});
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const validate = () => {
        const newErrors: Partial<Record<'email' | 'password', string>> = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        setLoading(true);
        setServerMessage(null);

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                setServerMessage({ type: 'success', message: "Login successful!" });
                // Optionally, you can redirect the user after a successful login
                // For example, using Next.js router:
                // import { useRouter } from 'next/navigation';
                // const router = useRouter();
                // router.push('/dashboard');
            } else {
                setServerMessage({ type: 'error', message: result.error || 'Invalid credentials.' });
            }
        } catch (error) {
            setServerMessage({ type: 'error', message: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className={`flex flex-col gap-5 mt-6`}
            onSubmit={handleSubmit}
        >
            {serverMessage && (
                <div className={`p-4 rounded-md text-sm font-semibold ${serverMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {serverMessage.message}
                </div>
            )}
            <>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-white text-gray-700 outline-none px-5 py-4 rounded-full text-sm font-semibold w-full"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>}
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="bg-white text-gray-700 outline-none px-5 py-4 rounded-full text-sm font-semibold w-full"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {showPassword ? (
                            <FaEyeSlash
                                className="text-2xl text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaEye
                                className="text-2xl text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1 ml-4">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className={`bg-gradient-to-r from-[#ff4ecd] to-[#8f5cff] text-white font-bold py-3 px-4 w-full rounded-full text-sm cursor-pointer disabled:opacity-50`}
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Login'}
                </button>
            </>
        </form>
    )
}
