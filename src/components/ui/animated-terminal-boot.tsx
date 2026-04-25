"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
    "import torch",
    "import torch.nn as nn",
    "from aagam.core import QuantumWorkspace",
    "",
    "def initialize_ai_portfolio(user_id='Aagam_Sheth'):",
    "    print(f'Allocating memory for {user_id}...')",
    "    model = nn.Transformer(num_encoder_layers=12, num_decoder_layers=12)",
    "    model.load_state_dict(torch.load('weights/aagam_v2.pt'))",
    "    ",
    "    if torch.cuda.is_available():",
    "        model.to('cuda:0')",
    "        print('GPU acceleration engaged.')",
    "    ",
    "    workspace = QuantumWorkspace(engine=model, render_mode='webgl')",
    "    workspace.launch()",
    "",
    "if __name__ == '__main__':",
    "    initialize_ai_portfolio()"
];

export function AnimatedTerminalBoot({ onCompleteProgress }: { onCompleteProgress: (prog: number) => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLine = 0;
        
        const interval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                setLines((prev) => [...prev, BOOT_SEQUENCE[currentLine]]);
                currentLine++;
                // Faster progress math since there are more lines
                const newProgress = Math.floor((currentLine / BOOT_SEQUENCE.length) * 100);
                setProgress(newProgress);
                onCompleteProgress(newProgress);
            } else {
                clearInterval(interval);
            }
        }, 150); // Mmuch faster typing for code (150ms per line)

        return () => clearInterval(interval);
    }, [onCompleteProgress]);

    return (
        <div className="w-full max-w-2xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg p-6 font-mono text-sm sm:text-base text-blue-500 shadow-2xl shadow-blue-500/10">
            <div className="flex gap-2 mb-4 mb-border-b border-neutral-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            <div className="space-y-1">
                {lines.map((line, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start"
                    >
                        {/* Render code with indentation support */}
                        <pre className="text-blue-500 font-mono text-sm sm:text-base">
                            {line || " "}
                        </pre>
                    </motion.div>
                ))}
            </div>

            {progress < 100 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-emerald-500 mt-2"
                />
            )}
            
            <div className="mt-8 flex items-center space-x-4">
                <div className="flex-1 h-1 bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-500"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <span className="text-blue-500 font-bold">{progress}%</span>
            </div>
        </div>
    );
}
