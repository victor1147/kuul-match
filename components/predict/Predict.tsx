"use client"

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PredictContent() {
    const searchParams = useSearchParams();

    // searchParams.get() automatically decodes, so manual decoding is often redundant 
    // but safe. We must handle the null case explicitly.
    const me = searchParams.get('me');
    const image = searchParams.get('image');
    const name = searchParams.get('name') || 'Unknown';

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

    return (
        <div className="text-center max-w-[450px] mx-auto mt-10">
            <div className="flex items-center justify-center gap-10 max-[600px]:gap-6 max-[370px]:gap-2">
                {renderImage(me, "Your   image")}
                {renderImage(image, "Participant image")}
            </div>

            <div className="mt-6 text-white font-semibold text-base px-3">
                What future do you predict with <span className="font-bold text-xl">{name}</span>?
            </div>
            
            <div className={`mt-6 max-w-[450px] space-y-3`}>
                <button className="bg-yellow-600 p-4    rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90">
                    <div className={`text-left font-bold text-white text-base`}>Friends</div>
                    <div className={`text-left text-white font-semibold text-sm`}>This is the start of a great feiendship. I feel it</div>
                </button>
                <button className="bg-red-400 p-4    rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90">
                    <div className={`text-left font-bold text-white text-base`}>Lovers</div>
                    <div className={`text-left text-white font-semibold text-sm`}>This is the start of a sweet relationship. It&#39;s hot in here</div>
                </button>
                <button className="bg-yellow-600 p-4    rounded-xl w-full cursor-pointer transition-all duration-500 ease-in-out active:scale-90">
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