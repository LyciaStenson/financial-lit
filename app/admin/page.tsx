'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation'
import { getDataAsync } from '@/src/FirebaseBridge/firestore/getData';
import { SideBar } from '@/components/side-bar';
import { getCurrentAuth } from '@/src/FirebaseBridge/firebaseApp';
import useUser from '@/Hooks/AuthUserContext';
import { Banner } from '../(game)/activity/banner';

const AdminPage = () => {
    
    const [user, loading, error] = useUser();
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();

    if (user) {
        getDataAsync("users/", user.UUID!).then((value) => {
            let data = value.result?.data();
            if (data?.role == "admin") {
                setIsAdmin(true);
            } else {
                return router.push("/home");
            }
        })
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Banner title="Error"
                    description={`${error.message}`} />
            </div>
        )
    }

    if (isAdmin) {

        const loadPage = (path:string) => {
            router.push(path);
        };

        return (
            <div className=" pl-[250px]">
                <div>
                    <SideBar title="Admin">
                        <Button onClick={() => loadPage("/admin/questions")}>Questions</Button>
                        <Button onClick={() => loadPage("/admin/users")}>Users</Button>
                        <Button onClick={() => loadPage("/admin/certificate")}>Certification</Button>
                        <Button onClick={() => loadPage("/admin/qr")}>QR</Button>                 
                    </SideBar>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-5xl'>Hello {user?.displayName}</h1>
                    <h1 className='text-3xl'>Welcome to the Admin Page</h1>
                </div>
            </div>
        );
    }
};

export default AdminPage;



