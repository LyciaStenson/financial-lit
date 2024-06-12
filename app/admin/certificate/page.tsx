'use client';

import { currentUser, getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useEffect, useState } from "react";
import { useQRCode } from 'next-qrcode';
import { Switch } from "@/components/ui/switch";

const DownloadPage = () => {
    const [users, setUsers] = useState<currentUser[]>();
    const { Canvas } = useQRCode();
    const [isColour, setIsColour] = useState(true);

    let tempUsers: currentUser[] = [];

    // Now you can use the users array in your component 

    const generate = () =>{
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
            <h1>Certifcate</h1>
            <Switch id={`true-false-qr-code`} checked={isColour} onCheckedChange={(value) => setIsColour(value)}/>
            <h1>print in black or using colour</h1>
            <button onClick={generate}>Generate</button>
            {isColour && (
                <div>
                {
                    users?.map((user, index) => (
                        <div key={index}>
                            <div>
                                <h1>{user.displayName} is the winner</h1>
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
                            <h1>{user.displayName} is the winner</h1>
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