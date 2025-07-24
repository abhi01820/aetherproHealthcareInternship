import React from 'react'
import AppHeader from './_components/AppHeader';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-[60px]">
      <AppHeader />
      {children}
    </div>
  );
}


export default DashboardLayout

