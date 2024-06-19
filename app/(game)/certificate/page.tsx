'use client';

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import Image from "next/image"
import { currentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const CertificatePage = () => {
    console.log(getCurrentUser());

    const [users, setUsers] = useState<currentUser[]>();
    const [isColour, setIsColour] = useState(true);

    let tempUsers: currentUser[] = [];

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
        <div className="flex flex-col w-full h-full "> 
                <div className="flex items-center justify-center relative">
                {
                    users?.map((user, index) => (
                        <div key={index}>
                            <div>
                                <h1 className="w-full flex items-center justify-center text-white font-msmadi text-center font-extrabold text-[4rem] absolute top-[335px] right-[0px]">
                                    {user.displayName}
                                </h1>
                            </div>
                        </div>
                    ))
                }
                </div>
            <div className="flex items-center justify-center">
                <Image
                    src="./certificate.svg"
                    alt="Certificate"
                    width={0}
                    height={0}
                    className="w-full h-auto"
                />
            </div>
            <button onClick={generate}>Generate</button>
        </div>
    )
}

export default CertificatePage;