"use client";

import { useState } from "react";
import { 
  Search, Video, Phone, MoreVertical, Paperclip, Mic, Send, Image as ImageIcon, Smile
} from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const users = [
    { id: 1, name: "Alice Johnson", lastMessage: "Hey, are we still on for later?", time: "10:30 AM", online: true },
    { id: 2, name: "Bob Smith", lastMessage: "Sent an attachment", time: "09:45 AM", online: false },
    { id: 3, name: "Charlie Brown", lastMessage: "Let's do a video call.", time: "Yesterday", online: true },
  ];

  const messages = [
    { id: 1, sender: "Alice Johnson", text: "Hi! How are you?", time: "10:20 AM", isMe: false },
    { id: 2, sender: "Me", text: "I'm good, thanks! What about you?", time: "10:25 AM", isMe: true },
    { id: 3, sender: "Alice Johnson", text: "Hey, are we still on for later?", time: "10:30 AM", isMe: false },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden p-2 md:p-4 gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 glass rounded-2xl flex flex-col overflow-hidden shrink-0 hidden md:flex">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {users.map((user) => (
            <div key={user.id} className="flex items-center p-4 hover:bg-white/5 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e293b]"></div>
                )}
              </div>
              <div className="ml-4 flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium truncate">{user.name}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{user.time}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md z-10">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1e293b]"></div>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">Alice Johnson</h2>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-primary hover:text-primary-hover">
              <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-accent hover:text-purple-400">
              <Video size={20} />
            </button>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center my-4">
            <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-gray-400">Today</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl p-3 ${
                msg.isMe 
                  ? "bg-primary text-white rounded-tr-sm" 
                  : "bg-white/10 text-white rounded-tl-sm border border-white/5"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`text-[10px] mt-1 text-right ${msg.isMe ? "text-primary-100" : "text-gray-400"}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
          <div className="flex items-end space-x-2">
            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1 relative">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <button className="absolute right-3 bottom-3 text-gray-400 hover:text-white transition-colors">
                <Smile size={20} />
              </button>
            </div>

            {message.trim() ? (
              <button className="p-3 bg-primary hover:bg-primary-hover text-white rounded-full transition-colors flex-shrink-0 shadow-lg shadow-primary/25">
                <Send size={20} className="ml-1" />
              </button>
            ) : (
              <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex-shrink-0">
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
