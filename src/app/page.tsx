import Link from "next/link";
import { MessageSquare, Video, Phone, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between glass z-10 sticky top-0 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <MessageSquare size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">EasyChat</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link 
            href="/auth" 
            className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className="max-w-3xl space-y-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Connect with everyone, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              anywhere, anytime.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Experience seamless text, voice, and high-definition video calling in one beautifully designed platform. Secure, fast, and simple to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link 
              href="/auth" 
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              Start Chatting Now
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Messaging</h3>
            <p className="text-gray-400">Lightning fast text chat with real-time read receipts and typing indicators.</p>
          </div>
          
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">HD Video Calls</h3>
            <p className="text-gray-400">Crystal clear peer-to-peer video calling powered by advanced WebRTC.</p>
          </div>
          
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your communications are kept secure with modern encryption standards.</p>
          </div>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]"></div>
      </div>
    </div>
  );
}
