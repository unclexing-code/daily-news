'use client';


import Card from '@/components/Card';
import {BookOpenCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner"

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Subscribed successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to subscribe");
      }).finally(() => {
        setEmail("");
      });
  };







  return (
    <div className="min-h-screen bg-white">
      {/* header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3" >
          <BookOpenCheck />
          <h1 className="text-3xl font-bold">Daily News</h1>
        </div>
        <div className="flex items-center gap-6" >
          <a href="/login" className="text-sm font-medium text-blue-500">
            About
          </a>
          <a href="/register" className="text-sm font-medium text-blue-500">
            Contact
          </a>
        </div>
      </header>

      {/* main content */}

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* title */}
        <div className="text-center mb-16"> 
          <h2 className="text-3xl font-bold mb-4">
            Welcome to Daily News
          </h2>
          <p className="text-gray-600 text-lg">
            Your daily dose of news, curated just for you.
          </p>
        </div>
        {/* input and subscribe button */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
        {/* news cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
          <Card title='card 1' description='This is the description for card 1.' />
          <Card title='card 2' description='This is the description for card 2.' />
          <Card title='card 3' description='This is the description for card 3.' />
        </div>



      </div>

       



    
    </div>
  );
}
