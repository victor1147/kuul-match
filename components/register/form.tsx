"use client"

import { useState } from "react";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [image, setImage] = useState<File | null>(null);
    const [nickname, setNickname] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateStep1 = () => {
        const newErrors: any = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!password) newErrors.password = "Password is required";
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        return newErrors;
    };

    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const step1Errors = validateStep1();
        if (Object.keys(step1Errors).length > 0) {
            setErrors(step1Errors);
        } else {
            setErrors({});
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: any = {};
        if (!image) newErrors.image = "Image is required";
        if (!nickname) newErrors.nickname = "Nickname is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setErrors({});
        setLoading(true);
        setServerMessage(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nick_name', nickname);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setServerMessage({ type: 'success', message: result.message });
            } else {
                setServerMessage({ type: 'error', message: result.error });
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
            {step === 1 ? (
                <>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className={`bg-white text-gray-700 outline-none px-5 py-4 rounded-full text-sm font-semibold w-full`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-4">{errors.name}</p>}
                    </div>
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
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="bg-white text-gray-700 outline-none px-5 py-4 rounded-full text-sm font-semibold w-full"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            {showConfirmPassword ? (
                                <FaEyeSlash
                                    className="text-2xl text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(false)}
                                />
                            ) : (
                                <FaEye
                                    className="text-2xl text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(true)}
                                />
                            )}
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-4">{errors.confirmPassword}</p>}
                    </div>
                    <button
                        onClick={handleNextStep}
                        className={`bg-linear-to-r from-[#ff4ecd] to-[#8f5cff] text-white font-bold py-3 px-4 w-full rounded-full text-sm cursor-pointer`}
                    >
                        Continue
                    </button>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Selected" className="w-32 h-32 rounded-full object-cover" />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-2 border-dotted border-[#ff4ecd] flex items-center justify-center">
                                    <FaPlus className="text-4xl text-[#ff4ecd]" />
                                </div>
                            )}
                        </label>
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Nick name"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className={`bg-white text-gray-700 outline-none px-5 py-4 rounded-full text-sm font-semibold w-full`}
                            required
                        />
                        {errors.nickname && <p className="text-red-500 text-xs mt-1 ml-4">{errors.nickname}</p>}
                    </div>
                    <button
                        type={`submit`}
                        className={`bg-linear-to-r from-[#ff4ecd] to-[#8f5cff] text-white font-bold py-3 px-4 w-full rounded-full text-sm cursor-pointer`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </>
            )}
        </form>
    )
}
