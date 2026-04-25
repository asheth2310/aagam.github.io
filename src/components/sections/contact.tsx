"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Github, Linkedin } from "../icons";
import { Input } from "../ui/input";

export function ContactSection() {
    return (
        <section id="contact" className="py-24 container mx-auto px-4 relative z-10 pb-48">
            <div className="flex flex-col items-center mb-16">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg mb-4">
                    <Mail size={24} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-500 text-center">
                    Get in Touch
                </h2>
                <p className="mt-4 text-neutral-400 text-center max-w-2xl">
                    Open to new opportunities and interesting projects.
                </p>
            </div>

            <div className="max-w-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl backdrop-blur-sm"
                >
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm text-neutral-400">Name</label>
                            <Input 
                                className="bg-neutral-950 border-neutral-800 focus-visible:ring-emerald-500 text-neutral-200" 
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-neutral-400">Email</label>
                            <Input 
                                type="email"
                                className="bg-neutral-950 border-neutral-800 focus-visible:ring-emerald-500 text-neutral-200" 
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-neutral-400">Message</label>
                            <textarea 
                                className="flex min-h-[120px] w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-base text-neutral-200 ring-offset-background placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                                placeholder="How can we work together?"
                            />
                        </div>
                        
                        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold py-3 rounded-xl transition-colors">
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center gap-6 pt-8 border-t border-neutral-800">
                         <a href="https://github.com/asheth2310" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                            <Github size={20} />
                         </a>
                         <a href="#" className="p-3 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                            <Linkedin size={20} />
                         </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
