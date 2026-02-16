"use client"

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DoneContent() {
    const searchParams = useSearchParams();

    const result = searchParams.get('result') || 'Future Unclear';
    const rawImage = searchParams.get('image');
    const name = searchParams.get('name') || 'Unknown';

    // 1. SAFEGUARD: If no image is found in URL, use a placeholder
    const imageSrc = rawImage && rawImage !== "null" && rawImage !== "undefined"
        ? rawImage
        : "https://placehold.co/100x100/pink/white?text=?";

    return (
        <div className={`max-w-[700px] text-center mx-auto bg-white rounded-3xl px-10 py-14`}>
            <div className={`size-20 bg-green-500 text-center rounded-full flex items-center justify-center text-[3rem] mx-auto`}>✨</div>
            <h1 className={`text-[1.9rem] font-bold mt-3`}>
                You Predicted The Future!
            </h1>
            <div className={`w-full border-2 border-pink-200 bg-pink-100 rounded-3xl mt-8 p-6`}>
                <div>You predicted:</div>

                <div className={`text-[1.8rem] font-bold mt-3`}>🚀 {result}</div>

                <div className={`flex items-end justify-center gap-4 w-fit mx-auto mt-6 mb-6`}>
                    <Image
                        src={imageSrc}
                        className={`border-pink-300 size-16 border-2 rounded-full object-cover bg-white`}
                        alt={`Prediction target`}
                        width={64}
                        height={64}
                        // 2. SAFETY: Unoptimized helps if your next.config.ts domains are strict
                        unoptimized={true}
                    />

                    <div className="text-xl font-medium pb-3">With {name}</div>
                </div>

                <div className="text-gray-600 italic">We bear witness to this beginning.</div>

                <div className="font-bold text-pink-600 mt-2 italic">This is Permanent !!</div>

            </div>
        </div>
    )
}

// 3. REQUIRED: Suspense Wrapper
export default function Done() {
    return (
        <Suspense fallback={<div>Loading result...</div>}>
            <DoneContent />
        </Suspense>
    );
}