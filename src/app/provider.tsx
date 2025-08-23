'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserDetailContext, UsersDetail } from '../../context/UserDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState<UsersDetail | null>(null);

  useEffect(() => {
    if (user && isLoaded) {
      CreateNewUser();
    }
  }, [user, isLoaded]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post('/api/users');
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
