"use client";

import { useState } from "react";
import { InitializationScreen } from "@/components/initialization-screen";
import { NavigationDock } from "@/components/navigation-dock";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ContactSection } from "@/components/sections/contact";
import { motion } from "framer-motion";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { AiChatWidget } from "@/components/ai-chat-widget";

export default function Home() {
    const [isInitialized, setIsInitialized] = useState(false);

    return (
        <main className="relative min-h-screen bg-transparent text-neutral-50 selection:bg-blue-500/30">
            <WebGLShader />
            
            {!isInitialized && (
                <InitializationScreen onComplete={() => setIsInitialized(true)} />
            )}

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: isInitialized ? 1 : 0 }} 
                transition={{ duration: 1 }}
                className={`${!isInitialized ? "pointer-events-none" : ""}`}
            >
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <NavigationDock />
                </div>
                
                <div className="fixed bottom-6 right-6 z-50">
                    <AiChatWidget />
                </div>

                <HeroSection />

                {/* Frosted Glass Sub-Page Layer */}
                <div className="relative z-10 w-full min-h-screen bg-neutral-950/60 backdrop-blur-2xl border-t border-neutral-800/50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <AboutSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <TechStackSection />
                    <ContactSection />
                </div>
            </motion.div>
        </main>
    );
}
