// not found 

'use client';

import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound () {
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4'>
          <div className='mb-8'>
            {/* 404 visual*/}
            <div className='text-8xl font-bold text-gray-300 mb-4'>404</div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                Page Not Found 
            </h1>
            <p className='text-gray-600 mb-6'>
               The page you're looking for doesn't exist or has been moved.
            </p>

            {/*Inspirational Quotes */}
            <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white'>
             <blockquote className="text-lg font-medium text-gray-800 mb-2">
              "Not all those who wander are lost."
            </blockquote>
            <cite className="text-gray-600">— J.R.R. Tolkien</cite>
            </div>
          </div>
           <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <Link
            href="/quotes"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Quotes
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Lost? Try searching for quotes or <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link></p>
        </div>
        </div>
    )
}