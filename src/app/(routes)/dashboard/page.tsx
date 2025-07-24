import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Vitals from "@/components/Vitals";

function Dashboard() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-1">
      <Header />
      <Vitals />
      <Footer/>
      
    </main>
  )
}

export default Dashboard;