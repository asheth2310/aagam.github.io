"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTerminalBoot } from "./ui/animated-terminal-boot";

export function InitializationScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (progress >= 100 && isVisible) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onComplete, 800); // Wait for fade out
            }, 1000); // Give 1s pause after terminal finishes

            return () => clearTimeout(timeout);
        }
    }, [progress, isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="z-10 relative flex w-full max-w-3xl flex-col items-center px-4">
                        <AnimatedTerminalBoot onCompleteProgress={setProgress} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
