'use client';

import { setUserDetails } from '@/src/FirebaseBridge/Auth/currentUser';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import setData from '@/src/FirebaseBridge/firestore/setData';
import signUp from '@/src/FirebaseBridge/Auth/signUp';
import { UserCredential } from 'firebase/auth';
import { getDataAsync } from '@/src/FirebaseBridge/firestore/getData';
import { SideBar } from '@/components/side-bar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getCurrentAuth } from '@/src/FirebaseBridge/firebaseApp';
import useUser from '@/Hooks/AuthUserContext';

const auth = getCurrentAuth();

const AdminPage = () => {
    
    const [user, loading, error] = useUser();
    const [isTeacher, setIsTeacher] = useState(false);

    // Access the user object from the authentication context
    // const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
        getDataAsync("users/", user.UUID!).then((value) => {
            let data = value.result?.data();
            if (data?.role == "teacher") {
                setIsTeacher(true);
            } else {
                return router.push("/home");
            }
        })
    }

    if (isTeacher) {

        const loadPage = (path:string) => {
            router.push(path);
        };

        return (
            <div className=" pl-[250px]">
                <div>
                    <SideBar title="Teacher">
                        <Button onClick={() => router.push("teacher/users")}>Users</Button>
                    </SideBar>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-5xl'>Hello {user?.displayName}</h1>
                    <h1 className='text-3xl'>Welcome to the Teacher Page</h1>
                </div>
            </div>
        );
    }
};

export default AdminPage;



