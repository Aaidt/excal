"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Share2, Users, Download, Layers, Star, CircleUserRound } from 'lucide-react'
import { motion } from "framer-motion"

export default function Home() {
  const features = [
    {
      icon: <Users className="h-10 w-10" />,
      title: "Real-time collboration",
      description: "Work together with your team on the same canvas in real-time, seeing changes as they happen."
    },
    {
      icon: <Share2 className="h-10 w-10" />,
      title: "Easy Sharing",
      description: "Share your drawings with a simple link. Control who can view or edit your work.",
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Infinite canvas",
      description: "Never run out of space with our infinite canvas that expands as you draw.",
    }
  ]

  const testimonial = [
    {
      quote: "Excal has transformed how our design team collaborates. The real-time features save us hours of back and forth.",
      author: "Sarah Johnson",
      role: "Product Designer, Acme Inc."
    },
    {
      quote: "I use Excal daily for wireframing and brainstorming. The interface is so intuitive that my non-designer colleagues can jump right in.",
      author: "Michael Chen",
      role: "UX Lead, TechStart"
    },
    {
      quote: "As a remote team, we needed a tool that makes visual collaboration easy. Excal exceeded our expectations on all fronts.",
      author: "Emma Rodriguez",
      role: "Project manager, RemoteWorks"
    }
  ]

  return (
    <div className="bg-black text-white min-w-screen min-h-screen min-h-full">

      <div className="top-0 left-0 border-y border-white/20 bg-black w-screen h-20">
        <div className="flex justify-between items-center h-full px-6">

          <div className="text-3xl font-bold flex items-center cursor-pointer">Excal</div>

          <div className="flex items-center gap-6">
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Features</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">How it works</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Testimonials</div>
            <div className="hover:underline hover:underline-offset-3 font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer">Pricing</div>

            <div className="flex gap-2">
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

      <div className="flex justify-between p-5 pt-12 pl-25 pr-25 pb-20 border-b border-white/30">

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


      <div className="pb-30 border-b border-white/30">
        <h1 className="font-bold text-5xl pt-10 pl-15 mr-18 flex justify-center">Powerful features for creative minds</h1>
        <p className="mr-18 pt-5 text-gray-400 flex justify-center text-xl text-center">Everything you need to bring your ideas to life, collaborate with others, <br />
          and share your vision.</p>
        <div className="flex gap-12 justify-center pt-5">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-black border border-white/20 text-white/90 p-4 w-78 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-1"
            >
              <div className="w-fit pb-6 p-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold pb-4">{feature.title}</h3>
              <p className="text-gray-400 text-wrap">{feature.description}</p>

            </motion.div>
          ))}

        </div>
      </div>


      <div className="pt-15 pb-20 border-b border-white/30 ">
        <h1 className="flex justify-center mr-25 text-5xl font-bold pb-5">Loved by teams worldwide</h1>
        <p className="flex justify-center mr-25 text-xl text-gray-400 ">See what our users say about their experience with Excal.</p>

        <div className="flex justify-center pt-10 gap-8">
          {testimonial.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-black border border-white/30 text-white/90 p-6 w-102 rounded-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-white mb-4" />
                ))}
              </div>
              <div className="text-lg pb-6">"{testimonial.quote}"</div>
              <div className="text-md flex items-center">
                <CircleUserRound className="m-2" />
                <div className="flex flex-col">
                  {testimonial.author}
                  <div className="text-sm font-thin">{testimonial.role}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>



    </div>
  );
}

