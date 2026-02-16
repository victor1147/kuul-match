"use client"
import Card from "@/components/participants/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Me {
    image: string;
    uuid: string;
}

interface Val {
    name: string;
    image: string | null;
    uuid: string;
}

export default function Participants() {
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [vals, setVals] = useState<Val[][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await fetch("https://api.kuulmatch.com/vals", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    router.push("/login");
                    return;
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: `Request failed with status ${response.status}` }));
                    throw new Error(errorData.error || "An unknown error occurred");
                }

                const data = await response.json();
                setMe(data.me);
                setVals(data.vals);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const filteredParticipants = vals.flat().filter(participant =>
        participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`bg-slate-900 min-h-screen shadow-md p-6 rounded-lg text-center`}>
            <h2 className={`font-semibold mb-4 text-white text-center text-xl `}>So tell me... who&#39;s the lucky one?</h2>

            <input
                type="text"
                className={`border-pink-300 border-2 rounded-full max-w-100 w-full focus:shadow-pink-700 focus:shadow-md outline-none bg-gray-800 px-4 py-3 text-white mt-4 mb-4 font-semibold text-sm`}
                placeholder="Search for someone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className={`grid grid-cols-6 max-[1024px]:grid-cols-5 max-[820px]:grid-cols-4 max-[640px]:grid-cols-3 max-[480px]:grid-cols-2 max-[320px]:grid-cols-1 gap-3 mt-8`}>
                {me && filteredParticipants.map((participant) => (
                    <Card
                        key={participant.uuid}
                        me={me.image}
                        image={participant.image}
                        name={participant.name}
                        uuid={participant.uuid}
                    />
                ))}
            </div>
        </div>
    )
}