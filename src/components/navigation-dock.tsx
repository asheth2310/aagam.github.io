"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Code2, Layers, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { label: "About", icon: User, href: "#about" },
    { label: "Experience", icon: Briefcase, href: "#experience" },
    { label: "Projects", icon: Code2, href: "#projects" },
    { label: "Tech", icon: Layers, href: "#tech" },
    { label: "Contact", icon: Mail, href: "#contact" },
];

export function NavigationDock() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => item.href.substring(1));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 300) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id.substring(1));
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <motion.div 
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
        >
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-full shadow-2xl">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                        <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            className={`relative p-3 rounded-full transition-all duration-300 hover:bg-neutral-800 ${
                                isActive ? "text-blue-400" : "text-neutral-400 hover:text-neutral-200"
                            }`}
                        >
                            {isActive && (
                                <motion.div 
                                    className="absolute inset-0 bg-neutral-800 rounded-full -z-10"
                                    layoutId="dock-active"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon size={20} />
                            
                            {/* Hover Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-neutral-700 text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 hover:opacity-100 peer-hover:opacity-100 hidden group-hover:block">
                                {item.label}
                            </div>
                        </button>
                    )
                })}
            </div>
        </motion.div>
    );
}
