import Form from "@/components/login/form";
import Link from "next/link";

export default function Login() {
    return (
        <div className={` flex items-center justify-center`}>
            <div className={`max-w-[450px] bg-[#1c1435] p-8 pb-12 rounded-4xl text-center shadow-2xl shadow-[#FF4ECD66] w-full`}>
                <h1 className={`text-[#ff4ecd] mb-4 font-plus-jakarta-sans font-bold text-3xl`}>Welcome Back!</h1>
                <div className={`text-[#b8b8ff] text-base`}>Can&#39;t wait to find you a match.</div>
                
                <Form />
                
                <h2 className={`text-[#b8b8ff] text-sm mt-4 `}>You haven&#39;t joined us yet?
                    <Link  
                        href={`/register`}
                        className={`text-[#ff4ecd] font-bold ml-1`} 
                    >Join Now</Link>
                        </h2>
            </div>
        </div>

    )
}