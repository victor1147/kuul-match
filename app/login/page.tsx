import {Metadata} from "next";
import Login from "@/components/login/login";

export const metadata: Metadata = {
    title: `KuulMatch - Log In`,
    description: "Log In",
};

export default function Page() {
    return (
        <div>
            <Login />
        </div>
    )
}
