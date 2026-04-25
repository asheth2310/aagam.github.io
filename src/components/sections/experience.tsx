"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const EXPERIENCES = [
    {
        role: "Academic Tutor",
        company: "Arizona State University (ASU)",
        period: "Aug 2024 - Present",
        desc: "Tutoring 50+ students in CS, Math, and Statistics using Python and Java; developing complex problem sets for algorithms and DSA."
    },
    {
        role: "Software Development Intern",
        company: "Kintu Designs Pvt. Ltd.",
        period: "Mar 2024 - Aug 2024",
        desc: "Full-stack developer (Java, Python, React). Built scalable microservices, implemented AI-driven log analysis for CI/CD, and reduced incident detection time by ~40% using ML observability."
    },
    {
        role: "Software Engineer Intern",
        company: "Uniqual Itech",
        period: "May 2023 - Jul 2023",
        desc: "Developed 17+ reusable React components and integrated AI-powered data transformation pipelines for automated structured data extraction."
    }
];

export function ExperienceSection() {
    return (
        <section id="experience" className="py-24 container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-16">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg mb-4">
                    <Briefcase size={24} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-500 text-center">
                    Experience
                </h2>
            </div>

            <div className="max-w-3xl mx-auto border-l border-neutral-800 pl-8 ml-4 md:ml-auto space-y-12 relative before:absolute before:inset-0 before:ml-[-1px] before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:to-blue-500 before:opacity-20 flex flex-col items-start pr-0 md:pr-12 md:pl-12">
                {EXPERIENCES.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-12 mt-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] md:-left-16" />
                        
                        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm hover:border-neutral-700 transition-colors">
                            <span className="text-sm font-mono text-purple-400 mb-2 block">{exp.period}</span>
                            <h3 className="text-xl font-bold text-neutral-100">{exp.role}</h3>
                            <h4 className="text-blue-400 font-medium mb-4">{exp.company}</h4>
                            <p className="text-neutral-400">{exp.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
