"use client";

import { motion } from "framer-motion";
import { LiquidButton } from "../ui/liquid-glass-button";

export function HeroSection() {
    const letters = "AAGAM SHETH".split("");

    const scrollToAbout = () => {
        const el = document.getElementById("about");
        if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    };

    return (
        <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
            <div className="z-10 text-center flex flex-col items-center px-4 w-full">
                <div className="flex flex-wrap justify-center mb-4 max-w-[100vw]">
                    {letters.map((letter, i) => (
                        <motion.h1
                            key={i}
                            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 light:from-black light:to-neutral-600"
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                delay: 0.1 * i,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            {letter === " " ? '\u00A0' : letter}
                        </motion.h1>
                    ))}
                </div>

                <motion.p
                    className="text-lg md:text-2xl text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-light tracking-wide max-w-xl px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Software & AI Systems Engineer
                    <br />
                    <span className="flex items-center justify-center text-sm md:text-lg text-blue-500 mt-2 italic font-medium"><span className="w-2 h-2 inline-block rounded-full bg-blue-500 mr-2 animate-pulse" />Building Systems That Think & Scale</span>
                </motion.p>
                
                <div className="my-8 flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    </span>
                    <p className="text-xs md:text-sm text-blue-500 dark:text-blue-400 light:text-blue-600 font-medium">Available for New Projects</p>
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <LiquidButton 
                        onClick={scrollToAbout}
                        className="text-neutral-900 dark:text-white light:text-neutral-900 border-neutral-300 dark:border-white/20 light:border-neutral-300 rounded-full bg-neutral-100 dark:bg-white/5 light:bg-neutral-100/50 shadow-lg" 
                        size={'xl'}
                    >
                        Explore Portfolio
                    </LiquidButton>
                </motion.div>
            </div>
        </section>
    );
}
