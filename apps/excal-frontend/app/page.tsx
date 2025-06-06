"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from 'lucide-react'
import { Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-black text-white min-w-screen min-h-screen">

      <div className="top-0 left-0 border-y border-white/20 bg-black w-screen h-20">
        <div className="flex justify-between items-center h-full px-6">

          <div className="text-3xl font-bold flex items-center cursor-pointer">Excal</div>

          <div className="flex items-center gap-6">
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Features</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">How it works</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Testimonials</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Pricing</div>

            <div className="flex gap-3">
              <Link href="/signup">
                <button className="bg-white font-semibold text-black transition-all duration-300 border hover:bg-white/80 px-3 py-2 rounded-md cursor-pointer">Signup</button>
              </Link>

              <Link href="/signin">
                <button className="bg-black font-semibold border border-white/30 transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-md cursor-pointer">Login</button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-between p-5 pt-12 pl-25 pr-25">

        <div className="flex flex-col pt-5">
          <div className="tracking-wide font-bold text-6xl pb-5">
            Draw and collaborate <br />
            in real-time
          </div>

          <div className=" text-xl text-gray-400 text-justify text-wrap leading-8">
            Create beautiful diagrams, sketches and wireframes with a <br />
            simple, intuitive interface. Share your ideas with your team in <br />
            real-time and bring your concpets to life.
          </div>

          <div className="pt-5 flex ">
            <button className="bg-white flex items-center text-black font-medium text-md rounded-md px-3 py-2 flex cursor-pointer hover:bg-white/80 transition-all duration-200">
              Start drawing now <ArrowRight className="pl-2" />
            </button>
            <button
              className="ml-6 bg-black font-medium border flex items-center border-white/30 transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-md cursor-pointer">
              Watch demo
            </button>
          </div>

          <div className="flex pt-5 text-gray-400">
            <Users className="mr-2" /> 15,000+ teams already using Excal.
          </div>

        </div>

        <Image className="hover:shadow-lg transition-all duration-200 hover:shadow-white/30" src="https://i.pinimg.com/736x/6e/22/33/6e22335dfb94c453afefc69cb46528f2.jpg" alt="image" width={400} height={500} />
      </div>

    </div>
  );
}

