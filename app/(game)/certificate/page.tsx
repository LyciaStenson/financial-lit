'use client';

import { getCurrentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { currentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { Certificate } from "./certificate";

const CertificatePage = () => {
    console.log(getCurrentUser());

    const [users, setUsers] = useState<currentUser[]>();
    const [isColour, setIsColour] = useState(true);

    let tempUsers: currentUser[] = [];

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

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current!,
      });

    return (
        <div className="flex flex-col w-full h-full ">
                <div className="flex flex-col items-center justify-center">
                    {
                        users?.map((user, index) => (
                            <div key={index}>
                                <Certificate studentname = {user?.displayName!}/>
                            </div>
                        ))
                    }
                </div>
                <button onClick={generate}>Generate</button>
                {/*<Certificate ref={componentRef} studentname="test"/>*/}
                <button onClick={handlePrint}>Print</button>
        </div>
    )
}

export default CertificatePage;