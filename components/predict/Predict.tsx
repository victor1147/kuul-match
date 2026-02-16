"use client"

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function PredictContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // searchParams.get() automatically decodes, so manual decoding is often redundant 
    // but safe. We must handle the null case explicitly.
    const me = searchParams.get('me');
    const image = searchParams.get('image');
    const name = searchParams.get('name') || 'Unknown';
    // As requested, get the match identifier from the 'uuid' URL parameter
    const uuid = searchParams.get('uuid');

    // Helper to render image safely
    const renderImage = (src: string | null, alt: string) => {
        // If src is missing, render a placeholder instead of crashing
        if (!src) {
            return (
                <div className="h-[200px] w-[200px] bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
                    No Image
                </div>
            );
        }

        return (
            <Image
                src={src}
                className="h-[150px] w-[160px] rounded-3xl object-cover border border-green-300"
                alt={alt}
                width={300}
                height={300}
                // unoptimized={true} bypasses the Next.js image server. 
                // Use this if your next.config.ts domains are causing issues.
                unoptimized={true}
            />
        );
    };

    const handlePrediction = async (result: 'friends' | 'lovers' | 'cofounders') => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            setError("Authentication error: No token found. Please log in again.");
            setLoading(false);
            return;
        }

        if (!uuid) {
            setError("Error: Match identifier (uuid) is missing from the URL.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('match', uuid);
        formData.append('result', result);

        try {
            const response = await fetch('https://api.kuulmatch.com/matches', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 401) {
                // Token is invalid or expired, clear it and redirect to login
                localStorage.removeItem('token');
                router.push('/login');
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                // Use the error message from the API response
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            setSuccess(data.message || "Match was done successfully");

            // Redirect to /done with image and name as URL parameters on success
            const params = new URLSearchParams();
            if (image) {
                params.append('image', image);
            }
            params.append('name', name);
            params.append('result', result);
            router.push(`/done?${params.toString()}`);
        } catch (e: any) {
            setError(e.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center max-w-[450px] mx-auto mt-10">
            <div className="flex items-center justify-center gap-10 max-[600px]:gap-6 max-[370px]:gap-2">
                {renderImage(me, "Your   image")}
                {renderImage(image, "Participant image")}
            </div>

            <div className="mt-6 text-white font-semibold text-base px-3">
                What future do you predict with <span className="font-bold text-xl">{name}</span>?
            </div>

            {/* Display API call status to the user */}
            {loading && <div className="text-white mt-4">Submitting your prediction...</div>}
            {error && <div className="text-red-500 bg-red-100 p-3 rounded-lg mt-4">{error}</div>}
            {success && <div className="text-green-700 bg-green-100 p-3 rounded-lg mt-4">{success}</div>}

            <div className={`mt-6 max-w-[450px] space-y-3`}>
                <button
                    onClick={() => handlePrediction('friends')}
                    disabled={loading || !!success}
                    className="bg-yellow-600 p-4 rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className={`text-left font-bold text-white text-base`}>Friends</div>
                    <div className={`text-left text-white font-semibold text-sm`}>This is the start of a great friendship. I feel it</div>
                </button>
                <button
                    onClick={() => handlePrediction('lovers')}
                    disabled={loading || !!success}
                    className="bg-red-400 p-4 rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className={`text-left font-bold text-white text-base`}>Lovers</div>
                    <div className={`text-left text-white font-semibold text-sm`}>This is the start of a sweet relationship. It&#39;s hot in here</div>
                </button>
                <button
                    onClick={() => handlePrediction('cofounders')}
                    disabled={loading || !!success}
                    className="bg-red-200 p-4 rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className={`text-left font-bold text-white text-base`}>Cofounders</div>
                    <div className={`text-left text-white font-semibold text-sm`}>
                        This is the start of a partnership. Let’s build</div>
                </button>
            </div>
        </div>
    )
}

// You MUST wrap components using useSearchParams in Suspense
export default function Predict() {
    return (
        <Suspense fallback={<div className="text-white text-center mt-10">Loading prediction...</div>}>
            <PredictContent />
        </Suspense>
    );
}