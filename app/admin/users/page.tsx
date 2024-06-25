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
import readXlsxFile, { Row } from 'read-excel-file';
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
            readXlsxFile(file).then((rows: Row[]) => {
                const headers = rows[0];
                const dataRows = rows.slice(1);
    
                dataRows[0].sort((a, b) => {
                    if (a < b) {
                        return -1;
                      }
                      if (a > b) {
                        return 1;
                      }
                      return 0;                
                });
    
                console.log(dataRows);

                // Add headers back to the sorted data
                const sortedRows = [headers, ...dataRows];
                
                setExcelData(sortedRows);
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
            const id = data[3];
            const schoolid = data[4];
            handleAddMultipleUser(name, school, role, id, schoolid);
        });
     
        setGeneratedAccounts(true);
        toast.success(`Multiple Users for school ${school} have been created`);
    };

    const handleAddMultipleUser = (name: string, school: string, role: string, id: number, schoolid: number) => {
        let email: string = "";
        let emailId: string = "";
        let password: string = "";
        if (role == "student") {
            emailId = getRandomCode();
            email = emailId + "@moneyconfidence.co.uk";
            password = "23@f1-*1HA%^3(DA)";
        }
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
        } else if (role == "teacher") {

        } else if (role == "admin") {

        } else {
            toast.error("User needs a role of either student, teacher or admin.");
        }

        toast.success(`Created users called ${studentName}`);

        console.log(email);

        createUserWithEmailAndPassword(email, password).then((user) => {
            let days: dayComplete[] = [];

            for (let i = 0; i < 30; i++) {
                const dayString = "Day " + i
                days.push({
                    day: dayString,
                    completed: false,
                })
            }

            const dateInterface: Date = new Date();
            const day = dateInterface.getDate().toString().padStart(2, '0');
            const month = (dateInterface.getMonth() + 1).toString().padStart(2, '0');
            const year = dateInterface.getFullYear();
            const currentDate = `${day}/${month}/${year}`;

            let newUser: currentUser = {
                UUID: user?.user.uid,
                createdDate: currentDate,
                displayName: studentName,
                emailID: emailId,
                role: role,
                day: days,
                score: 0,
                streak: 0,
            }

            setData("users/", newUser.UUID!, newUser);
        })
    }

    return (
        <div className="pl-[270px]">
            <SideBar
                title="Admin"
            >
                <Button onClick={() => loadPage("/admin")}>Home</Button>
                <Button onClick={() => loadPage("/admin/questions")}>Questions</Button>
                <Button onClick={() => loadPage("/admin/users")}>Users</Button>
                <Button onClick={() => loadPage("/admin/certificate")}>Certification</Button>
                <Button onClick={() => loadPage("/admin/qr")}>QR</Button>
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
            <input className="mt-4" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            {excelData.length > 0 && (
                <div className="mt-4">
                    <h2>Excel Data:</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                {excelData[0].map((cell, index) => (
                                    <th key={index} className="px-4 py-2 border">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-2 border">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button onClick={generateAccounts}>Generate Accounts</Button>
                </div>
            )}
            {generatedAccounts && (
                <div>
                    <Toaster />
                </div>
            )}
            <div className="grid w-3/5 gap-2 p-4">
                <h1 className='text-xl'>Add Users</h1>
                <Textarea placeholder="Name." value={studentName} onChange={handleStudentName} />
                <Textarea placeholder="Role." value={role} onChange={handleRole} />
                <Button onClick={handleAddUser}>Add User</Button>
            </div>
        </div>
    );
};

export default DownloadPage;
