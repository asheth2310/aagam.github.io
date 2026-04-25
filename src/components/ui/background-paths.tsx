"use client";

import { motion } from "framer-motion";

export function BackgroundPaths() {
    return (
        <div className="fixed inset-0 w-full h-screen overflow-hidden bg-neutral-950 z-0 pointer-events-none">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-black pointer-events-none opacity-80" />

            <div className="absolute inset-0 max-w-full h-full overflow-hidden pointer-events-none opacity-20">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[10%] left-[20%] w-[80%] h-[80%] stroke-neutral-500/30 fill-none"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                    viewBox="0 0 800 800"
                >
                    <path d="M 100 400 C 100 100 700 100 700 400 C 700 700 100 700 100 400 Z" />
                    <path d="M 200 400 C 200 200 600 200 600 400 C 600 600 200 600 200 400 Z" />
                    <path d="M 0 400 Q 400 0 800 400 T 1600 400" />
                    <path d="M 0 200 Q 400 400 800 200 T 1600 200" />
                </motion.svg>
            </div>

            {/* Glowing Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

        </div>
    );
}
