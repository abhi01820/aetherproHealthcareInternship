'use client'

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '../../context/UserDetailContext';


 export type UsersDetail={
  name:string,
  email:string,
  credits:number
}
function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {user}=useUser();
<<<<<<< HEAD
  const [userDetail,setUserDetail]=useState<any>();


  useEffect(()=>{
    user && CreateNewUser();
  },[user])
=======
  const [userDetail, setUserDetail] = useState<UsersDetail | null>(null);


 useEffect(() => {
  if (user) {
    CreateNewUser();
  }
}, [user]);

>>>>>>> c737540e6887cda3c583b5f04d14ffc2a662b00c

  const CreateNewUser=async ()=>{
    const result=await axios.post('/api/users');
    console.log(result.data);
    setUserDetail(result.data);
  }
  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}} >
        {children}
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider;