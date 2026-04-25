"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Folder, FileText, Star, GitFork, FileJson, FileCode2 } from "lucide-react";
import { Github } from "../icons";

interface GithubPreviewProps {
    isVisible: boolean;
    repoName: string;
    description: string;
    stars: number;
}

export function GithubPreview({ isVisible, repoName, description, stars }: GithubPreviewProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 bottom-full mb-4 left-1/2 -translate-x-1/2 w-72 bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-4 border-b border-[#30363d] bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors flex justify-center items-center gap-2">
                            <Github size={16} />
                            <span>asheth2310/{repoName}</span>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2">{description}</p>
                        
                        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                            <div className="flex items-center gap-1"><Star size={12} /> {stars}</div>
                            <div className="flex items-center gap-1"><GitFork size={12} /> {Math.floor(stars / 4)}</div>
                        </div>
                    </div>

                    <div className="p-2 space-y-1 bg-[#0d1117]">
                        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#161b22] text-sm text-neutral-300 transition-colors">
                            <div className="flex items-center gap-2"><Folder size={14} className="text-blue-400 fill-blue-400/20" /> <span>src</span></div>
                            <span className="text-xs text-neutral-500">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#161b22] text-sm text-neutral-300 transition-colors">
                            <div className="flex items-center gap-2"><Folder size={14} className="text-blue-400 fill-blue-400/20" /> <span>components</span></div>
                            <span className="text-xs text-neutral-500">5 days ago</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#161b22] text-sm text-neutral-300 transition-colors">
                            <div className="flex items-center gap-2"><FileCode2 size={14} className="text-emerald-400" /> <span>api.ts</span></div>
                            <span className="text-xs text-neutral-500">last week</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#161b22] text-sm text-neutral-300 transition-colors">
                            <div className="flex items-center gap-2"><FileJson size={14} className="text-yellow-400" /> <span>package.json</span></div>
                            <span className="text-xs text-neutral-500">last month</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#161b22] text-sm text-neutral-300 transition-colors">
                            <div className="flex items-center gap-2"><FileText size={14} className="text-neutral-400" /> <span>README.md</span></div>
                            <span className="text-xs text-neutral-500">2 days ago</span>
                        </div>
                    </div>

                    {/* Fake triangle pointer */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0d1117] border-b border-r border-[#30363d] rotate-45" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
