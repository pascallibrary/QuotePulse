'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-center flex items-center justify-center'
    >

    
    
      {/* Top Right Navigation */}
      <div className='absolute top-4 right-4 flex gap-3'>
        <Link
          href='/'
          className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition'
        >
          <Home className='w-4 h-4 mr-1' />
          Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition'
        >
          <ArrowLeft className='w-4 h-4 mr-1' />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className='max-w-lg w-full'>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-center'
        >
          <h1 className='text-6xl font-bold text-gray-300 mb-4'>404</h1>
          <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
            Page Not Found
          </h2>
          <p className='text-gray-600 mb-6'>
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className='bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-white shadow-md mb-6'>
            <blockquote className='text-lg font-medium text-gray-800 mb-2'>
              “Not all those who wander are lost.”
            </blockquote>
            <cite className='text-gray-600'>— J.R.R. Tolkien</cite>
          </div>

          <Link
            href='/quotes'
            className='inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300'
          >
            <Search className='w-4 h-4 mr-2' />
            Browse Quotes
          </Link>

          <p className='mt-6 text-sm text-gray-500'>
            Still stuck? <Link href='/contact' className='text-blue-600 hover:underline'>Contact us</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
