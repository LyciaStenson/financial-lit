'use client';

import { setUserDetails, getCurrentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { setQuestionData } from '@/src/firebaseBridge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { notFound } from 'next/navigation'
import setData from '@/src/FirebaseBridge/firestore/setData';
import signUp from '@/src/FirebaseBridge/Auth/signUp';
import { User, UserCredential } from 'firebase/auth';

//import QRCode from "react-qr-code";

function randomIntFromInterval() {
    return Math.floor(Math.random() * 70000000);
}

const AdminPage = () => {
    //Is Admin
    if (getCurrentUser().role == 'admin') {
        //const [question, setQuestion] = useState('');
        //const [choices, setChoices] = useState([{ Answer: '', Result: false }]);
        //const [studentName, setStudentName] = useState('');

        const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            //setQuestion(event.target.value);
        };

        const handleStudentName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            //setStudentName(event.target.value);
        };

        const handleChoiceAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
            //const updatedChoices = [...choices];
            //updatedChoices[index].Answer = event.target.value;
            //setChoices(updatedChoices);
        };

        const handleChoiceResultChange = (index: number, value: boolean) => {
            //const updatedChoices = [...choices];
            //updatedChoices[index].Result = value;
            //setChoices(updatedChoices);
        };

        const handleAddChoice = () => {
            //setChoices(prevChoices => [...prevChoices, { Answer: '', Result: false }]);
        };

        const handleAddQuestion = () => {
            //setQuestionData(question, choices);
        };

        const handleAddUser = () => {
            //let emailId:string = randomIntFromInterval().toString();
            //let email:string = emailId + "@moneyconfidence.co.uk";
            //signUp(email, "23@f1-*1HA%^3(DA)").then((result:UserCredential | null) => {
                //let user = setUserDetails( result!.user.uid, emailId, studentName, "student");
                //setData("users/", user.UUID!, user);
            //});
        }

        return (
            <div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-3xl'>Admin Page</h1>

                    {/*
                        <QRCode
                        size={400}
                        value={"https://uniglos.github.io/RT-Financial-Lit"}
                            style={{ height: "auto", maxWidth: "10%", width: "10%" }}
                        />
                */}

                    <h1 className='text-xl'>Add Question</h1>
                    <div>
                        <Button onClick={handleAddChoice}>Add Choice</Button>
                    </div>
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                </div>
                <div className="grid w-3/5 gap-2 p-4">
                    <h1 className='text-xl'>Add Users</h1>
                    <Button onClick={handleAddUser}>Add User</Button>
                </div>
            </div>
        );
    } else {
        return notFound();
    }
};

export default AdminPage;



