"use client"

import { Button } from "@repo/ui/Button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-[#0C090A] text-white w-screen h-screen">

      <div className="top-0 left-0 bg-black w-screen h-20">
        <div className="flex justify-between items-center h-full px-6">
          <div className="text-3xl font-bold">Excal</div>
          <div className="flex items-center gap-6">
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Features</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">How it works</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Testimonials</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Pricing</div>
            <div className="flex gap-3">
              <Link href={"/signup"}>
                <button className="bg-white font-semibold text-black transition-all duration-300 border hover:bg-white/90 px-3 py-1 rounded-md cursor-pointer">Signup</button>
              </Link>

              <Link href={"/signin"}>
                <button className="bg-black font-semibold border-1 transition-all duration-300 hover:bg-black/60 px-3 py-1 rounded-md cursor-pointer">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

