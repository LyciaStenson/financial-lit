'use client';

import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser, dayComplete } from "@/src/FirebaseBridge/Auth/currentUser";
import { getCurrentAuth } from "@/src/FirebaseBridge/firebaseApp";
import { getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import setData from "@/src/FirebaseBridge/firestore/setData";
import { getRandomCode } from "@/src/random/randomNumberGenerator";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import readXlsxFile from 'read-excel-file';
import { Toaster, toast } from 'sonner'

const auth = getCurrentAuth();

const DownloadPage = () => {
    const [users, setUsers] = useState<currentUser[]>([]);
    const [excelData, setExcelData] = useState<any[][]>([]);

    const router = useRouter();

    const [generatedAccounts, setGeneratedAccounts] = useState(false);

    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);

    const [studentName, setStudentName] = useState('');
    const [role, setRole] = useState('');

    const generate = (filter: string) => {
        getUserCollection("users/").then((data: currentUser[]) => {
            setUsers(data);
        });
    }

    const loadPage = (path: string) => {
        router.push(path);
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            readXlsxFile(file).then((rows) => {
                console.log(rows);
                setExcelData(rows);
            }).catch((error) => {
                console.error("Error reading the Excel file:", error);
            });
        }
    };

    const generateAccounts = (): void => {
        let school: string = "";
        excelData.slice(1).map((data) => {
            const name = data[0];
            school = data[1];
            const role = data[2];
            handleAddMultipleUser(name, school, role);
        });
        setGeneratedAccounts(true);
        toast.success(`Multiple Users for school ${school} have been created`);
    };

    const handleAddMultipleUser = (name: string, school: string, role: string) => {
        let email: string = "";
        let emailId: string = "";
        let password: string = "";
        if (role == "student") {
            emailId = getRandomCode();
            email = emailId + "@moneyconfidence.co.uk";
            password = "23@f1-*1HA%^3(DA)";
        }
        //Create a firebase account without logging out of this account
    }

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
        if (role == "student") {
            emailId = getRandomCode();
            email = emailId + "@moneyconfidence.co.uk";
            password = "23@f1-*1HA%^3(DA)";
        }else if(role == "teacher"){

        }else if(role == "admin"){

        }else{
            toast.error("User needs a role of either student, teacher or admin.");
        }

        toast.success(`Created users called ${studentName}`);

        console.log(email);

        createUserWithEmailAndPassword(email, password).then((user) => {
            let days:dayComplete[] = [];

            for(let i = 0; i < 30; i++){
                const dayString = "Day " + i
                days.push({
                    day:dayString,
                    completed:false,
                })
            }
    
            const dateInterface: Date = new Date();
            const day = dateInterface.getDate().toString().padStart(2, '0');
            const month = (dateInterface.getMonth() + 1).toString().padStart(2, '0');
            const year = dateInterface.getFullYear();
            const currentDate = `${day}/${month}/${year}`;

            let newUser:currentUser = {
                UUID:user?.user.uid,
                createdDate:currentDate,
                displayName:studentName,
                emailID:emailId,
                role:role,
                day:days,
                score:0,
                streak:0,
            }
    
            setData("users/", newUser.UUID!, newUser);
        })
    }

    return (
        <div className="pl-[270px]">
            <SideBar title="Teacher">
                <Button onClick={() => loadPage("/teacher")}>Home</Button>
            </SideBar>
            <Button onClick={() => generate("")}>Get all users</Button>
            {users.map((data, index) => (
                <div key={index} className="space-y-5">
                    <h2>All Users Data:</h2>
                    <table className="min-w-80 bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">
                                    User {index}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border">
                                    <span className="mr-2">{data.displayName}</span>
                                    <span>{data.role}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default DownloadPage;
