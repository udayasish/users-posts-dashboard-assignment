"use client";

import UserList from "./components/UserList";
import PostList from "./components/PostList";
import { useState } from "react";
import { Menu, Users, X } from "lucide-react";

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:static w-[280px] lg:w-1/3 h-full z-30 transition-transform duration-300 bg-gray-900 border-r border-gray-800`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            >
              <X size={24} className="text-gray-400" />
            </button>
            <div className="flex items-center gap-2">
              <Users size={24} className="text-blue-400" />
              <h2 className="font-semibold text-xl text-gray-200">Users</h2>
            </div>
          </div>
          <UserList setSelectedUserId={(id) => {
            setSelectedUserId(id);
            if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto lg:ml-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden mb-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-gray-400" />
        </button>

        {selectedUserId ? (
          <div className="max-w-3xl mx-auto">
            <PostList userId={selectedUserId} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Users size={48} className="text-gray-700 mb-4" />
            <p className="text-lg text-center">Select a user to view their posts</p>
          </div>
        )}
      </main>
    </div>
  );
}