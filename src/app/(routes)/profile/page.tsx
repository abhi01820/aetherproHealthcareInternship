import React from 'react'
import AppHeader from '../dashboard/_components/AppHeader';
import Footer from '@/components/Footer';
import ClinicProfile from '@/components/ClinicProfile';

const Profile = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-28 px-4">
      <div className="print:hidden">
        <AppHeader />
      </div>
      <ClinicProfile/>
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}

export default Profile;