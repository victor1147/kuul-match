import {Metadata} from "next";
import Participants from "@/components/participants/participants";

export const metadata: Metadata = {
  title: `KuulMatch - Participants`,
  description: "A simple valentine's day website",
};

export default function Page() {
    return (
        <div>
            <Participants />
        </div>
    )
}
