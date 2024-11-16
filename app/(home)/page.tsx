"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { ArrowRight, Code2, Brain, Rocket, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Tech stack with their brand colors
  const techStack = [
    { 
      icon: <FaHtml5 />, 
      name: "HTML", 
      color: "#E44D26",
      description: "Structure and semantics"
    },
    { 
      icon: <FaCss3Alt />, 
      name: "CSS", 
      color: "#264DE4",
      description: "Styling and layouts"
    },
    { 
      icon: <SiJavascript />, 
      name: "JavaScript", 
      color: "#F7DF1E",
      description: "Logic and interactivity"
    },
    { 
      icon: <FaReact />, 
      name: "React", 
      color: "#61DAFB",
      description: "Component-based UI"
    },
  ];

  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 w-full py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Hero Content */}
            <div className="space-y-8">
              <motion.div variants={item} className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-800">
                  Master Your
                  <span className="text-blue-600"> Dev Interview </span>
                  Journey
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Level up your interview skills with our comprehensive platform. Practice real questions, master core concepts, and build confidence.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={item} className="flex flex-wrap gap-6">
                <Link
                  href="/docs"
                  className="group px-8 py-4 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/playground"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all hover:scale-105"
                >
                  Try Playground
                </Link>
              </motion.div>

              {/* Key Features */}
              <motion.div variants={item} className="space-y-4 pt-8">
                {[
                  "Interactive coding challenges",
                  "Real interview questions",
                  "Comprehensive topic coverage",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-blue-600" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Tech Stack Display */}
            <motion.div variants={item} className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 1 }}
                    className="group"
                  >
                    <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="text-5xl mb-4" style={{ color: tech.color }}>
                        {tech.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{tech.name}</h3>
                      <p className="text-gray-600">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Why Choose Dev Axioms?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to ace your technical interviews in one place
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8 text-blue-600" />,
                title: "Interactive Learning",
                description: "Practice with real-world coding challenges and get instant feedback"
              },
              {
                icon: <Brain className="w-8 h-8 text-blue-600" />,
                title: "Comprehensive Coverage",
                description: "From basics to advanced topics, we've got you covered"
              },
              {
                icon: <Rocket className="w-8 h-8 text-blue-600" />,
                title: "Career Growth",
                description: "Build confidence and accelerate your career progression"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all">
                  <div className="mb-6 p-3 w-fit rounded-xl bg-blue-50">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                feedback: "This platform has transformed my interview preparation!",
              },
              {
                name: "Jane Smith",
                feedback: "The interactive challenges are a game-changer.",
              },
              {
                name: "Sam Wilson",
                feedback: "I landed my dream job thanks to Dev Axioms!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white shadow-lg">
                <p className="text-lg mb-4 text-gray-700">"{testimonial.feedback}"</p>
                <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

  
  

      {/* Additional sections can be added here */}
    </main>
  );
}
