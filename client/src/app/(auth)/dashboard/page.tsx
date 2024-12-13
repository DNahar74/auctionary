'use client'

import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
  const {data: session} = useSession();
  
  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user
  return (
    <div>
      <Navbar />
      <h1>Welcome, {username}!</h1>
    </div>
  )
}

export default page