'use client';

import { currentUser, getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useEffect, useState } from "react";
import { useQRCode } from 'next-qrcode';

const DownloadPage = () => {
    const [users, setUsers] = useState<currentUser[]>();
    const { Canvas } = useQRCode();

    let tempUsers: currentUser[] = [];

    // Now you can use the users array in your component 
    useEffect(() => {
        getUserCollection("users/").then((users: currentUser[]) => {
            setUsers(users);
            users.forEach((user) => {
                if (user.role == "student") {
                    tempUsers.push(user);
                }
            });
            setUsers(tempUsers);
        })
    }, []);

    return (
        <div>
            {
                users?.map((user, index) => (
                    <div key={index}>
                        <h1 className='text-2xl'>Hello {user.dispalyName}</h1>
                        <div>
                            <Canvas
                                text={'https://financial-lit.vercel.app/?id=' + user.emailID}
                                options={{
                                    errorCorrectionLevel: 'M',
                                    margin: 5,
                                    scale: 5,
                                    width: 70,
                                    color: {
                                        dark: '#390176',
                                        light: '#ffffff',
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <h3 className='text-xl'>Are you ready to play!</h3>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DownloadPage;