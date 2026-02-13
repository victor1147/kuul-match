import {Metadata} from "next";
import Predict from "@/components/predict/Predict";

export const metadata: Metadata = {
    title: `Valentine`,
    description: "A simple valentine's day website",
};


export default function Page() {
    return (
        <Predict />
    )
}