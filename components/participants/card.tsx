import Image from "next/image";
import Link from "next/link";

interface CardProps {
    me: string;
    image: string | null;
    name: string;
    uuid: string;
}

export default function Card({ me, image, name, uuid }: CardProps) {
    // Remove trailing slash from base to be safe
    const baseUrl = "https://api.kuulmatch.com/";

    // Helper to clean up path: removes leading slash if present
    const cleanPath = (path: string) => path.startsWith('/') ? path.slice(1) : path;

    const meImageUrl = me ? `${baseUrl}/${cleanPath(me)}` : "";

    // If image exists, construct full URL. If not, use placeholder.
    const participantImageUrl = image
        ? `${baseUrl}/${cleanPath(image)}`
        : "https://placehold.co/300x300/334155/ffffff?text=?";

    return (
        <Link
            // Encode the URLs to ensure they are safe for query parameters
            href={`/predict?me=${encodeURIComponent(meImageUrl)}&image=${encodeURIComponent(participantImageUrl)}&name=${encodeURIComponent(name)}&uuid=${encodeURIComponent(uuid)}`}
            className={`rounded-xl bg-[#ffffff4d]/30 px-[.6em] pt-2 pb-3 `}
        >
            <Image
                src={participantImageUrl}
                className={`rounded-xl h-[120px] w-full object-cover`}
                alt={name}
                width={300}
                height={200}
                unoptimized={true} // OPTIONAL: Add this if you still have issues, it bypasses Next.js optimization
            />
            <div className={`text-[.8rem] text-white font-medium mt-2`}>{name}</div>
        </Link>
    );
}