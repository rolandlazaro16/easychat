"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary redirect to chat
    router.push("/chat");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="flex items-center justify-center mb-8 space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">EasyChat</h1>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-sm text-gray-400">
            {isLogin ? "Enter your details to sign in" : "Sign up to start chatting"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-500"
              />
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 group mt-6"
          >
            <span>{isLogin ? "Sign In" : "Sign Up"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleAuthMode}
              className="ml-2 text-primary hover:text-accent font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
