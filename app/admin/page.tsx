'use client';

import { setUserDetails, getCurrentUser, currentUser, setCurrentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import React, { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { setQuestionData } from '@/src/firebaseBridge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { notFound, useRouter } from 'next/navigation'
import setData from '@/src/FirebaseBridge/firestore/setData';
import signUp from '@/src/FirebaseBridge/Auth/signUp';
import { User, UserCredential } from 'firebase/auth';
import { getData } from '@/src/FirebaseBridge/firestore/getData';
import { useAuthContext } from '../game-firebase/pageLoading';

function randomIntFromInterval() {
    return Math.floor(Math.random() * 70000000);
}


const AdminPage = () => {

    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([{ Answer: '', Result: false }]);
    const [studentName, setStudentName] = useState('');
    const { user } = useAuthContext() as { user: User }; // Use 'as' to assert the type as { user: any }
    const [isAdmin, setIsAdmin] = useState(false);

    // Access the user object from the authentication context
    // const { user } = useAuthContext();
    const router = useRouter();
    
    if(user){
        getData("users/", user.uid).then((value) => {
            let data = value.result?.data();
            if(data?.role == "admin"){
                setIsAdmin(true);
            }else{
                return router.push("/home");
            }
        })
    }

    if(isAdmin){
        const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setQuestion(event.target.value);
        };
    
        const handleStudentName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setStudentName(event.target.value);
        };
    
        const handleChoiceAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const updatedChoices = [...choices];
            updatedChoices[index].Answer = event.target.value;
            setChoices(updatedChoices);
        };
    
        const handleChoiceResultChange = (index: number, value: boolean) => {
            const updatedChoices = [...choices];
            updatedChoices[index].Result = value;
            setChoices(updatedChoices);
        };
    
        const handleAddChoice = () => {
            setChoices(prevChoices => [...prevChoices, { Answer: '', Result: false }]);
        };
    
        const handleAddQuestion = () => {
            setQuestionData(question, choices);
        };
    
        const handleAddUser = () => {
            if (studentName == null || studentName == undefined) {
                console.log("Student needs a fucking name!");
                return;
            }
    
            let emailId: string = randomIntFromInterval().toString();
            let email: string = emailId + "@moneyconfidence.student..co.uk";
            signUp(email, "23@f1-*1HA%^3(DA)").then((result: UserCredential | null) => {
                let user = setUserDetails(result!.user.uid, emailId, studentName, "student");
                setData("users/", user.UUID!, user);
                router.push("/admin-downloadPage");
            });
        }
    
        return (
            <div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-3xl'>Admin Page</h1>
                    <h1 className='text-xl'>Add Question</h1>
                    <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                    {choices.map((choice, index) => (
                        <div key={index} className='space-y-2'>
                            <Textarea placeholder={`Choice ${index + 1}`} value={choice.Answer} onChange={(event) => handleChoiceAnswerChange(index, event)} />
                            <Switch id={`true-false-${index}`} checked={choices[index].Result} onCheckedChange={(value) => handleChoiceResultChange(index, value)} />
                            <Label htmlFor={`true-false-${index}`}>{choices[index].Result ? 'True' : 'False'}</Label>
                        </div>
                    ))}
                    <div>
                        <Button onClick={handleAddChoice}>Add Choice</Button>
                    </div>
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-xl'>Add Users</h1>
                    <Textarea placeholder="Student Name." value={studentName} onChange={handleStudentName} />
                    <Button onClick={handleAddUser}>Add User</Button>
                </div>
            </div>
        );
    }
};

export default AdminPage;



