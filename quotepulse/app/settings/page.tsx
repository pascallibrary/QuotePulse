'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Mock user data (replace with auth system)
const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/placeholder-avatar.png',
  notifications: {
    newQuotes: true,
    likes: false,
  },
};

export default function SettingsPage() {
  const [user, setUser] = useState(initialUser);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      if (avatarFile) formData.append('avatar', avatarFile);
      formData.append('notifications', JSON.stringify(user.notifications));

      // Replace with your API call (e.g., to /api/users/[id])
      const response = await fetch('/api/users/1', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        // Update user state with response if needed
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleNotificationToggle = (key: keyof typeof user.notifications) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: !user.notifications[key],
      },
    });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 z-0" />

      {/* Falling Stars Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none animate-fadeIn">
        <div className="w-full h-full bg-[url('/stars.gif')] opacity-10"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 max-w-md w-full bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gradient-holographic"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl font-bold font-mono text-shadow-neon text-indigo-400 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Account Settings
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={avatarPreview}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-indigo-400 shadow-neon"
                />
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </motion.div>

          {/* Profile Fields */}
          <div>
            <Input
              placeholder="Name"
              value={user.name}
              onChange={(e: { target: { value: any; }; }) => setUser({ ...user, name: e.target.value })}
              className="w-full border-glow"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border-glow"
            />
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-mono text-indigo-400">Notifications</h3>
            <div className="flex items-center justify-between">
              <label className="text-gray-300">New Quote Alerts</label>
              <motion.div
                className={`relative w-12 h-6 rounded-full p-1 cursor-pointer ${
                  user.notifications.newQuotes ? 'bg-indigo-600' : 'bg-gray-600'
                }`}
                onClick={() => handleNotificationToggle('newQuotes')}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{
                    x: user.notifications.newQuotes ? 24 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Like Notifications</label>
              <motion.div
                className={`relative w-12 h-6 rounded-full p-1 cursor-pointer ${
                  user.notifications.likes ? 'bg-indigo-600' : 'bg-gray-600'
                }`}
                onClick={() => handleNotificationToggle('likes')}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{
                    x: user.notifications.likes ? 24 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.p
              className="text-red-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              className="text-green-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.p>
          )}

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <Button
              type="submit"
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 font-arcade"
            >
              💾 Save Changes
            </Button>
          </motion.div>
        </form>

        {/* Back to Dashboard */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <Link href="/dashboard" className="text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}