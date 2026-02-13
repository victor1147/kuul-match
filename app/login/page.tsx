import {Metadata} from "next";
import Login from "@/components/login/login";

export const metadata: Metadata = {
    title: `Valentine`,
    description: "A simple valentine's day website",
};

export default function Page() {
    return (
        <div>
            <Login />
        </div>
    )
}
