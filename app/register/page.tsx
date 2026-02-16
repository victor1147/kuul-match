import Register from "@/components/register/register";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: `KuulMatch -Register`,
    description: "Register",
};

export default function Page() {
    return (
        <Register />
    )
}