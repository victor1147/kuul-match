"use client"
import Link from "next/link"
export default function Header() {
    return (
        <header className={`shadow-xl shadow-[rgba(2,6,23,0.18)] sticky top-0 w-full z-100`}>
            <Link href="/" className={``}>
                <img 
                    src="https://api.kuulmatch.com/uploads/images/logo.png" 
                    alt="logo" 
                    width={108} 
                    height={100} 
                />
            </Link>
        </header>
   )
}