"use client"

import Image from "next/image";
import { Button } from "@repo/ui/button"

export default function Home() {
  return (
    <div className="bg-[#0C090A] text-white w-screen h-screen">

      <div className="fixed top-0 left-0 bg-black/70 backdrop-blur-md w-screen h-20">
        <div className="flex justify-between items-center h-full px-6">
          <div className="text-3xl">Excal</div>
          <div className="flex items-center gap-6">
            <div className="hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Features</div>
            <div className="hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">How it works</div>
            <div className="hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Testimonials</div>
            <div className="hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Pricing</div>
            <div className="flex gap-3">
              <Button size="md" color="white" text="Signin" />
              <Button size="md" color="white" text="Signup" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

