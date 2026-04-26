"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { User } from "lucide-react";

export function AboutSection() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="about" className="min-h-[80vh] py-20 flex flex-col items-center justify-center container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl perspective-[1000px]"
            >
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                        <User size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 light:from-black light:to-neutral-600">
                        About Me
                    </h2>
                </div>

                <motion.div
                    className="relative w-full rounded-2xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-white/60 p-8 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300"
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* Glowing Accent */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-6 text-foreground text-lg leading-relaxed" style={{ transform: "translateZ(30px)" }}>
                            <p className="text-muted-foreground">
                                I am Aagam Sheth, a <strong className="text-blue-500">Software & AI Systems Engineer</strong>. I am currently pursuing my <strong>MS in Information Technology</strong> at Arizona State University (2024–2026).
                            </p>
                            <p className="text-muted-foreground">
                                I specialize in building intelligent applications and bridging the gap between complex software architecture and scalable ML models. My mission is building systems that can think and scale effectively.
                            </p>
                            <div className="flex gap-8 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-foreground">10+</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Tech Arsenal</span>
                                </div>
                                <div className="w-px bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200" />
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-foreground">15+</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Projects Built</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
