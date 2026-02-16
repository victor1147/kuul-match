import {Metadata} from "next";
import Predict from "@/components/predict/Predict";

export const metadata: Metadata = {
    title: `KuulMatch - Predict`,
    description: "Predict",
};


export default function Page() {
    return (
        <Predict />
    )
}