import React from 'react'
import AppHeader from '../dashboard/_components/AppHeader';
import Footer from '@/components/Footer';
import PatientInfo from '@/components/PatientInfo';

const patientInfo = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-28 px-4">
      <div className="print:hidden">
        <AppHeader />
      </div>
      <PatientInfo/>
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}

export default patientInfo;