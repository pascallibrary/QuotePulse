'use client'

import Link from 'next/link';

import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className='relative min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white flex items-center justify-center p-6 overflow-hidden'>
            {/* Animated Background Grid */}
            <div className='absolute top-0 left-0 w-full h-full bg-[url("/grid.svg")] opacity-10 z-0' />

            {/* Animated Character */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
              className='absolute top-10 left-1/2 transform -translate-x-1/2 w-72 h-72 z-10'
            >
            </motion.div>

            <div className='relative z-20 max-w-2xl w-full text-center space-y-8 mt-40'>
                <motion.h1 
                  className='text-4xl md:text-5xl font-bold font-mono text-shadow-neon'
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1, duration: 1 }}
                >
                    Welcome to <span className='text-indigo-400'>QuotePulse</span>
                </motion.h1>

                <motion.p 
                  className='text-lg md:text-xl text-gray-300 leading-relaxed'
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1.5, duration: 1 }}
                >
                    Your daily dose of inspiration - curated from psychology, personal development, the Bible, and more. Delivered straight to your mind, inbox, heart.
                </motion.p>

                <motion.div 
                  className='flex flex-col md:flex-row justify-center gap-4'
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 2, duration: 1 }}
                >
                    <Link href="/quotes" className='inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-arcade hover:bg-purple-700 transition'>
                       <p>🎮 Start Quotes</p> 
                    </Link>

                    <Link href="/categories" className='inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-arcade hover:bg-indigo-700 transition'>
                        <p>🗂️ Explore Categories</p>
                    </Link>

                    <Link href='/subscribe' className='inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-arcade hover:bg-blue-600 transition'> 
                        <p>📬 Subscribe</p>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative falling particles overlay (optional) */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none animate-fadeIn">
                <div className='w-full h-full bg-[url("/stars.gif")] opacity-10'></div>
            </div>
        </main>
    );
}
