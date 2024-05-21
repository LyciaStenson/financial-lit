'use client';

import { currentUser, getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useEffect, useState } from "react";
import { useQRCode } from 'next-qrcode';
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const DownloadPage = () => {
    const [users, setUsers] = useState<currentUser[]>();
    const { Canvas } = useQRCode();
    const [isColour, setIsColour] = useState(true);

    let tempUsers: currentUser[] = [];

    // Now you can use the users array in your component 

    const generate = () => {
        getUserCollection("users/").then((users: currentUser[]) => {
            setUsers(users);
            users.forEach((user) => {
                if (user.role == "student") {
                    tempUsers.push(user);
                }
            });
            setUsers(tempUsers);
        })
    }

    return (
        <div>
            <h1>QR</h1>
            <Switch id={`true-false-qr-code`} checked={isColour} onCheckedChange={(value) => setIsColour(value)} />
            <h1>print in black or using colour</h1>
            <button onClick={generate}>Generate</button>
            {isColour && (
                <div>
                    {
                        users?.map((user, index) => (
                            <div key={index}>
                                <div>
                                    <div className="bg-moneyconf-gold w-72 h-27 flex items-center justify-center space-x-2">
                                        <h1 className='text-l'>Hello {user.dispalyName}</h1>
                                        <Canvas
                                                text={'https://financial-lit.vercel.app/?id=' + user.emailID}
                                                options={{
                                                    errorCorrectionLevel: 'M',
                                                    margin: 5,
                                                    scale: 5, 
                                                    width: 100,
                                                    color: {
                                                        dark: '#000000',
                                                        light: '#ffd400',
                                                    },
                                                }}
                                            />
                                        <div className="grid grid-rows-4 grid-flow-col gap-4">
                                           
                                            <h1>Code: {user.emailID}</h1>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <h3 className='text-xl'>Are you ready to play!</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
            {!isColour && (
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
                                                dark: '#000000',
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
            )}
        </div>
    );
};

export default DownloadPage;