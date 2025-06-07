"use client"

import Link from "next/link"
import { useRef } from "react"
import axios from "axios"
// import { useRouter } from "next/navigation"

export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return <div className="flex justify-center items-center w-screen h-screen bg-black/95 text-black">
        <div className="p-6 m-2 w-98 bg-white/95 rounded-lg">
            <div className="text-4xl font-bold pb-4 flex justify-center">
                {isSignin ? "Login" : "Sign-up"}
            </div>
            <div className="p-2">
                <input ref={usernameRef} className="border w-full border-black/40 px-2 py-1 rounded-md" type="text" placeholder="Enter username" />
            </div>
            <div className="p-2">
                <input type="password" ref={passwordRef} className="border w-full border-black/40 px-2 py-1 rounded-md" placeholder="Enter password" />
            </div>

            <div className="pt-3 flex justify-center items-center">
                <button className="bg-black/90 rounded-md text-white font-semibold px-4 hover:bg-black/75 duration-300 transition-all py-1"
                    onClick={async () => {
                        const username = usernameRef.current?.value
                        const password = passwordRef.current?.value
                        if (!username || !password) {
                            alert("Both fields are required");
                            return;
                          }
                        try {
                            const response = await axios.post(`${BACKEND_URL}/${isSignin ? "signin" : "signup"}`,
                                {
                                    username,
                                    password
                                }
                            )
                            alert(response?.data.message || "Success")
                        }catch(err){
                            console.log(err);
                            alert("Error during request");
                        }
                    }}
                >{isSignin ? "Sign-in" : "Sign-up"}</button>
            </div>
            <div className="text-sm text-gray-500 flex justify-center pt-2">
                {isSignin ? "If you don't have an account..." : "Do you already have an account?"}
                {isSignin ? (
                    <Link href="/signup" className="text-sm text-black hover:underline hover:underline-offset-2 pl-2 hover:-translate-y-1 duration-300 transition-all
                     font-semibold">Sign-up</Link>
                ) : (
                    <Link href="/signin" className="text-sm text-black hover:underline hover:underline-offset-2 pl-2 hover:-translate-y-1 duration-300 transition-all
                     font-semibold">Sign-in</Link>
                )}
            </div>
        </div>
    </div>
}