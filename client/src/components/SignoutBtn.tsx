import { signOut } from 'next-auth/react';
import React from 'react';

const SignoutBtn: React.FC = () => {
  return (
    <button
      className="px-4 py-2 font-bold text-[#333333] bg-[#4B9CD3] hover:bg-[#A3E635] rounded-lg shadow-lg transition-all duration-300"
      style={{ boxShadow: "0px 4px 15px rgba(75, 156, 211, 0.5)" }}
      onClick={() => { signOut(); }}
    >
      Sign Out
    </button>
  );
};

export default SignoutBtn;
