"use client"

import Image from "next/image";

export default function Home() {
  return (
    <div className="fixed top-0 left-0 bg-black/70 border-b backdrop-blur-md w-screen h-18">
      <div className="flex justify-between pt-2">
        <div className="flex justify-center items-center text-3xl pl-4 pt-2">Excal</div>
        <div className="flex justify-center items-center pt-3">
          <div className="px-4 hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Features</div>
          <div className="px-4 hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">How it works</div>
          <div className="px-4 hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Testimonials</div>
          <div className="px-4 hover:underline hover:underline-offset-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Pricing</div>
        </div>
      </div>

    </div>
  );
}

