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
import { getData, getDataAsync } from '@/src/FirebaseBridge/firestore/getData';
import { quizData, quizType } from '@/src/Game/quiz/quizData';
import { getRandom } from '@/src/random/randomNumberGenerator';
import { SideBar } from '@/components/side-bar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getCurrentAuth } from '@/src/FirebaseBridge/firebaseApp';

const auth = getCurrentAuth();

const AdminPage = () => {

    const [studentName, setStudentName] = useState('');
    const [role, setRole] = useState('');

    const [user, loading, error] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    // Access the user object from the authentication context
    // const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
        getDataAsync("users/", user.uid).then((value) => {
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
    
        const handleRole = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setRole(event.target.value);
        };

        const handleAddUser = () => {
            if (studentName == null || studentName == undefined) {
                alert("Student needs a name!");
                return;
            }
            
            let email: string = "";
            let emailId: string = "";
            let password: string = "";
            if(role == "student"){
                email = emailId + "@moneyconfidence.co.uk";
                password = "23@f1-*1HA%^3(DA)";
            }

            console.log(email);
            signUp(email, password, role).then((result: UserCredential | null) => {
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
                    <h1 className='text-5xl'>Hello {getCurrentUser().displayName}</h1>
                    <h1 className='text-3xl'>Welcome to the Admin Page</h1>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-xl'>Add Users</h1>
                    <Textarea placeholder="Name." value={studentName} onChange={handleStudentName} />
                    <Textarea placeholder="Role." value={role} onChange={handleRole} />
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



