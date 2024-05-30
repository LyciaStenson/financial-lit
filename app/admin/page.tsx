'use client';

import { setUserDetails, getCurrentUser, currentUser, setCurrentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import { setQuizQuestion } from '@/src/Game/quiz/quiz';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { notFound, useRouter } from 'next/navigation'
import setData from '@/src/FirebaseBridge/firestore/setData';
import signUp from '@/src/FirebaseBridge/Auth/signUp';
import { User, UserCredential } from 'firebase/auth';
import { getData } from '@/src/FirebaseBridge/firestore/getData';
import { useAuthContext } from '../game-firebase/pageLoading';
import { quizData, quizType } from '@/src/Game/quiz/quizData';
import { getRandom } from '@/src/random/randomNumberGenerator';
import { Thermometer } from 'lucide-react';
import { SideBar } from '@/components/side-bar';


function randomIntFromInterval() {
    return Math.floor(Math.random() * 70000000);
}


const AdminPage = () => {

    const [studentName, setStudentName] = useState('');
    const { user } = useAuthContext() as { user: User };
    const [isAdmin, setIsAdmin] = useState(false);

    // Access the user object from the authentication context
    // const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
        getData("users/", user.uid).then((value) => {
            let data = value.result?.data();
            if (data?.role == "admin") {
                setIsAdmin(true);
            } else {
                return router.push("/home");
            }
        })
    }

    if (isAdmin) {

        const loadPage = (path:string) => {
            router.push(path);
        };

        const handleStudentName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setStudentName(event.target.value);
        };
    

        const handleAddUser = () => {
            if (studentName == null || studentName == undefined) {
                console.log("Student needs a fucking name!");
                return;
            }

            let emailId: string = randomIntFromInterval().toString();
            let email: string = emailId + "@moneyconfidence.student.co.uk";
            console.log(email);
            signUp(email, "23@f1-*1HA%^3(DA)").then((result: UserCredential | null) => {
                console.log(result);
                let user = setUserDetails(result!.user.uid, emailId, studentName, "student");
                setData("users/", user.UUID!, user);
            }).catch((error) => {
                console.log(error);
            });
        }

        const randomNumber = () => {
            console.log(getRandom());
        }

        return (
            <div className=" pl-[250px]">
                <div>
                    <SideBar>
                        <Button onClick={() => loadPage("/admin/questions")}>Questions</Button>
                        <Button onClick={() => loadPage("/admin/users")}>Users</Button>
                        <Button onClick={() => loadPage("/admin/certificate")}>Certification</Button>
                        <Button onClick={() => loadPage("/admin/qr")}>QR</Button>                 
                    </SideBar>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-3xl'>Admin Page</h1>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-xl'>Add Users</h1>
                    <Textarea placeholder="Student Name." value={studentName} onChange={handleStudentName} />
                    <Button onClick={handleAddUser}>Add User</Button>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <Button onClick={randomNumber}>Random Number</Button>
                </div>
            </div>
        );
    }
};

export default AdminPage;



