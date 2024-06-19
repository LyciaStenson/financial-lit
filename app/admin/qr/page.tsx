'use client';

import { currentUser, getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useEffect, useState } from "react";
import { useQRCode } from 'next-qrcode';
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import QRGenPage from "@/components/QRLayout";
import QRGenCode from "@/components/QRLayout";
import { Button } from "@/components/ui/button";

const DownloadPage = () => {
    const [users, setUsers] = useState<currentUser[]>();
    const { Canvas } = useQRCode();
    const [isColour, setIsColour] = useState(true);

    let tempUsers: currentUser[] = [];

    const generate = () => {
        getUserCollection("users/").then((users: currentUser[]) => {
            users.forEach((user) => {
                if (user.role == "student") {
                    console.log("User", user);
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
            <Button onClick={generate}>Generate</Button>
            {isColour && (
                <div>
                    {
                        users?.map((user, index) => (
                            <div key={index}>
                                <div>
                                    <QRGenCode name={user.displayName} code={user.emailID}>
                                        <Canvas
                                            text={'https://financial-lit.vercel.app/?id=' + user.emailID}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 5,
                                                scale: 5,
                                                width: 700,
                                                color: {
                                                    dark: '#000000',
                                                    light: '#ffffff',
                                                },
                                            }}
                                        />
                                    </QRGenCode>
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
                                <div>
                                    <QRGenCode name={user.displayName} code={user.emailID}>
                                        <Canvas
                                            text={'https://financial-lit.vercel.app/?id=' + user.emailID}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 5,
                                                scale: 5,
                                                width: 700,
                                                color: {
                                                    dark: '#000000',
                                                    light: '#ffffff',
                                                },
                                            }}
                                        />
                                    </QRGenCode>
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