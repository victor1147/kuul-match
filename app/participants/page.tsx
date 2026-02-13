import Participants from "@/components/participants/participants";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: `Valentine`,
    description: "A simple valentine's day website",
};

export default function Page() {
    return  (
        <Participants />
    )
}