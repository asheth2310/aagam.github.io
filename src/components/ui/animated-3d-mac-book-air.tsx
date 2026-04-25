"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "./gooey-text-morphing";

export function Animated3dMacBookAir({ progress }: { progress: number }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Based on the progress (0-100), we open the lid and scale out
    // If progress === 100, we perform an exit animation
    const isComplete = progress >= 100;

    return (
        <div className="relative w-full h-[60vh] flex items-center justify-center perspective-[1200px]">
            <motion.div
                className="relative w-[300px] sm:w-[500px] h-[200px] sm:h-[320px]"
                animate={{
                    scale: isComplete ? 2.5 : 1,
                    opacity: isComplete ? 0 : 1,
                    translateZ: isComplete ? 500 : 0,
                    rotateY: isComplete ? -10 : 0, 
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Macbook Base */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-[20px] rounded-b-xl bg-neutral-800 shadow-2xl border-t border-neutral-700/50"
                    style={{ transform: "rotateX(90deg) translateZ(10px)", transformOrigin: "bottom" }}
                >
                    <div className="mx-auto w-[60%] h-[4px] bg-neutral-900 rounded-b-sm border-t border-neutral-700/30"></div>
                </div>

                {/* Macbook Screen (Lid) */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-full bg-neutral-900 border-[8px] border-neutral-950 rounded-xl overflow-hidden shadow-2xl"
                    style={{ transformOrigin: "bottom" }}
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: isComplete ? 0 : 90 - (progress * 0.9) }}
                    transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.1 // Fast responsive updates as progress changes
                    }}
                >
                    {/* Screen Content */}
                    <div className="w-full h-full bg-neutral-950 relative overflow-hidden flex flex-col items-center justify-center border border-neutral-800/50">
                        {/* Fake Code / OS Lines */}
                        <div className="absolute top-4 left-4 flex gap-1.5 opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
                            <GooeyText 
                                texts={["WELCOME", "TO", "AAGAM'S", "PORTFOLIO"]}
                                morphTime={1}
                                cooldownTime={0.3}
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
