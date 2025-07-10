'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound () {
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4 text-center'
        >
          <div className='mb-8'>
            <motion.div className='text-8xl font-bold text-gray-300 mb-4'>404</motion.div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Page Not Found</h1>
            <p className='text-gray-600 mb-6'>The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>

            <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white'>
              <blockquote className='text-lg font-medium text-gray-800 mb-2'>&ldquo;Not all those who wander are lost.&rdquo;</blockquote>
              <cite className='text-gray-600'>&mdash; J.R.R. Tolkien</cite>
            </div>
          </div>

          <div className='space-y-4 w-full max-w-sm'>
            <Link
              href='/'
              className='flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            >
              <Home className='w-4 h-4 mr-2' /> Go Home
            </Link>

            <Link
              href='/quotes'
              className='flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300'
            >
              <Search className='w-4 h-4 mr-2' /> Browse Quotes
            </Link>

            <button
              onClick={() => window.history.back()}
              className='flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300'
            >
              <ArrowLeft className='w-4 h-4 mr-2' /> Go Back
            </button>
          </div>

          <div className='mt-8 text-sm text-gray-500'>
            <p>
              Lost? Try searching for quotes or{' '}
              <Link href='/contact' className='text-blue-600 hover:underline'>contact us</Link>
            </p>
          </div>
        </motion.div>
    );
}
