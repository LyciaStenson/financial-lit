'use client'
import { useRecaptcha } from "@/components/recaptcha";
import { setCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import signIn from "@/src/FirebaseBridge/Auth/signIn";
import { getData } from "@/src/FirebaseBridge/firestore/getData";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

function Page(): JSX.Element {
  const [username, setUsername] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        
      </div>
    </div>
  );
}

export default Page;