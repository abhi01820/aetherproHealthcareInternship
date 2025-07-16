import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Vitals from "@/components/Vitals";

function Dashboard() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4">
      <Header />
      <Vitals />
      <Footer/>
      <footer className="w-full bg-yellow-200 border-2  px-2 py-1 flex items-center justify-center border-1 border-black-300">
      <div className="text-lg text-gray-700 ">
        .
      </div>
    </footer>
    </main>
  )
}

export default Dashboard;